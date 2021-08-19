import React, {Component} from "react";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import Input from "./common/Input";

class Form extends Component {
    state = {
        data: {},
        errors: {}
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);

        if (errorMessage) errors[input.name] = errorMessage; // if error: add new error message
        else delete errors[input.name]; // if no error: delete existing entries

        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({data, errors});
    };

    validateProperty = ({name, value}) => {
        const obj = {[name]: value};
        const schema = {[name]: this.schema[name]};

        const {error} = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
    };

    handleSubmit = event => {
        event.preventDefault();

        const errors = this.validate();
        this.setState({errors: errors || {}}); // errors must be an object and not null
        if (errors) return;

        this.submitData();
    };

    validate = () => {
        const options = {abortEarly: false}
        const {error} = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (const item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    // render helper functions
    renderSubmitButton = (label = "Submit") => {
        return (
            <Button variant="primary" type="submit" disabled={this.validate()}>
                {label}
            </Button>
        );
    };

    renderInputField = (name, label, type = "text") => {
        const {data, errors} = this.state;
        return (
            <Input
                name={name}
                label={label}
                type={type}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    }

    // Form component does not render (return) anything
}

export default Form;