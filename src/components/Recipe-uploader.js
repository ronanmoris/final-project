import React from "react";
import axios from "axios";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardLink
} from "reactstrap";

export default class RecipeUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            title: "",
            text: "",
            file: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        axios.get("/user-recipes").then(response => {
            this.setState({ recipesList: response.data.payload });
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        let formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("title", this.state.title);
        formData.append("text", this.state.text);
        formData.append("file", this.file);

        axios.post("/recipeUploader", formData).then(response => {
            this.setState({
                recipesList: [
                    response.data.response[0],
                    ...this.state.recipesList
                ]
            });
        });
    }

    render() {
        if (!this.state.recipesList) {
            return null;
        }
        let userRecipesList = this.state.recipesList.map(recipe => {
            return (
                <Card className="">
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
        return (
            <div className="recipe-uploader-box">
                <h1>Send us your recipe!</h1>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            onChange={this.handleChange}
                            type="text"
                            name="username"
                            placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Recipe Title</Label>
                        <Input
                            onChange={this.handleChange}
                            type="text"
                            name="title"
                            placeholder="Title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="text">Text Area</Label>
                        <Input
                            onChange={this.handleChange}
                            type="textarea"
                            name="text"
                            placeholder="text"
                        />
                    </FormGroup>
                    <FormGroup row>
                        <Label for="file" sm={2}>
                            File
                        </Label>
                        <Col sm={10}>
                            <Input
                                onChange={e => {
                                    this.file = e.target.files[0];
                                }}
                                type="file"
                                name="file"
                            />
                            <FormText color="muted">
                                Click on the button to upload a photo of your
                                recipe.
                            </FormText>
                        </Col>
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
                <h2 id="uploaded-recipes-h2">Your uploaded recipes</h2>
                <div className="user-list-box">{userRecipesList}</div>
            </div>
        );
    }
}
