import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./components/user/user";
import Booking from "./components/booking/booking";
import axios from "axios";
import MyFancyComponent from "./components/map/map_mod";
import BottomNavigation from "./components/BottomNavigation";
import Setting from "./components/Setting/setting";
import Filtered from "./components/filtered/filtered";
import "./App.css";

class App extends Component {
  state = {
    userInfo: [],
    placeInfo: []
  };

  componentDidMount() {
    console.log(this.state);
  }

  getUsers = async () => {
    try {
      const people = await axios.get("http://13.231.153.234:3000/people");
      console.log(people.data);
      this.setState({ userInfo: people.data });
      return people.data;
    } catch (error) {
      console.error(error);
    }
  };

  getPlaces = async () => {
    try {
      const places = await axios.get("http://13.231.153.234:3000/locations");
      console.log(places.data);
      this.setState({ placeInfo: places.data });
      return places.data;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <Router>
        <div className="App" style={{ width: "100%", height: "575px" }}>
          <Route
            path="/"
            exact
            render={props => (
              <MyFancyComponent
                {...props}
                getUsers={this.getUsers}
                getPlaces={this.getPlaces}
              />
            )}
          />
          <Route path="/booking" component={Booking} />
          <Route path="/user" component={User} />
          <Route path="/setting" component={Setting} />
          <Route path = "/filterd" 
             render={props => (
              <Filtered
                {...props}
                getUsers={this.getUsers}
                getPlaces={this.getPlaces}
              />
            )} />
        </div>
        <BottomNavigation />
      </Router>
    );
  }
}

export default App;
