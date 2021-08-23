import React from "react";
import FormComponent from "../forms/Form";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import userService from "../../services/userService";
import authService from "../../services/authService";

class RegisterForm extends FormComponent {
    state = {
        data: {
            name: "",
            email: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        name: Joi.string().min(3).max(255).required().label("Name"),
        email: Joi.string().email().max(255).required().label("E-Mail"),
        password: Joi.string().min(5).max(255).required().label("Password")
    }

    submitData = async () => {
        try {
            const response = await userService.register(this.state.data);
            authService.loginWithJwt(response.headers["x-auth-token"]);
            window.location = "/";
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({errors});
            }
        }
    };

    render() {
        if(authService.getCurrentUser()){
            const {router} = this.props;
            router.push("/");
        }

        return (
            <Form onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                {this.renderInputField("name", "Name")}
                {this.renderInputField("email", "E-Mail", "email")}
                {this.renderInputField("password", "Password", "password")}
                {this.renderSubmitButton("Register")}
            </Form>
        );
    }
}

export default RegisterForm;