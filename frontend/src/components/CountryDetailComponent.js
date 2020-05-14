import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'; 
import { Link } from 'react-router-dom';

function RenderCountry({country}) {
    return(
       <div className="col-12 col-md-5 m-1">
       <Card>
                    
           <CardBody>
               <CardTitle>{country.name}</CardTitle>    
              
           </CardBody>
       </Card>
       </div>
   );            
};

const CountryDetail = (props) => {
    if (props.country != null) {
        return(
            <div className="container">
                 <div className="row">
                     <Breadcrumb>
                         <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
                         <BreadcrumbItem active>{props.country.name}</BreadcrumbItem>
                     </Breadcrumb>
                     <div className="col-12">
                         <h3>{props.country.name}</h3>
                         <hr />
                     </div>
                 </div>
                 <div className="row">
                 <RenderCountry country={props.country} />
                 </div> 
             </div>
         );
        }
        else {
            return(
                <div></div>
            );
        }
    };
    export default CountryDetail;