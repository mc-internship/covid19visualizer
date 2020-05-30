import React, {useState} from 'react';
import { Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import World from './GlobeComponent';
import { formatNumber} from '../shared/UtilFunctions.js';

import {Helmet} from 'react-helmet';
import {useEffectOnce} from 'react-use';
import {germanydatajson,indiadatajson,italydatajson,singaporedatajson,usadatajson} from './dataexport.js';

import {news} from './dataexport.js';


function Home(props) {

   const [fetched, setFetched] = useState(false);
    const [newsdata, setNews] = useState(null);
    const [indiadata, setIN] = useState([]);
    const [usadata, setUS] = useState([]);
    const [germanydata, setGR] = useState([]);
    const [italydata, setIT] = useState([]);
    const [singdata, setSG] = useState([]);


    useEffectOnce(() => {
      if (fetched === false) {
        getStates();
      }
    }, [fetched]);
    
    const getStates = async () => {
      try {

        let testJson1;
        testJson1 = await indiadatajson();
        setIN(testJson1);
        let testJson2;
        testJson2 = await usadatajson();
        setUS(testJson2);
        let testJson3;
        testJson3 = await germanydatajson();
        setGR(testJson3);
        let testJson4;
        testJson4 = await italydatajson();
        setIT(testJson4);
        let testJson5;
        testJson5 = await singaporedatajson();
        setSG(testJson5);

        let testJson6;
        testJson6 = await news();
        setNews(testJson6.articles)

        console.log((testJson6.articles[0]).source.id)
        console.log(testJson6.articles)
        console.log(newsdata)

        setFetched(true);
        
        } catch (err) {
        console.log(err);
      }
    };

    return(
      <div className="homecontainer">
        <Helmet>
          <title>Home</title>
          <meta name="title" content="Graphs" />
        </Helmet>

        <div className = "card-body">
        <span>News Feed</span>
      <div id="feed-content" className="left-col-feed-cards-text">
          <React.Fragment>
            { newsdata && <ul className="list-group list-group-flush">
              {(newsdata.map((value,index) =>
                <a className="news-item list-group-item" n_clicks="0" n_clicks_timestamp="-1" href ={value.url}>
                <div className="news-item-container"><h6 className="news-txt-headline"> {value.title}
              </h6><p className="news-txt-by-dt">{value.source.name}  {new Date(value.publishedAt).toDateString()}</p></div></a>))}
              </ul> 
            }
          </React.Fragment>
          </div>
      </div> 

      <div className = "globe">
          <World />
        </div>


       
 
        <div className = "countries">
        
          <Card hoverable="true" className = "countrycard">
          <Link to={'/home/india'} style={{ textDecoration: 'none' }}>
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
              </Link>
          </Card>
        
        
        <Card hoverable="true" className = "countrycard">
        <Link to={'/home/usa'} style={{ textDecoration: 'none' }}>
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
          </Link>
      </Card>
       
        
        <Card hoverable="true" className = "countrycard">          
        <Link to={'/home/germany'} style={{ textDecoration: 'none' }}>
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
          </Link>
      </Card>
       
        
        <Card hoverable="true" className = "countrycard">      
        <Link to={'/home/italy'} style={{ textDecoration: 'none' }}>   
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
          </Link> 
      </Card>
        
        
        <Card hoverable="true" className = "countrycard">         
        <Link to={'/home/singapore'} style={{ textDecoration: 'none' }}>
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
          </Link>
      </Card>
        
        </div>  

      </div>
    );
}

export default Home;   