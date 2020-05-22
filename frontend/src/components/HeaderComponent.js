import React, { Component } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props){
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return(
           
            <>
                <Navbar dark expand = "md">
                    <div className = "container">
                        <NavbarToggler onClick = {this.toggleNav} />
                        <div className = "heading">
                            <h1>COVID-19 TRACKER</h1>
                        </div>
                        <Collapse isOpen = {this.state.isNavOpen} navbar>
                        <Nav navbar className = "navbar-nav ml-auto">
                            <NavItem >
                                <NavLink className = "nav-link" to = "/home">
                                    <span className = "fa fa-home fa-lg"></span> Home
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/timeline">
                                    <span className = "fa fa-line-chart fa-lg"></span> Timeline
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/demographics">
                                    <span className = "fa fa-users fa-lg"></span> Demographics
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className = "nav-link" to = "/impact">
                                    <span className = "fa fa-university fa-lg"></span> Impact
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                        
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className = "container">
                        <div className = "row row-header align-items-left ">
                            <h6>WorldWide Stats</h6>
                        </div>
                            <div className = "col-2 col-stats" >
                                <h3>41,20,159</h3>
                                <h5>Confirmed</h5>
                            </div>
                            <div className = "col-2 col-stats" >
                                <h3>23,80,997</h3>
                                <h5>Active</h5>
                            </div>
                            <div className = "col-2 col-stats" >
                                <h3>14,58,399</h3>
                                <h5>Recovered</h5>
                            </div>
                            <div className = "col-2 col-stats" >
                                <h3>2,80,763</h3>
                                <h5>Dead</h5>
                            </div>
                            <div className = "col-2 col-stats" >
                                <h3>6.81%</h3>
                                <h5>Fatality Rate</h5>
                            </div>
                            <div className = "col-2 col-stats" >
                                <h3>35.4%</h3>
                                <h5>Recovery Rate</h5>
                            </div>
                          
                    </div>
                </Jumbotron>
            </>
        );
    }
}

export default Header;