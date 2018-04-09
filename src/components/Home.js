import React from "react";
import ReactDOM from "react-dom";
import Recipe from "./Recipe";
import { Card, Row, Container, Col } from "reactstrap";
import RecipeUploader from "./Recipe-Uploader";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleLink = this.handleLink.bind(this);
    }
    componentDidUpdate() {
        var element = document.getElementById("recipes-wrapper");
        element.scrollIntoView();
    }
    handleLink(id) {
        this.props.newRecipeId(id);
    }

    render() {
        if (!this.props.recipes) {
            return;
        }
        const recipes = this.props.recipes.map(item => {
            return (
                <Recipe
                    setNewRecipes={this.props.setNewRecipes}
                    key={item.recipe_id}
                    handleLink={this.handleLink}
                    title={item.title}
                    image_url={item.image_url}
                    recipe_id={item.recipe_id}
                />
            );
        });
        return (
            <div id="recipes-wrapper" className="recipes-wraper">
                <Container>
                    <Row>
                        <Col sm="12">
                            <div className="recipes-box">{recipes}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
