import React from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        axios.post("/login", this.state).then(response => {
            if (!response.data.success) {
                this.setState({
                    error: response.data.error
                });
                return;
            }
            localStorage.setItem("userLogged", true);
            this.props.onLogin();
        });
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div className="login-form">
                <h2>Already Registered? Login.</h2>
                {error && <h4 className="error">{error}</h4>}
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
                        <Label for="password">Password</Label>
                        <Input
                            onChange={this.handleChange}
                            type="password"
                            name="password"
                            placeholder="password"
                        />
                    </FormGroup>
                    <Button onClick={this.handleSubmit}>Login</Button>
                </Form>
            </div>
        );
    }
}
