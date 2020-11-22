import React, { Component } from 'react';

class cities extends Component {
  
  render() {
    return (
      <div>
        <ul>
          { this.props.data.map((cities, index) => <li key={index}>{cities.Nom_commune}</li>)}
        </ul>
      </div>
    );
  }
}

export default cities;

