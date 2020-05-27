import React from 'react';
import { Card, CardTitle, CardBody} from 'reactstrap';
import { Link } from 'react-router-dom';
import World from './GlobeComponent';
import {useEffectOnce} from 'react-use';
import  {useState, useCallback} from 'react';

import {Helmet} from 'react-helmet';




function Home(props) {

    const [news, setNews] = useState(null);

    useEffectOnce(() => {
      getnews();
    });
    
    const getnews = async () => {
      try {
        const test = await fetch("https://newsapi.org/v2/everything?qInTitle=+corona&from=2020-05-22&pageSize=50&language=en&sortBy=relevancy&apiKey=9748d4daaf4343efa9ca0e89e48bac5f", {
        method: "GET"
        });
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


<div className = "newsfeed">  
        <React.Fragment>
          {news && 
            (news.map((value,index) => <a href = {value.url}>{value.title}</a>))} 
            </React.Fragment>
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
          <Card hoverable className = "countrycard">
          <CardBody>
              <h1>India</h1>
            
              <h2 >1,42,410</h2>
              <h4>Confirmed</h4>
              <div className = "cases">
                <div className = "box">
              <h5>77,752</h5>
              <h6>Active</h6>
              </div>
              <div className = "box">
              <h5>4,167</h5>
              <h6>Deaths</h6>
              </div>
              <div className = "box">
              <h5>60,491</h5>
              <h6>Recovered</h6>
              </div>
              </div>
            </CardBody>
          </Card>
        </Link>
        <Link to={'/home/usa'} style={{ textDecoration: 'none' }}>
        <Card hoverable className = "countrycard">
            <CardTitle>
              USA
            </CardTitle>
          </Card>
        </Link>
        <Link to={'/home/germany'} style={{ textDecoration: 'none' }}>
        <Card hoverable className = "countrycard">
            <CardTitle>
              Germany
            </CardTitle>
          </Card>
        </Link>
        <Link to={'/home/italy'} style={{ textDecoration: 'none' }}>
        <Card hoverable className = "countrycard">
            <CardTitle>
              Italy
            </CardTitle>
          </Card>
        </Link>
        <Link to={'/home/singapore'} style={{ textDecoration: 'none' }}>
        <Card hoverable className = "countrycard">
            <CardTitle>
              Singapore
            </CardTitle>
          </Card>
        </Link>
        </div>  

      </div>
      </div>
    );
}

export default Home;   