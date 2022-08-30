import React, { Component } from "react";
import { getFood, saveFood, getChangeFood } from "../services/foodService";
import { getCategories } from "../services/catecoryService";
import Form from "../common/Form";
import Joi from "joi";
import http from "../services/httpService";
import config from "../config.json";

class FoodForm extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      categoryId: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    categories: [],
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
    const { data } = await getCategories();
    const categories = data;
    this.setState({ categories });
  }
  async populateFoods() {
    const foodId = this.props.match.params.id;

    if (foodId === "new") return;

    const { data: food } = await getFood(foodId);

    if (!food) return this.props.history.replace("/not-found");
    this.setState({
      data: this.mapToViewModel(food),
    });
  }
  mapToViewModel(food) {
    return {
      _id: food._id,
      name: food.name,
      categoryId: food.category._id,
      numberInStock: food.numberInStock,
      price: food.price,
    };
  }

  doSubmit = () => {
    saveFood(this.state.data);

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
