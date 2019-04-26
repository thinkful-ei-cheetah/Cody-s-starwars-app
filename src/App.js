import './App.css';
import React, { Component } from 'react'

export default class App extends Component {
   state={
    starwarsNames: [],
    error:null,
    
   }

  handleSearch = (e) => {
    e.preventDefault()
    const value = e.target['star-search'].value


const searchURL = `https://swapi.co/api/people/?search=${value}`;

    const options = {
      method: 'GET',
      headers: {

        "Content-Type": "application/json"
             }
    };

    fetch(searchURL, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
       console.log(data)
        const listItems = data.results.map( list => {
          
          return {
            name:list.name
          };
        })

        this.setState({
          starwarsNames: listItems,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
    }


  render() {

  

    const StarWars = this.state.starwarsNames.map((person, index) => {
      return (<li key={index}>{person.name}</li>)
    });

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <label>Star Wars Search</label>
          <input type='text' name='star-search'/>
          <button type='submit'>Search</button>
        </form>
        <ul>{StarWars}</ul>
      </div>
    )
   }
  }
