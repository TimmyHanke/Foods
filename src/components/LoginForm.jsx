import _, { join } from "lodash";
import Joi from "joi";
import Form from "../common/Form";
import FormInput from "../common/FormInput";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().min(2).label("Username"),
    password: Joi.string().required().min(4).label("Password"),
  });
  doSubmit = () => {
    console.log("Log in");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "form-control")}
          {this.renderInput("password", "Password", "form-control")}

          {this.renderButton("Log in")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
