const spicedPg = require("spiced-pg");
// const config = require("./config.json");

if (!process.env.DATABASE_URL) {
    var { dbUser, dbPass } = require("./secrets.json");
}
let db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUser}:${dbPass}@localhost:5432/final-project`
);

function storeUserInfo(username, email, password) {
    return db
        .query(
            "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING username, email, id",
            [username, email, password]
        )
        .then(function(results) {
            return results.rows;
        });
}

function checkUserCredentialsToLogIn(email) {
    return db
        .query(`SELECT * FROM users WHERE email=$1`, [email])
        .then(results => {
            return results.rows;
        });
}

module.exports = {
    storeUserInfo,
    checkUserCredentialsToLogIn
};
