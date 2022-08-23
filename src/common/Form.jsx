import React, { Component } from "react";
import FormInput from "./FormInput";
import FormInputSelect from "./FormInputSelect";
import http from "../services/httpService";
import config from "../config.json";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    list: {},
  };

  async componentDidMount() {
    const serverCategories = await http.get(config.apiEndpointCategories);

    this.setState({ list: serverCategories.data });
  }
  validate() {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);
    if (!error) return null;
    const errors = {};
    for (const detail of error.details)
      errors[detail.context.key] = detail.message;

    return errors;
  }

  validateProperty({ name, value }) {
    const subSchema = this.schema.extract(name);
    const { error } = subSchema.validate(value);

    if (!error) return null;
    return error.message;
  }
  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
  renderInput(name, label, type) {
    const { data, errors } = this.state;
    return (
      <FormInput
        name={name}
        label={label}
        type={type}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
  renderInputSelect(name, label, list, placeHolder = "") {
    const { data, errors } = this.state;
    return (
      <FormInputSelect
        name={name}
        label={label}
        list={list}
        placeHolder={placeHolder}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
