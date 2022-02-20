import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import WeatherOutput from "./components/WeatherOutput";

//let zipcodeAPI = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=64795acd7778d8dcbd8100c83e28916f&units=imperial`

//var zipCode = 32259

// GOING TO HAVE USER ENTER ZIPCODE AND THEN LOOK UP INFO FROM THERE

class Derp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: "chicago", inputVal: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //FIX THIS TO ONLY TAKE NUMBERS REGEX AFTER
  handleChange(e) {
    this.setState({ inputVal: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let zipCode = this.state.inputVal;
    let zipcodeAPI = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=64795acd7778d8dcbd8100c83e28916f&units=imperial`;
    fetch(zipcodeAPI)
      .then((res) => {
        
       return res.json();
      })
      .then((data) => data.name)
      .then((res) => this.setState({ location: res }))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.inputVal}
            onChange={this.handleChange}
            type="text"
          />
          <input type="submit" />
        </form>
        <WeatherOutput location={this.state.location} />
      </div>
    );
  }
}

ReactDOM.render(<Derp />, document.getElementById("root"));
