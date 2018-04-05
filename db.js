const spicedPg = require("spiced-pg");
const config = require("./config.json");

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
        .then(results => {
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
function uploadRecipe(userId, image, username, title, text) {
    return db
        .query(
            `INSERT into recipes (userId,image,username,title, textarea) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [userId, image, username, title, text]
        )
        .then(results => {
            if (results.rows[0]) {
                results.rows[0].image = config.s3Url + results.rows[0].image;
            }
            return results.rows;
        });
}

function listAllRecipes() {
    return db
        .query(
            `SELECT image,username,title, textarea
        FROM recipes
        order by id desc;
        `
        )
        .then(results => {
            return results.rows;
        });
}

function listUserRecipes(userId) {
    console.log("config.s3Url", config.s3Url);
    return db
        .query(
            `SELECT concat('https://s3.amazonaws.com/ronansimageboard/', image),username,title, textarea
        FROM recipes
        WHERE userId = $1
        order by id desc;
        `,
            [userId]
        )
        .then(results => {
            return results.rows;
        });
}

module.exports = {
    storeUserInfo,
    checkUserCredentialsToLogIn,
    uploadRecipe,
    listAllRecipes,
    listUserRecipes
};
