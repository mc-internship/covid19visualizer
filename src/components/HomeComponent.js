import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderCountryItem({country, onClick}){   
  return(

      <Card >  
          <Link to  = {`/home/${country.id}`}>
              
                  <CardTitle>
                      {country.name}
                  </CardTitle>
          </Link>
    </Card>

  );
}

const Home = (props) => {


  
  const home = props.countries.map((country) => {
      return(//every list item requires a key, identify each of these elements uniquely m-1 => margin -1 
      <div key = {country.id} className = "col-12 col-md-5 m-1"> 
          <RenderCountryItem country = {country}  />
      </div>
  
      );
  });

return (
  <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Home</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>Home</h3>
              <hr />
          </div>                
      </div>
      <div className="row">
          {home}
      </div>
  </div>
);
}

/*function Home(props) {
    return(
      <div className="container">

      <


        <h4>Home</h4>
      </div>
    );
}*/

export default Home;   
