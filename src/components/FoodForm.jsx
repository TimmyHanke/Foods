import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormInput from "../common/FormInput";
import Foods, { getFoods, saveFood } from "../fakeFoodService";
import Form from "../common/Form";
import Joi from "joi";
import { isDisabled } from "@testing-library/user-event/dist/utils";

class FoodForm extends Form {
  state = {
    data: {
      name: "",
      category: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    newFood: [],
  };

  schema = Joi.object({
    name: isDisabled,
    category: isDisabled,
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("NumberInStock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
  });

  handleText = ({ target: input }) => {
    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.state.data.name = data.name;
    this.state.data.category = data.category;
    this.state.data.numberInStock = data.numberInStock;
    this.state.data.price = data.price;

    this.setState({ data });
  };
  raiseNew = (food) => {
    console.log("denna", food);
    saveFood(food);
  };
  doSubmit = (e) => {
    e.preventDefault();

    let food = {
      name: this.state.data.name,
      category: this.state.data.category,
      numberInStock: this.state.data.numberInStock,
      price: this.state.data.price,
    };
    this.state.newFood = [food, ...this.state.newFood];
    console.log("added", this.state.newFood);
    this.raiseNew(food);
  };

  renderParams() {
    if (this.props.match.params.name !== "") {
      this.state.data.name = this.props.match.params.name;
      this.state.data.category = this.props.match.params.category;
      this.state.data.numberInStock = this.props.match.params.numberInStock;
      this.state.data.price = this.props.match.params.price;
    }
  }

  render() {
    return (
      <div>
        <h1>Food Form {this.props.match.params.id} </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderParams()}
          {this.renderInput(
            "name",
            "Name",
            "form-control",
            "this.state.data.name"
          )}
          {this.renderInput(
            "category",
            "Category",
            "form-select",
            "this.state.data.name"
          )}
          {this.renderInput(
            "numberInStock",
            "NumberInStock",
            "form-control",
            "this.state.data.name"
          )}
          {this.renderInput(
            "price",
            "Price",
            "form-control",
            "this.state.data.name"
          )}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default FoodForm;
