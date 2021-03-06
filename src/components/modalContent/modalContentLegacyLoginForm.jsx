/** @flow */
import React from "react";
import Validate from "react-validate-form";
import PropTypes from "prop-types";
import Input from "../form/input";
import Button from "../button";
import ErrorMessages from "../form/errorMessages";
import color from "../../styles/colors";

const styles = {
  container: {
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: "23px",
  },
  input: {
    borderBottom: `1px solid ${color.borderPrimary}`,
  },
};

class LegacyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifierValue: "",
      passwordValue: "",
      showErrors: false,
      valid: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, type) {
    this.setState({
      [`${type}Value`]: e.target.value,
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <Validate>
          {({ validate, errorMessages }) => (
            <form
              action={this.props.authLink}
              ref={(node) => {
                this.form = node;
              }}
              method="post"
            >
              <div style={styles.inputContainer}>
                <input type="hidden" name="user_identifier_type" value="email" />
                <Input
                  theme="float"
                  type="text"
                  name="user_identifier"
                  required
                  customStyles={styles.input}
                  error={errorMessages.user_identifier && errorMessages.user_identifier.length > 0}
                  placeholder="Email or username"
                  onChange={(e) => {
                    this.handleChange(e, "identifier");
                  }}
                  onBlur={validate}
                  value={this.state.identifierValue}
                />

                <Input
                  theme="float"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  customStyles={styles.input}
                  error={errorMessages.password && errorMessages.password.length > 0}
                  onChange={(e) => {
                    this.handleChange(e, "password");
                  }}
                  onBlur={validate}
                  value={this.state.passwordValue}
                />
                {
                  errorMessages.user_identifier &&
                  errorMessages.user_identifier.length > 0 &&
                  <ErrorMessages messages={errorMessages.user_identifier} />
                }
                {
                  errorMessages.password &&
                  errorMessages.password.length > 0 &&
                  <ErrorMessages messages={errorMessages.password} />
                }
              </div>
              <Button
                rounded
              >
                Submit
              </Button>
            </form>
          )}
        </Validate>
      </div>
    );
  }
}

LegacyForm.propTypes = {
  authLink: PropTypes.string.isRequired,
};

export default LegacyForm;
