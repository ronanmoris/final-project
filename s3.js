const knox = require("knox");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // secrets.json is in .gitignore
}

const client = knox.createClient({
    key: secrets.AWS_KEY,
    secret: secrets.AWS_SECRET,
    bucket: "ronansrecipes"
});

function upload(req, res, next) {
    if (!req.file) {
        res.sendStatus(500);
        return;
    }
    const s3Request = client.put(req.file.filename, {
        "Content-Type": req.file.mimetype,
        "Content-Length": req.file.size,
        //this line makes the file public
        "x-amz-acl": "public-read"
    });
    const readStream = fs.createReadStream(req.file.path);
    readStream.pipe(s3Request);
    s3Request.on("response", s3Response => {
        const wasSuccessful = s3Response.statusCode == 200;
        if (wasSuccessful) {
            fs.unlink(req.file.path, () => {});
            next();
        } else {
            console.log(s3Response.statusCode);
            res.sendStatus(500);
        }
    });
}

module.exports = {
    upload
};
