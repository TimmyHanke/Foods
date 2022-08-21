import React, { Component } from "react";
import _ from "lodash";
import Joi, { allow } from "joi";
import FormInput from "../common/FormInput";
import Form from "../common/Form";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import joy from "joy";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().allow(""),
  });
  doSubmit = () => {
    console.log("Register");
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "username", "form-control")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name", "form-control")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;