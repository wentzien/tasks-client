import React from "react";
import Form from "react-bootstrap/Form";

const Input = ({name, label, error, ...rest}) => {
    return (
        <Form.Group controlId={name}>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                name={name}
                placeholder={"Enter " + label}
                isInvalid={error}
                {...rest}
            />
            <Form.Control.Feedback type="invalid">
                {error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default Input;
