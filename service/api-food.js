const axios = require("axios");

function searchIngredients(ingredients) {
    return axios
        .get(
            `http://food2fork.com/api/search?key=2ecb77ef916b60f9e171d962983955b5&q=${ingredients}`
        )
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}

function searchRecipe(recipeId) {
    return axios
        .get(
            `http://food2fork.com/api/get?key=2ecb77ef916b60f9e171d962983955b5&rId=${recipeId}`
        )
        .then(response => {
            return response.data;
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    searchIngredients,
    searchRecipe
};
