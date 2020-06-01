import React, { Component } from 'react';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Impact from './ImpactComponent';
import Timeline from './TimelineComponent';
import Demographics from './DemographicsComponent';
import Events from './EventComponent';
//import Footer from './FooterComponent';
import India from './IndiaComponent';
import Usa from './UsaComponent';
import Germany from './GermanyComponent';
import Italy from './ItalyComponent';
import Singapore from './SingComponent';
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component {
   
  
 
    render(){
  

        return (
            <div>
              <Header />
              
              <Switch>
                <Route exact path = "/home" component = {Home} />
                <Route exact path='/timeline' component={Timeline} />
                <Route exact path = "/demographics" component = {Demographics} />
                <Route exact path = "/impact" component = {Impact} />
                <Route exact path = "/events" component = {Events} />
                <Route exact path = "/home/india" component = {India}/>
                <Route exact path = "/home/usa" component = {Usa}/>
                <Route exact path = "/home/germany" component = {Germany}/>
                <Route exact path = "/home/italy" component = {Italy}/>
                <Route exact path = "/home/singapore" component = {Singapore}/>
                <Redirect to = "/home"/>
              </Switch>
              
            </div>

        );
    }
}

export default Main;