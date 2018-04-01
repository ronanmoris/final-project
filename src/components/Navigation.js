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

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            typingTimeOut: 0
        };
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleKeyUp(e) {
        this.props.onKeyUp(e);
    }

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand href="/">What`s for dinner?</NavbarBrand>
                    <div className="search-box">
                        <input
                            id="search-bar"
                            value={this.props.searchText}
                            onChange={this.handleKeyUp}
                            type="text"
                            placeholder="type ingredients or recipe..."
                        />
                    </div>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
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

//link for footer
//<a href="http://www.freepik.com">Designed by Valeria_Aksakova / Freepik</a>
