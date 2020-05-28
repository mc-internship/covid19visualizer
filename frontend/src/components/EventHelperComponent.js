import React from "react";
import {format, parse} from 'date-fns';
import {ListGroupItem} from 'reactstrap';

function EventHelper(props) {

    const startdates = [];
    const enddates = [];
    const eventname = [];

    props.events.forEach((data) => {
        const start = parse(data.startdate, 'y-M-d', new Date(2020, 0, 1));
        const end = parse(data.enddate, 'y-M-d', new Date(2020, 0, 1));
        startdates.push(format(start, 'do MMM yy'));
        enddates.push(format(end, 'do MMM yy'));
        eventname.push(data.event);
    });

    var eventlist = eventname.map(function(event,index){
        return <ListGroupItem key = {index} className = "eventlist">
            <h3>{startdates[index]} - {enddates[index]} </h3> 
            <p>{event}</p>
        </ListGroupItem>;
    })

    return(
        <div className="container">
            <h2> Events in {props.name} </h2>

            <div>
            {eventlist}
            </div>

        </div>
    );
}

export default EventHelper;