import React from "react";

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
        this.handleClick = this.handleClick.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleKeyUp(e) {
        this.props.onKeyUp(e);
    }
    //NOT WORKING!!!
    handleClick() {
        console.log("cliquei");
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand id="navbar-brand" href="/">
                        What`s for dinner?
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
                    <NavItem>
                        <NavLink href="/registration">Register</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/login">Login</NavLink>
                    </NavItem>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle id="navbar-toggle" nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>LogIn</DropdownItem>

                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
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
