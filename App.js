import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "caf2229848ccad01293765cd4e34d565";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async(latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=caf2229848ccad01293765cd4e34d565&units=metric`
      );
      this.setState({isLoading:false, temp: data.main.temp})
  } 
  getLocation = async () => {
  try {
    await Location.requestPermissionsAsync();
    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync();
    this.getWeather(latitude, longitude)
    this.setState({ isLoading: false });
  } catch (error) {
    Alert.alert("Can't find you.", "So sad");
  }
};
componentDidMount() {
  this.getLocation();
}
render() {
  const { isLoading, temp } = this.state;
  return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} />;
}
}


