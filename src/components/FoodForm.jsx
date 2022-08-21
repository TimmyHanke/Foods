import React, { Component } from "react";
import Form from "../common/Form";
import Joi from "joi";
import http from "../httpService";
import config from "../config.json";

class FoodForm extends Form {
  state = {
    data: {
      _id: undefined,
      name: "",
      categoryId: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    categories: [],
    category: "",
  };

  schema = Joi.object({
    _id: Joi.allow(),
    name: Joi.string().allow(),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("NumberInStock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
  });

  componentDidMount() {
    this.populateCategories();
    this.populateFoods();
  }

  async populateCategories() {
    const serverCategories = await http.get(config.apiEndpointCategories);
    this.setState({ categories: serverCategories.data });
  }
  async populateFoods() {
    const foodId = this.props.match.params.id;

    if (foodId === "new") return;

    const getFoodServer = await http.get(
      config.apiEndpointFoods + this.props.match.params.id
    );

    if (!getFoodServer) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(getFoodServer),
    });
  }
  mapToViewModel(getFoodServer) {
    return {
      name: getFoodServer.data.name,
      categoryId: getFoodServer.data.category._id,
      numberInStock: getFoodServer.data.numberInStock,
      price: getFoodServer.data.price,
    };
  }

  doSubmit = () => {
    const foodId = this.props.match.params.id;
    const data = this.state.data;
    this.setState({ data });

    if (foodId === "new") {
      http.post(config.apiEndpointFoods, data);
      return this.props.history.push("/foods");
    }

    http.put(config.apiEndpointFoods + foodId, data);

    this.props.history.push("/foods");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name", "form-control")}
          {this.renderInputSelect(
            "categoryId",
            "Category",
            this.state.categories,
            "Select..."
          )}
          {this.renderInput("numberInStock", "NumberInStock", "form-control")}
          {this.renderInput("price", "Price", "form-control")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default FoodForm;
