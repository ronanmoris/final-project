import React from "react";
import axios from "axios";
import { HashRouter, Route, Link, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import Home from "./Home";
import Recipe from "./Recipe";
import RecipeDescription from "./Recipe-Description";
import Navigation from "./Navigation";
import Register from "./Register";
import Login from "./Login";
import RecipeUploader from "./Recipe-Uploader";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardLink,
    Container,
    Row,
    Col,
    CardGroup
} from "reactstrap";
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
        this.onUpload = this.onUpload.bind(this);
    }

    componentDidMount() {
        axios.get("/all-recipes").then(response => {
            this.setState({
                allRecipes: response.data.payload,
                recentFourRecipes: response.data.payload.slice(0, 4)
            });
        });
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
                1500
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
    onUpload(recipesList) {
        this.setState({ userRecipes: recipesList });
    }
    render() {
        if (!this.state.recentFourRecipes) {
            return null;
        }
        let recentFourRecipes = this.state.recentFourRecipes.map(recipe => {
            return (
                <Card className="added-recipes-card">
                    <CardImg
                        top
                        width="100%"
                        src={recipe.concat}
                        alt="Card image cap"
                    />
                    <CardBody>
                        <CardTitle>{recipe.title}</CardTitle>
                        <CardSubtitle>{recipe.username}</CardSubtitle>
                        <CardText>{recipe.textarea}</CardText>
                    </CardBody>
                </Card>
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
                    <div className="recipes-wraper">
                        <Container>
                            <h1>Looking for inspiration?</h1>
                            <h3>Check out the most recent added recipes!</h3>
                            <Row>
                                <Col sm="12">
                                    <div className="recipes-box">
                                        {recentFourRecipes}
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>

                    {whatToRender}

                    <Route exact path="/registration" component={Register} />
                    <Route
                        exact
                        path="/recipeUploader"
                        render={() => (
                            <RecipeUploader onUpload={this.onUpload} />
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
