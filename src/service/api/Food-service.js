import React from "react";
import axios from "axios";

export default function fetchIngredients(text) {
    return axios.post("/search-recipe", {
        text
    });
}
