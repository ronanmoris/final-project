import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import RecipeUploader from "./Recipe-Uploader";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from "reactstrap";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    handleKeyUp(e) {
        this.props.onKeyUp(e);
    }

    isLoggedIn() {
        if (
            localStorage.getItem("userLogged") &&
            Boolean(localStorage.getItem("userLogged")) === true
        ) {
            return true;
        }
        return false;
    }
    onLogout() {
        axios.post("/logout").then(response => {
            if (response.status === 200) {
                this.props.onLoggedOut();
                this.setState({ hello: "world" });
            }
        });
    }
    render() {
        let loginLink = "";
        let registerLink = "";
        let logoutLink = "";
        let addRecipeLink = "";

        if (!this.isLoggedIn()) {
            loginLink = (
                <NavItem>
                    <NavLink className="nav-links" href="/login">
                        Login
                    </NavLink>
                </NavItem>
            );
            registerLink = (
                <NavItem>
                    <NavLink className="nav-links" href="/registration">
                        Register
                    </NavLink>
                </NavItem>
            );
        }
        if (this.isLoggedIn()) {
            logoutLink = (
                <Link className="nav-links" to="/" onClick={this.onLogout}>
                    Logout
                </Link>
            );
            addRecipeLink = (
                <NavItem>
                    <NavLink className="nav-links" href="/recipeUploader">
                        Add Recipe
                    </NavLink>
                </NavItem>
            );
        }
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand id="navbar-brand" href="/">
                        WHAT `S FOR DINNER?
                    </NavbarBrand>
                    <div className="search-box">
                        <input
                            id="search-bar"
                            onChange={this.handleKeyUp}
                            value={this.props.searchText}
                            type="text"
                            placeholder="type ingredients or recipe..."
                        />
                        <span className="fas fa-search" />
                    </div>
                    {addRecipeLink}
                    {registerLink}
                    {loginLink}
                    {logoutLink}
                </Navbar>
            </div>
        );
    }
}
