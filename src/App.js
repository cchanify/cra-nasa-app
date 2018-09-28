import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
//import './components/AstronomyContainer';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>

      <div className="App">
        <AstronomyContainer/>
      </div>
    );
  }
}

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

const AstronomyCard = (props) => {

	const { title,
	 url,
	 hdurl,
	 explanation,
	 date,
	 copyright,
	 media_type
	} = props.data;

	function renderContent() {
		switch(media_type) {

			case('video'):
				return (
					<iframe
						allowFullScreen
	    			frameBorder="0"
	    			height="520"
	    			width="720"
	    			src={url}>
    			</iframe>
				)

				case('image'):
					return (
						<a href={hdurl} className="astronomy-image-wrapper">
								<img src={url} alt={title} />
						</a>
		    	)

		    	default:
		    		return null
		}
	}

	return (
		<div className="astronomy-card">

			<h6 className="astronomy-title">{title}</h6>

			{renderContent()}

			<p>{explanation}</p>

			<span>{date}, {copyright}</span>

		</div>
	)
}

export default App;
