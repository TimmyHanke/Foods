import React, { Component } from "react";
import http from "../services/httpService";
import config from "../config.json";
import joi from "joi";
import Joi, { allow } from "joi";
import Form from "../common/Form";
import user from "../services/userService";

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
  doSubmit = async () => {
    try {
      await user.register(this.state.data);
      window.location = "/";
    } catch (error) {
      if (error.response.status === 400) {
        const errors = { username: error.response.data };
        this.setState({ errors });
      }
    }
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
