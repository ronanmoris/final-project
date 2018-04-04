import React from "react";
import axios from "axios";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Col
} from "reactstrap";

export default class RecipeUploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            text: "",
            file: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        let formData = new FormData();
        formData.append("file", this.file);
        formData.append("email", this.state.email);
        formData.append("text", this.state.text);

        axios.post("/recipeUploader", formData).then(response => {
            console.log("response front", response.data.response);
        });
        // axios.post("/upload", formData).then(response => {
        //     this.props.setImage(response.data.imageUrl);
        //     this.setState({
        //         file: response.data.imageUrl
        //     });
        // });
    }

    render() {
        return (
            <div className="recipe-uploader-box">
                <h1>Send us your recipe!</h1>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            placeholder="email"
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
            </div>
        );
    }
}
