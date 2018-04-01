import React from "react";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardLink,
    Button
} from "reactstrap";

import axios from "axios";

export default class RecipeDescription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            publisher: "",
            image_url: "",
            ingredients: [],
            source_url: "",
            recipe_id: 0
        };
    }
    componentDidMount() {
        axios
            .post("/recipe", {
                recipeId: this.props.recipeId
            })
            .then(response => {
                const {
                    publisher,
                    title,
                    image_url,
                    ingredients,
                    source_url
                } = response.data.recipe;

                this.setState({
                    publisher,
                    title,
                    image_url,
                    ingredients,
                    source_url
                });
            });
    }
    render() {
        if (!this.state.ingredients) {
            return null;
        }

        const ingredientsList = this.state.ingredients.map(ingredient => {
            return (
                <div className="ingredients-list">
                    <ul>
                        <li>{ingredient}</li>
                    </ul>
                </div>
            );
        });
        return (
            <div className="recipe-box">
                <h1>{this.state.title}</h1>
                <Card className="recipe-card">
                    <CardImg
                        top
                        width="100%"
                        src={this.state.image_url}
                        alt="Card image cap"
                    />

                    <CardBody>
                        <CardSubtitle>
                            Publisher: {this.state.publisher}
                        </CardSubtitle>
                        <CardText>
                            <strong>Ingredients:</strong>
                            {ingredientsList}
                        </CardText>
                        <CardText>
                            <strong>Directions: </strong>
                        </CardText>
                        <CardLink href={this.state.source_url}>
                            View on {this.state.publisher}
                        </CardLink>
                    </CardBody>
                </Card>
            </div>
        );
    }
}
