import Community from "../../Components/Community/Community"
import AdminNav from "./AdminNav"
import UserLoginDetails from "./UserLoginDetails"
import { Link } from 'react-router-dom'
import { SlLocationPin } from "react-icons/sl";
import "./AdminCss.css";
const AdminPage = () => {
  return (
    <div>
      <AdminNav/>
      <br/>
      <Link to={"/LocationDetails2"} style={{fontSize:"45px"}}>
        <SlLocationPin className='nav-icons3'/>
      </Link>
      <Community/><br/>
      <UserLoginDetails/>
      <center>
      <Link to="/">
      <h4>GO TO HOME</h4>
      </Link>
      </center>
    </div>
  )
}

export default AdminPage