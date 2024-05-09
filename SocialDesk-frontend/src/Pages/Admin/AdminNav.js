import React from 'react'
import "./AdminNav.css"
import SearchIcon from '@mui/icons-material/Search';
import Profile from "../../assets/adminpic.jpg"
const AdminNav = ({search,setSearch,setShowMenu,profileImg}) => {
  return (
    <nav>
        <div className="n-logo">
              <h1>SOCIAL <span>DESK</span></h1>
        </div>

      <div className="n-form-button" >
        <form className='n-form' onSubmit={(e)=>e.preventDefault()} >
          <SearchIcon className='search-icon2'/>
          <input type="text" 
          placeholder='Search Community'
          id='n-search2'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          />
        </form>
      </div>
      
      <div className="n-logo2">
              <h1><span>Admin Panel</span></h1>
        </div>
       <div className="n-profile" >
            <img src={profileImg ? (profileImg) : Profile} className='n-img' style={{marginBottom:"-7px"}}/>
      </div>
    </nav>
  )
}
export default AdminNav