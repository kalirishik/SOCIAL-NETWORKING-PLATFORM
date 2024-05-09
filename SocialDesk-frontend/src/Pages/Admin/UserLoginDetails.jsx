import { useEffect, useState } from "react";
import axios from "axios";
import "./UserLoginDetails.css";
const UserLoginDetails = () => {
  axios.defaults.baseURL = "http://localhost:3500";
  const [data, setData] = useState([]);
  const [records, setRecords] = useState(data);
  const Filter = (event) => {
    setRecords(
      data.filter((f) => f.username.toUpperCase().includes(event.target.value) || f.username.toLowerCase().includes(event.target.value))
    );
  };
  useEffect(() => {
    axios
      .get("/userLoginDetails2")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <div>
      <input
        type="text"
        name="search2"
        onChange={Filter}
        className="search-box" autoFocus autoComplete="off"
        placeholder="Search By Name...🔎"  style={{width:285}}
      />
      <br />
      <br />
      <div>
        <table>
          <tr>
              <th>USER NAME</th>
              <th className="email-header">EMAIL</th>
              <th>LOGIN TIME</th>
              {/* <th className="gender-header">LATITUTE</th> */}
              <th>LONGITUDE</th>
              <th>CITY</th>
              <th>STATE</th>
              <th>COUNTRY</th>
          </tr>
            <tbody>
              {records.map((user, i) => (
                <tr key={i}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.datetime}</td>
                  {/* <td>{user.latitute}</td> */}
                  <td>{user.longitude}</td>
                  <td>{user.city}</td>
                  <td>{user.state}</td>
                  <td>{user.country}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLoginDetails;
