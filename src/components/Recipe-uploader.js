import React from "react";
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
    }
    render() {
        return (
            <div className="recipe-uploader-box">
                <h1>Send us your recipe!</h1>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" placeholder="email" />
                </FormGroup>
                <FormGroup>
                    <Label for="text">Text Area</Label>
                    <Input type="textarea" name="text" placeholder="text" />
                </FormGroup>
                <FormGroup row>
                    <Label for="file" sm={2}>
                        File
                    </Label>
                    <Col sm={10}>
                        <Input type="file" name="file" />
                        <FormText color="muted">
                            Click on the button to upload your image.
                        </FormText>
                    </Col>
                </FormGroup>
            </div>
        );
    }
}
