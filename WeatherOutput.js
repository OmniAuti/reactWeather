import React from 'react'

class WeatherOutput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
      };
    }


    componentDidMount() {
     var api = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.location}&appid=64795acd7778d8dcbd8100c83e28916f&units=imperial`;
      fetch(api)
        .then((res) => res.json())
        .then(
          (data) => {
            this.setState({ isLoaded: true, items: data });
          },
          (error) => this.setState({ isLoaded: true, error: true})
        );
    }

    // THIS METHOD RIGHT HERE UPDATES THE COMPONENT!!!!

    componentDidUpdate(prevProps) {
      if (this.props.location !== prevProps.location) {
        var api = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.location}&appid=64795acd7778d8dcbd8100c83e28916f&units=imperial`;
        fetch(api)
          .then((res) => res.json())
          .then(
            (data) => {
              this.setState({ isLoaded: true, items: data });
            },
            (error) => this.setState({ isLoaded: true, error: true })
          );
      }

    }
  
    render() {
      const {isLoaded, error, items} = this.state;
      if (error) {
        return (
          <div>
            <h1>Error loading weather. Look outside.</h1>
          </div>
        );
      } else if (!isLoaded) {
        return (
          <div>
            <p>Loading . . .</p>
          </div>
        );
      } else if (isLoaded) {
        return <div>
          <h1>{items.name}</h1>
          <h1>{items.clouds.all}</h1>
          <h1>{items.wind.speed}</h1>
          <h1>{items.main.temp}</h1>
          <h1>{items.main.humidity}</h1>
          <h1>{items.main.feels_like}</h1>
          <h1>{items.temp_max}</h1>
          <h1>Min Temp: {items.temp_min}</h1>
        </div>;
      }
    }
  }

  export default WeatherOutput