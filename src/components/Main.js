import React from "react";
import {
    HashRouter,
    Route,
    Link,
    BrowserRouter,
    withRouter
} from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./Home";
import Recipe from "./Recipe";
import RecipeDescription from "./Recipe-Description";
import Navigation from "./Navigation";
import Register from "./Register";
import Login from "./Login";
import RecipeUploader from "./Recipe-Uploader";
import { Row } from "reactstrap";
import fetchIngredients from "../service/api/Food-service";

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            count: 0,
            searchText: "",
            typingTimeout: undefined,
            recipeId: 0
        };
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.getIngredients = this.getIngredients.bind(this);
        this.onNewRecipeId = this.onNewRecipeId.bind(this);
        this.handleLoginEvent = this.handleLoginEvent.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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
        const self = this;

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            searchText: e.target.value,
            typingTimeout: setTimeout(
                this.getIngredients.bind(this, e.target.value),
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
    handleLoginEvent(history) {
        this.setState({ isLoggedIn: true });
        localStorage.setItem("userLogged", true);
        history.push("/");
    }
    handleLogout() {
        this.setState({ isLoggedIn: false });
        localStorage.clear();
    }
    handleUpload(recipesList) {
        this.setState({ userRecipes: recipesList });
    }
    render() {
        let userRecipesHtml = this.state.userRecipes.map(item => {
            return (
                <div>
                    <p>{item.title}</p>
                </div>
            );
        });
        let whatToRender;
        if (this.state.recipeId) {
            whatToRender = <RecipeDescription recipeId={this.state.recipeId} />;
        } else {
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
                    <div>
                        <Navigation
                            onKeyUp={this.handleKeyUp}
                            searchText={this.state.searchText}
                            handleClick={this.handleClick}
                            loggedIn={this.state.isLoggedIn}
                            onLoggedOut={this.handleLogout}
                        />
                    </div>

                    <div className="welcome-wraper">
                        <h1>What is in your fridge?</h1>
                        <h2>
                            We will help you find recipes to match the
                            ingredients you already have at home.
                        </h2>
                    </div>
                    {whatToRender}

                    <Route exact path="/registration" component={Register} />
                    <Route
                        exact
                        path="/recipeUploader"
                        render={() => (
                            <RecipeUploader onUpload={this.handleUpload} />
                            <UserRecipeView params={this.state.userRecipes} />
                            {userRecipesHtml}
                        )}
                    />

                    <Route
                        exact
                        path="/login"
                        render={({ history }) => (
                            <Login
                                onLogin={() => {
                                    this.handleLoginEvent(history);
                                }}
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
