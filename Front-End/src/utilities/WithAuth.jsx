import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "./WebServices";

export default function withAuth(AuthComponent) {
  const Auth = new AuthService();
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }
    componentWillMount() {
      if (!Auth.loggedIn()) {
        this.props.history.replace("/login");
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState(
            {
              user: profile
            },
            () => {
              if (Auth.isUserPermiss()) {
                this.props.isLogged(false);
              } else if (Auth.isAdminPermiss()) {
                this.props.isLogged(true);
              }
            }
          );
        } catch (err) {
          Auth.logout();
          this.props.history.replace("/login");
        }
      }
    }

    render() {
      if (this.state.user) {
        return <AuthComponent />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  };
}
