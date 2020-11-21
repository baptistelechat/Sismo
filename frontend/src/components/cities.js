import React, { Component } from 'react';
import axios from 'axios'

class cities extends Component {
  
  state = { 
    cities: [],
    search: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.get(`http://localhost:8000/api/v1/city/cp/${this.state.search}`)
      .then(res => {
        const cities = res.data;
        this.setState({ cities });
      })
  }

  handleChange= (event) => {
    const value = event.currentTarget.value
    this.setState({search:value});
  }
  
  render() {
    return (
      <div>
        <h2>Code Postal</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" onChange={this.handleChange} placeholder="Champ de recherche" value={this.state.search}/>
          <button>Envoyer</button>
        </form>
        <ul>
          { this.state.cities.map(cities => <li>{cities.Nom_commune}</li>)}
        </ul>
      </div>
    );
  }
}

export default cities;

