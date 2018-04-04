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
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            typingTimeOut: 0
        };
        this.toggle = this.toggle.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                    <NavLink href="/login">Login</NavLink>
                </NavItem>
            );
            registerLink = (
                <NavItem>
                    <NavLink href="/registration">Register</NavLink>
                </NavItem>
            );
        }
        if (this.isLoggedIn()) {
            logoutLink = (
                <Link className="nav-link" to="/" onClick={this.onLogout}>
                    Logout
                </Link>
            );
            addRecipeLink = (
                <NavItem>
                    <NavLink href="/recipeUploader">Add Recipe</NavLink>
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
                        <span
                            onClick={this.handleClick}
                            className="fas fa-search"
                        />
                    </div>
                    {addRecipeLink}
                    {registerLink}
                    {loginLink}
                    {logoutLink}
                    <NavbarToggler onClick={this.toggle} />
                </Navbar>
            </div>
        );
    }
}
//

//WITH OR WITHOUT THIS LOGO?
//<NavItem>
//     <NavLink href="/">
//         <img id="logo" src="./images/logo.png" alt="Logo" />
//     </NavLink>
// </NavItem>

//link for footer
//<a href="http://www.freepik.com">Designed by Valeria_Aksakova / Freepik</a>
