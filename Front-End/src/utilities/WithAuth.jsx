import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import AuthService from './WebServices';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            }
            else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    }, () => {
                        this.props.isLogged(false);
                    })
                }
                catch (err) {
                    Auth.logout();
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (Auth.isUserPermiss() === true) {
                return (
                    <AuthComponent />
                )
            } else if (Auth.isAdminPermiss() === true) {
                return (
                    <Redirect to="/staff" />
                )
            }
            else {
                return(
                    <Redirect to="/login" />
                )
            }
        }
    };
}