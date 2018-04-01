import React from "react";
import { HashRouter, Route, Link, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./Home";
import Recipe from "./Recipe";
import RecipeDescription from "./Recipe-Description";
import Navigation from "./Navigation";
import { Row } from "reactstrap";
import fetchIngredients from "../service/api/Food-service";

export default class Main extends React.Component {
    constructor(props) {
        console.log("props inside Main ", props);
        super(props);

        this.state = {
            recipes: [],
            count: 0,
            searchText: "",
            typingTimeout: "",
            recipeId: 0
        };
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.onNewRecipeId = this.onNewRecipeId.bind(this);
    }
    componentWillReceiveProps(newProps) {
        console.log("next ", newProps);
    }

    getIngredients(value) {
        fetchIngredients(value).then(response => {
            this.setState({
                recipes: response.data.recipes,
                count: response.data.count
            });
        });
    }

    handleKeyUp(e) {
        console.log("e", e);
        const self = this;
        if (!e.target.value) {
            ("voltei pq nao tinha valor");
            return;
        }
        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            searchText: e.target.value,
            typingTimeout: setTimeout(
                this.getIngredients(e.target.value),
                2000
            ),
            recipeId: null
        });
    }
    onNewRecipeId(id) {
        this.setState({
            recipeId: id,
            searchText: ""
        });
    }

    render() {
        let whatToRender;
        if (this.state.recipeId) {
            console.log("if ");
            whatToRender = <RecipeDescription recipeId={this.state.recipeId} />;
        } else {
            console.log("else");
            whatToRender = (
                <Home
                    recipes={this.state.recipes}
                    newRecipeId={this.onNewRecipeId}
                />
            );
        }
        return (
            <BrowserRouter>
                <div className="main-wallpaper">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div>
                                <Navigation
                                    onKeyUp={this.handleKeyUp}
                                    searchText={this.state.searchText}
                                />

                                {whatToRender}
                            </div>
                        )}
                    />
                    <Route exact path="/recipe" component={RecipeDescription} />
                </div>
            </BrowserRouter>
        );
    }
}
