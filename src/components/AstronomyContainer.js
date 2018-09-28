import React, { Component } from 'react';
import axios from 'axios';

import AstronomyCard from './AstronomyCard';

class AstronomyContainer extends Component {
  constructor() {
    super();

    this.state = {
      astronomy: []
    }

  }

  componentDidMount() {
    const API_KEY = 'xbyfEsX7avwpCokxTPgQhCJdUlff52Hk9I9E6S9E';
    const END_POINT = 'https://api.nasa.gov/planetary/apod?api_key=';

    axios.get(END_POINT+API_KEY)
      .then(response => {
        this.setState({
          astronomy: response.data
        })
      })
      .catch(error => {
        console.log(error, 'failed to fetch data')
      });
  }

  render() {
    const { astronomy } = this.state;
    return (
      <AstronomyCard data={astronomy} />
    )
  }
}

export default AstronomyContainer;
