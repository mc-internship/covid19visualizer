import React, { Component } from 'react';

class Hello extends Component{

    constructor(props){
        super(props);

        this.state = {
            data: null,
        };          
    }

    componentDidMount() {
        fetch('localhost:8000/api/helloworld')
          .then(response => response.json())
          .then(data => this.setState({ data }));
    }

    
}

export default Hello;