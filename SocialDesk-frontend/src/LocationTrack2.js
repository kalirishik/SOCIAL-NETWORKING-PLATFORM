import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./LocationTrack.css";
import { Link } from "react-router-dom";

function LocationTrack2() {
  const [currLocation, setCurrLocation] = useState({});
  const [currLocationJs, setCurrLocationJs] = useState({});
  // const {pathData,pathData2}=useParams();
  useEffect(() => {
    getLocation();
    getLocationJs();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });
    });
  };

  return (
    <div className="location-track-container"><br/><br/><br/>
      <h1 className="location-heading">Current Location</h1>
      <table className="location-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Country_Capital</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>IPAPI</td>
            <td>{currLocation.latitude}</td>
            <td>{currLocation.longitude}</td>
            <td>{currLocation.city}</td>
            <td>{currLocation.region}</td>
            <td>{currLocation.country_name}</td>
            <td>{currLocation.country_capital}</td>
          </tr>
        </tbody>
      </table><br/><br/><br/><br/>
      <Link to="/AdminPanel">
      <h4>GO TO HOME</h4>
      </Link>
    </div>
  );
}

export default LocationTrack2;
