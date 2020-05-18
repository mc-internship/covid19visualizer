import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';




function Home(props) {
    return(
      <div className="container">
        <h4>Home</h4>
        <div className = "countries">
        <Link to={'/home/india'} style={{ textDecoration: 'none' }}>
          <Card hoverable className = "countrycard">
            <CardTitle>
              India 
            </CardTitle>
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

    


    );
}

export default Home;   
