import React from "react";
import { Link } from "react-router-dom";
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button
} from "reactstrap";

export default class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.handleLink = this.handleLink.bind(this);

        const {
            title,
            source_url,
            recipe_id,
            image_url,
            social_rank
        } = this.props;

        this.state = {
            title,
            source_url,
            recipe_id,
            image_url,
            social_rank
        };
    }
    handleLink() {
        this.props.handleLink(this.state.recipe_id);
    }

    render() {
        return (
            <Card className="search-card">
                <Link
                    onClick={this.handleLink}
                    to={{ pathname: "/" }}
                    params={{ recipeId: this.state.recipe_id }}
                >
                    <CardImg
                        top
                        width="100%"
                        src={this.state.image_url}
                        alt="Card image cap"
                    />
                </Link>
                <CardBody>
                    <CardTitle>{this.state.title}</CardTitle>
                    <CardSubtitle />
                </CardBody>
            </Card>
        );
    }
}
