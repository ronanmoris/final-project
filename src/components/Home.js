import React from "react";
import ReactDOM from "react-dom";

import Recipe from "./Recipe";
import { Card, Row, Container, Col } from "reactstrap";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleLink = this.handleLink.bind(this);
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
                    handleLink={this.handleLink}
                    title={item.title}
                    image_url={item.image_url}
                    recipe_id={item.recipe_id}
                />
            );
        });
        return (
            <div>
                <Container>
                    <Row>
                        <Col sm="12">
                            <div className="recipes-wraper">{recipes}</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
