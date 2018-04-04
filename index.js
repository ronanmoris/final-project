const express = require("express");
const app = express();
const compression = require("compression");
const api = require("./service/api-food");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const db = require("./db");
const path = require("path");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3.js");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/recipeUploader");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(
    cookieSession({
        name: "session",
        keys: ["chuck", "norrys"],

        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    })
);
app.use(compression());

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/search-recipe", (req, res) => {
    api.searchIngredients(req.body.text).then(data => {
        res.json(data);
    });
});
app.post("/recipe", (req, res) => {
    api.searchRecipe(req.body.recipeId).then(data => {
        res.json(data);
    });
});
//=======REGISTRATION==========
app.post("/registration", (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.json({
            error: "Please fill out all the input fields"
        });
        return;
    }
    hashPassword(password).then(hash => {
        db
            .storeUserInfo(username, email, hash)
            .then(results => {
                req.session.userId = results[0].id;
                req.session.username = results[0].username;
                req.session.email = results[0].email;
                res.json({ success: true });
            })
            .catch(err => {
                console.log(err);
            });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ error: "Please fill out all the input fields" });
    }
    db
        .checkUserCredentialsToLogIn(email)
        .then(results => {
            checkPassword(password, results[0].password)
                .then(correctPassword => {
                    if (correctPassword) {
                        req.session.userId = results[0].id;
                        req.session.username = results[0].username;
                        req.session.email = results[0].email;
                        res.json({ success: true });
                    } else {
                        res.json({ error: "Wrong password" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({ success: false, error: "Please try again" });
                });
        })
        .catch(err => {
            console.log(err);
            res.json({ success: false, error: "Invalid email" });
        });
});

app.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

app.post("/recipeUploader", uploader.single("file"), s3.upload, (req, res) => {
    db
        .uploadRecipe(req.session.userId, req.file.filename, req.body.text)
        .then(response => {
            res.json({ response });
        });
});

app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, function() {
    console.log("I'm listening.");
});

function hashPassword(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
}

function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
}
