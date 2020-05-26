import React, {Component, useState, useEffect} from 'react';
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron} from 'reactstrap';
import { NavLink } from 'react-router-dom';
//import axios from 'axios';
import { formatNumber} from '../shared/UtilFunctions.js';
import datajson from './data/worlddata.json';

function Worldstats(props) {

   /* const [fetched, setFetched] = useState(false);
  const [worlddata, setTimeseries] = useState([]);
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        stateDailyResponse,
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/states_daily.json'),
      ]);
      setTimeseries(datajson);
      setStatesTimeSeries(stateDailyResponse.data.states_daily);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };*/

  return(
    <Jumbotron>
    <div className = "container">
        <div className = "row row-header align-items-left ">
            <h6>WorldWide Stats</h6>
        </div>
            <div className = "col-2 col-stats" >
                <h3>{formatNumber(datajson[datajson.length-1].confirmed)}</h3>
                <h6>{`+${formatNumber(datajson[datajson.length-1].deltaconfirmed)}`}</h6>
                <h5>Confirmed</h5>
            </div>
            <div className = "col-2 col-stats" >
            <h3>{formatNumber(datajson[datajson.length-1].active)}</h3>
                <h6>{datajson[datajson.length-1].deltaactive >=0 ? `+${formatNumber(datajson[datajson.length-1].deltaactive)}` : `${formatNumber(datajson[datajson.length-1].deltaactive)}`}</h6>
                <h5>Active</h5>
            </div>
            <div className = "col-2 col-stats" >
            <h3>{formatNumber(datajson[datajson.length-1].recovered)}</h3>
                <h6>{`+${formatNumber(datajson[datajson.length-1].deltarecovered)}`}</h6>
                <h5>Recovered</h5>
            </div>
            <div className = "col-2 col-stats" >
            <h3>{formatNumber(datajson[datajson.length-1].deceased)}</h3>
                <h6>{`+${formatNumber(datajson[datajson.length-1].deltadeceased)}`}</h6>
                <h5>Deceased</h5>
            </div>
            <div className = "col-2 col-stats" >
                <h3>{((datajson[datajson.length-1].deceased/datajson[datajson.length-1].confirmed)*100).toFixed(2)}%</h3>
                <h5>Fatality Rate</h5>
            </div>
            <div className = "col-2 col-stats" >
            <h3>{((datajson[datajson.length-1].recovered/datajson[datajson.length-1].confirmed)*100).toFixed(2)}%</h3>
                <h5>Recovery Rate</h5>
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
                            <NavItem>
                                <NavLink className = "nav-link" to = "/events">
                                    <span className = "fa fa-calendar fa-lg"></span> Events
                                </NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                        
                    </div>
                </Navbar>
                {/*<Jumbotron>
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
                </Jumbotron>*/}
                <Worldstats/>
            </>
        );
    }
}

export default Header;