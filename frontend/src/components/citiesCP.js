import React, { Component } from 'react';
import axios from 'axios'

class citiesCP extends Component {
  
  state = { 
    cities: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/v1/city/cp/72470`)
      .then(res => {
        const cities = res.data;
        this.setState({ cities });
      })
  }
  
  render() {
    return (
      <div>
        <h2>Code Postal</h2>
        <ul>
          { this.state.cities.map(cities => <li>{cities.Nom_commune}</li>)}
        </ul>
      </div>
    );
  }
}

export default citiesCP;

