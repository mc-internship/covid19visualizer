import React from 'react';
import { Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import World from './GlobeComponent';
import {useEffectOnce} from 'react-use';
import  {useState} from 'react';
import { formatNumber} from '../shared/UtilFunctions.js';

import {Helmet} from 'react-helmet';

import indiadata from './data/indiadatajson.json';
import germanydata from './data/germanydatajson.json';
import italydata from './data/italydatajson.json';
import singdata from './data/singaporedatajson.json';
import usadata from './data/usadatajson.json';



function Home(props) {

    const [news, setNews] = useState(null);

    useEffectOnce(() => {
      getnews();
    });
    
    const getnews = async () => {
      try {
        const test = await fetch("https://newsapi.org/v2/everything?qInTitle=+corona&from=2020-05-22&pageSize=50&language=en&sortBy=relevancy&apiKey=9748d4daaf4343efa9ca0e89e48bac5f", {
          method: "GET",
          headers: {
              'Access-Control-Allow-Origin': 'http://covid19visual.herokuapp.com'
        }});
        const data = await test.json();
        setNews(data.articles)

        console.log((data.articles[0]).source.id)
        console.log(data.articles)
        console.log(news)
        
        } catch (err) {
        console.log(err);
      }
    };

    return(
      <div>
      <div className = "card-body">
        <span>News Feed</span>
      <div id="feed-content" className="left-col-feed-cards-text">
          <React.Fragment>
            { news && <ul className="list-group list-group-flush">
              {(news.map((value,index) =>
                <a className="news-item list-group-item" n_clicks="0" n_clicks_timestamp="-1" href ={value.url}>
                <div className="news-item-container"><h6 className="news-txt-headline"> {value.title}
              </h6><p className="news-txt-by-dt">{value.source.name}  {new Date(value.publishedAt).toDateString()}</p></div></a>))}
              </ul> 
            }
          </React.Fragment>
          </div>
      </div> 




      <div className="homecontainer">
        <Helmet>
          <title>Home</title>
          <meta name="title" content="Graphs" />
        </Helmet>


        <div className = "globe">
          <World />
        </div>
 
        <div className = "countries">
        <Link to={'/home/india'} style={{ textDecoration: 'none' }}>
          <Card hoverable="true" className = "countrycard">
          
              <h1 style = {{color: '#ffccccd5'}}>India</h1>
              <h2 style = {{color: '#ff6666dc'}}>{formatNumber(indiadata.cases_time_series[indiadata.cases_time_series.length-1].totalconfirmed)}</h2>
              <h4 style = {{color: '#ff6666dc'}}>Confirmed</h4>
              <div className = "cases">
                <div className = "box">
              <h5 style = {{color: '#80e6ffce'}}>{formatNumber(
                indiadata.cases_time_series[indiadata.cases_time_series.length-1].totalconfirmed
                -indiadata.cases_time_series[indiadata.cases_time_series.length-1].totaldeceased
                -indiadata.cases_time_series[indiadata.cases_time_series.length-1].totalrecovered)}</h5>
              <h6 style = {{color: '#80e6ffce'}}>Active</h6>
              </div>
              <div className = "box">
              <h5 style = {{color: '#c2c2d6e0'}}>{formatNumber(indiadata.cases_time_series[indiadata.cases_time_series.length-1].totaldeceased)}</h5>
              <h6 style = {{color: '#c2c2d6e0'}}>Deaths</h6>
              </div>
              <div className = "box">
              <h5 style = {{color: '#7ebf80'}}>{formatNumber(indiadata.cases_time_series[indiadata.cases_time_series.length-1].totalrecovered)}</h5>
              <h6 style = {{color: '#7ebf80'}}>Recovered</h6>
              </div>
              </div>
            
          </Card>
        </Link>
        <Link to={'/home/usa'} style={{ textDecoration: 'none' }}>
        <Card hoverable="true" className = "countrycard">
          
          <h1 style = {{color: '#ffccccd5'}}>USA</h1>
          <h2 style = {{color: '#ff6666dc'}}>{formatNumber(usadata.cases_time_series[usadata.cases_time_series.length-1].totalconfirmed)}</h2>
          <h4 style = {{color: '#ff6666dc'}}>Confirmed</h4>
          <div className = "cases">
            <div className = "box">
          <h5 style = {{color: '#80e6ffce'}}>{formatNumber(
            usadata.cases_time_series[usadata.cases_time_series.length-1].totalconfirmed
            -usadata.cases_time_series[usadata.cases_time_series.length-1].totaldeceased
            -usadata.cases_time_series[usadata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#80e6ffce'}}>Active</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#c2c2d6e0'}}>{formatNumber(usadata.cases_time_series[usadata.cases_time_series.length-1].totaldeceased)}</h5>
          <h6 style = {{color: '#c2c2d6e0'}}>Deaths</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#7ebf80'}}>{formatNumber(usadata.cases_time_series[usadata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#7ebf80'}}>Recovered</h6>
          </div>
          </div>
        
      </Card>
        </Link>
        <Link to={'/home/germany'} style={{ textDecoration: 'none' }}>
        <Card hoverable="true" className = "countrycard">          
          <h1 style = {{color: '#ffccccd5'}}>Germany</h1>
          <h2 style = {{color: '#ff6666dc'}}>{formatNumber(germanydata.cases_time_series[germanydata.cases_time_series.length-1].totalconfirmed)}</h2>
          <h4 style = {{color: '#ff6666dc'}}>Confirmed</h4>
          <div className = "cases">
            <div className = "box">
          <h5 style = {{color: '#80e6ffce'}}>{formatNumber(
            germanydata.cases_time_series[germanydata.cases_time_series.length-1].totalconfirmed
            -germanydata.cases_time_series[germanydata.cases_time_series.length-1].totaldeceased
            -germanydata.cases_time_series[germanydata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#80e6ffce'}}>Active</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#c2c2d6e0'}}>{formatNumber(germanydata.cases_time_series[germanydata.cases_time_series.length-1].totaldeceased)}</h5>
          <h6 style = {{color: '#c2c2d6e0'}}>Deaths</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#7ebf80'}}>{formatNumber(germanydata.cases_time_series[germanydata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#7ebf80'}}>Recovered</h6>
          </div>
          </div>
        
      </Card>
        </Link>
        <Link to={'/home/italy'} style={{ textDecoration: 'none' }}>
        <Card hoverable="true" className = "countrycard">          
          <h1 style = {{color: '#ffccccd5'}}>Italy</h1>
          <h2 style = {{color: '#ff6666dc'}}>{formatNumber(italydata.cases_time_series[italydata.cases_time_series.length-1].totalconfirmed)}</h2>
          <h4 style = {{color: '#ff6666dc'}}>Confirmed</h4>
          <div className = "cases">
            <div className = "box">
          <h5 style = {{color: '#80e6ffce'}}>{formatNumber(
            italydata.cases_time_series[italydata.cases_time_series.length-1].totalconfirmed
            -italydata.cases_time_series[italydata.cases_time_series.length-1].totaldeceased
            -italydata.cases_time_series[italydata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#80e6ffce'}}>Active</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#c2c2d6e0'}}>{formatNumber(italydata.cases_time_series[italydata.cases_time_series.length-1].totaldeceased)}</h5>
          <h6 style = {{color: '#c2c2d6e0'}}>Deaths</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#7ebf80'}}>{formatNumber(italydata.cases_time_series[italydata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#7ebf80'}}>Recovered</h6>
          </div>
          </div>
        
      </Card>
        </Link>
        <Link to={'/home/singapore'} style={{ textDecoration: 'none' }}>
        <Card hoverable="true" className = "countrycard">          
          <h1 style = {{color: '#ffccccd5'}}>Singapore</h1>
          <h2 style = {{color: '#ff6666dc'}}>{formatNumber(singdata.cases_time_series[singdata.cases_time_series.length-1].totalconfirmed)}</h2>
          <h4 style = {{color: '#ff6666dc'}}>Confirmed</h4>
          <div className = "cases">
            <div className = "box">
          <h5 style = {{color: '#80e6ffce'}}>{formatNumber(
            singdata.cases_time_series[singdata.cases_time_series.length-1].totalconfirmed
            -singdata.cases_time_series[singdata.cases_time_series.length-1].totaldeceased
            -singdata.cases_time_series[singdata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#80e6ffce'}}>Active</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#c2c2d6e0'}}>{formatNumber(singdata.cases_time_series[singdata.cases_time_series.length-1].totaldeceased)}</h5>
          <h6 style = {{color: '#c2c2d6e0'}}>Deaths</h6>
          </div>
          <div className = "box">
          <h5 style = {{color: '#7ebf80'}}>{formatNumber(singdata.cases_time_series[singdata.cases_time_series.length-1].totalrecovered)}</h5>
          <h6 style = {{color: '#7ebf80'}}>Recovered</h6>
          </div>
          </div>
        
      </Card>
        </Link>
        </div>  

      </div>
      </div>
    );
}

export default Home;   