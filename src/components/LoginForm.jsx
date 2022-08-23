import _, { join } from "lodash";
import Joi from "joi";
import Form from "../common/Form";
import FormInput from "../common/FormInput";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

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
  doSubmit = async () => {
    try {
      await auth.login(this.state.data);
      const { state } = this.props.location;
      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response.status === 400) {
        const errors = { username: errors.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
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
