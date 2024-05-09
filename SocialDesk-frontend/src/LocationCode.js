// import React, { useState } from "react";

// const LocationTrack = () => {
//   const [details, setDetails] = useState(null);

//   const getUserGeolocationDetails = () => {
//     fetch(
//       "https://geolocation-db.com/json/0beaaa60-f2a8-11ee-88f3-a16d8595df68"
//     )
//       .then((response) => response.json())
//       .then((data) => setDetails(data));
//   };

//   return (
//     <div style={{ padding: "20px" }}>
// <Center>
//       <div className="row">
//         <div className="col text-center">
//           <h2 style={{ marginBottom: "20px", color: "#007bff" }}>
//             Find my IP and Location
//           </h2>
//           <p>
//             <button
//               className="btn btn-primary"
//               onClick={getUserGeolocationDetails}
//               style={{
//                 marginBottom: "20px",
//                 backgroundColor: "#007bff",
//                 border: "none",
//                 borderRadius: "5px",
//                 padding: "10px 20px",
//                 color: "#fff",
//                 fontWeight: "bold",
//                 cursor: "pointer",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//             >
//               Find my details
//             </button>
//           </p>
//         </div>
//       </div>

//       {details && (
//         <div className="row justify-content-center">
//           <div className="col-lg-6 text-center text-dark">
//             <div
//               style={{
//                 backgroundColor: "#f8f9fa",
//                 borderRadius: "5px",
//                 padding: "20px",
//                 boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//               }}
//             >
//               <h3 style={{ marginBottom: "20px", color: "#007bff" }}>
//                 Details:
//               </h3>
//               <ul className="list-group" style={{ textAlign: "left" }}>
//                 <li className="list-group-item">
//                   <strong>Location:</strong>{" "}
//                   {`${details.city}, ${details.country_name} (${details.country_code})`}
//                 </li>
//                 <li className="list-group-item">
//                   <strong>IP:</strong> {details.IPv4}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
        // </Center>
//     </div>
//   );
// };

// export default LocationTrack;

// import React, { useEffect, useState } from "react";

// function LocationTrack(){
//     const [add,setAdd] = useState('')
//     // `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    
//     useEffect(()=>{
//         navigator.geolocation.getCurrentPosition(pos=>{
//             const {latitude,longitude} = pos.coords;
//             console.log(latitude,longitude)
//             const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
//             fetch(url).then(res=>res.json()).then(data=>setAdd(data.address))
//         })
//     },[])
//     console.log(add,"sfsfh")
//     return(
//         <>
//             <p>road : {add.road}</p>
//             <p>city : {add.city}</p>
//             <p>country :{add.country}</p>
//         </>
//     )
// }

// export default LocationTrack;