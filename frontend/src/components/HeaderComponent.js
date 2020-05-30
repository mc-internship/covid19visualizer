import React, {Component, useState, useEffectOnce} from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron} from 'reactstrap';
import { NavLink } from 'react-router-dom';
//import axios from 'axios';
import { formatNumber} from '../shared/UtilFunctions.js';
import {worlddata} from './dataexport.js';

function Worldstats(props) {

    const [fetched, setFetched] = useState(false);
    const [datajson, setData] = useState([]);

    useEffectOnce(() => {
        if (fetched === false) {
          getStates();
        }
      }, [fetched]);

    const getStates = async () => {
    try {
        let testJson;
        testJson = await worlddata();

        setData(testJson);
        setFetched(true);
    } catch (err) {
        console.log(err);
    }
    };  



  return(
    <Jumbotron>
    <div className = "container">
        {/*<div className = "row row-header align-items-left ">
            <h6>WorldWide</h6>
  </div>*/}
            <div className = "col-2 col-stats" >
                <div className = "boxes">
                <h3 style = {{color: '#ff6666'}}>{formatNumber(datajson[datajson.length-1].confirmed)}</h3>
                <h6 style = {{color: '#ff6666'}}>{`+${formatNumber(datajson[datajson.length-1].deltaconfirmed)}`}</h6>
                <h5 style = {{color: '#ff6666'}}>CONFIRMED</h5>
                </div>
            </div>
            <div className = "col-2 col-stats" >
            <div className = "boxes">
            <h3 style = {{color: 'lightblue'}}>{formatNumber(datajson[datajson.length-1].active)}</h3>
                <h6 style = {{color: 'lightblue'}}>{datajson[datajson.length-1].deltaactive >=0 ? `+${formatNumber(datajson[datajson.length-1].deltaactive)}` : `${formatNumber(datajson[datajson.length-1].deltaactive)}`}</h6>
                <h5 style = {{color: 'lightblue'}}>ACTIVE</h5>
            </div>
            </div>
            <div className = "col-2 col-stats" >
            <div className = "boxes">
            <h3 style = {{color: 'lightgreen'}}>{formatNumber(datajson[datajson.length-1].recovered)}</h3>
                <h6 style = {{color: 'lightgreen'}}>{`+${formatNumber(datajson[datajson.length-1].deltarecovered)}`}</h6>
                <h5 style = {{color: 'lightgreen'}}>RECOVERED</h5>
            </div>
            </div>
            <div className = "col-2 col-stats" >
            <div className = "boxes">
            <h3 style = {{color: 'lightgrey'}}>{formatNumber(datajson[datajson.length-1].deceased)}</h3>
                <h6 style = {{color: 'lightgrey'}}>{`+${formatNumber(datajson[datajson.length-1].deltadeceased)}`}</h6>
                <h5 style = {{color: 'lightgrey'}}>DECEASED</h5>
            </div>
            </div>
            <div className = "col-2 col-stats" >
            <div className = "boxes">
                <h3 style = {{color: 'orange'}}>{((datajson[datajson.length-1].deceased/datajson[datajson.length-1].confirmed)*100).toFixed(2)}%</h3>
                <h5 style = {{color: 'orange'}}>FATALITY</h5>
                <h5 style = {{color: 'orange'}}>RATE</h5>
            </div>
            </div>
            <div className = "col-2 col-stats" >
            <div className = "boxes">
            <h3 style = {{color: 'lightpink'}}>{((datajson[datajson.length-1].recovered/datajson[datajson.length-1].confirmed)*100).toFixed(2)}%</h3>
                <h5 style = {{color: 'lightpink'}}>RECOVERY</h5>
                <h5 style = {{color: 'lightpink'}}>RATE</h5>
            </div>
            </div>
          
    </div>
</Jumbotron>
  );



}

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
                            <h1 style = {{fontFamily: 'arial'}}>COVID-19 <font color="salmon">TRACKER</font></h1>
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
                            <NavItem>
                                <NavLink className = "nav-link" to = "/events">
                                    <span className = "fa fa-calendar fa-lg"></span> Events
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                        
                    </div>
                </Navbar>
                <Worldstats/>
            </>
        );
    }
}

export default Header;