import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Impact from './ImpactComponent';
import Timeline from './TimelineComponent';
import Demographics from './DemographicsComponent';
import Footer from './FooterComponent';
import India from './IndiaComponent';
import Usa from './UsaComponent';
import Germany from './GermanyComponent';
import Italy from './ItalyComponent';
import Singapore from './SingComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import IndiaStats from './timeline/india';
import UsaStats from './timeline/usa';


class Main extends Component {

    constructor(props){
      super(props);

      
  }
 
    render(){
  

        return (
            <div>
              <Header />
              
              <Switch>
                <Route exact path = "/home" component = {Home} />
                <Route exact path='/timeline' component={Timeline} />
                <Route exact path = "/demographics" component = {Demographics} />
                <Route exact path = "/impact" component = {Impact} />
                <Route exact path = "/home/india" component = {India}/>
                <Route exact path = "/home/usa" component = {Usa}/>
                <Route exact path = "/home/germany" component = {Germany}/>
                <Route exact path = "/home/italy" component = {Italy}/>
                <Route exact path = "/home/singapore" component = {Singapore}/>
                <Redirect to = "/home"/>
              </Switch>
              
              <Footer />
            </div>

        );
    }
}

export default Main;