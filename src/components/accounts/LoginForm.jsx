import React from "react";
import FormComponent from "../forms/Form";
import Joi from "joi-browser";
import Form from "react-bootstrap/Form";
import authService from "../../services/authService";

class LoginForm extends FormComponent {
    state = {
        data: {
            email: "",
            password: ""
        },
        errors: {}
    };

    schema = {
        email: Joi.string().email().required().label("E-Mail"),
        password: Joi.string().required().label("Password")
    }

    submitData = async () => {
        try {
            const {data} = this.state;
            await authService.login(data.email, data.password);

            // const {state} = this.props.location;
            // window.location = state ? state.from.pathname : "/";
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
                <h1>Login</h1>
                {this.renderInputField("email", "E-Mail", "email")}
                {this.renderInputField("password", "Password", "password")}
                {this.renderSubmitButton("Login")}
            </Form>
        );
    }
}

export default LoginForm;