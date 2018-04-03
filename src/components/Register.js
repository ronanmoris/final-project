import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import axios from "axios";

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: "",
            password: ""
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
        console.log("this.state", this.state);
        axios.post("/registration", this.state).then(response => {
            console.log("response from server", response);
            if (!resp.data.success) {
                this.setState({
                    error: resp.data.error
                });
                return;
            }
            //location.replace("/");
        });
    }
    render() {
        return (
            <div className="registration-form">
                <h2>You can register for free</h2>
                <h5>All fields are required for registration</h5>
                <Form>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            onChange={this.handleChange}
                            name="username"
                            id="username"
                            placeholder="username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            onChange={this.handleChange}
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="password"
                        />
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        );
    }
}
