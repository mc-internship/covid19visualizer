import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Impact from './ImpactComponent';
import Timeline from './TimelineComponent';
import Demographics from './DemographicsComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import CountryDetail from './CountryDetailComponent';
import { COUNTRIES } from '../shared/countries';

class Main extends Component {

    constructor(props){
      super(props);

      this.state = {
        countries: COUNTRIES,
      };
  }
 
    render(){


      const CountryWithId = ({match}) => {
        return(
          <CountryDetail country={this.state.countries.filter((country) => country.id === parseInt(match.params.countryId, 10 ))[0]}
           
            />
        );
      }
  

        return (
            <div>
              <Header />
              
              <Switch>
                <Route exact path = "/home" component = {() => <Home countries = {this.props.countries}/>} />
                <Route path = "/home/:countryId" component = {CountryWithId} />
                <Route exact path='/timeline' component={Timeline} />
                <Route exact path = "/demographics" component = {Demographics} />
                <Route exact path = "/impact" component = {Impact} />
                <Redirect to = "/home"/>
              </Switch>
              
              <Footer />
            </div>

        );
    }
}

export default Main;