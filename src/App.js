import * as React from 'react';
import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import Star from '@mui/icons-material/Star';
import "./App.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { format } from "timeago.js";
import Register from './Componets/Register';
import Login from './Componets/Login';

const MAPBOX_TOKEN = "pk.eyJ1IjoibmlraGlsbWdzMTIzIiwiYSI6ImNsZ2FnbnF0cDE4OXozbXBrNDhmYTFrMXAifQ.Iv6M4QZ2-p-vpYcK4SXR7Q";

function App() {
  //const [showPopup, setShowPopup] = React.useState(true);
  const myStorage = window.localStorage;
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState();
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [currentUser, setCurrentUser]= useState(null);
  const [rating, setRating] = useState(0);
  const[showRegister, setShowRegister] = useState(false);
  const[showLogin, setShowLogin] = useState(false);
  const[viewPort, setViewPort] = useState({
    latitude: 31.2560,
        longitude: 75.7051,
        zoom: 4
  });

  const handleMarkerClick = (id,lat,long) => {
    setCurrentPlaceId(id);
    console.log("Marker clicked");
    // console.log(id);
    console.log(id);
    setViewPort({...viewPort, latitude:lat, longitude:long});
  }

  
  const handleAddClick = (e) => {
    const long = e.lngLat.lng;
    const lat = e.lngLat.lat;
    setNewPlace({
      lat:lat,
      long:long,
    });
    console.log(lat);
    console.log(long);
    // console.log(newPlace.lat);
    // console.log(newPlace.long);
};


const handleSubmit=async (e)=>{
  // e.preventDefault();
  // const newPin = {
  //   username: currentUsername,
  //   title,
  //   description : desc,
  //   rating,
  //   latitude: newPlace.lat,
  //   longitude: newPlace.long,
  // };

  // try {
  //   const res = await axios.post("/pins", newPin);
  //   setPins([...pins, res.data]);
  //   setNewPlace(null);
  //  }
  //  catch (err) {
  //   console.log(err);
  // }
  console.log(newPlace.lat);
  console.log(newPlace.long);
}


  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);




 

  return (
    <div style={{ height: "100vh", width: "100%" }}>
    <Map
      initialViewState={{
        latitude: 31.2560,
        longitude: 75.7051,
        zoom: 4
      }}
      style={{ width: "100%", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
      onDblClick={handleAddClick}
    >
      {pins.map(p => (
        <>
          <Marker longitude={p.longitude} latitude={p.latitude} color="red"
            onClick={() => handleMarkerClick(p._id,p.lat,p.long)}
          />

          {p._id === currentPlaceId &&

            (
              <Popup 
              longitude={p.longitude}
              latitude={p.latitude}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={()=>setCurrentPlaceId(null)}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.description} </p>
                  <label>Rating</label>
                  <div className="stars" >
                    {Array(p.rating).fill(<Star className='star'/>)}
                  </div>
                  <label>Information</label>
                  <span className="username">{p.username}</span>
                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>

             
             
             
            )},
        </>
      ))}
      {newPlace &&(
       <Popup 
              longitude={newPlace.long}
              latitude={newPlace.lat}
              closeButton={true}
              closeOnClick={false}
              anchor="left"
              onClose={()=>setCurrentPlaceId(null)}
              >
                <div>
                  <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input placeholder='Enter a title'
                     onChange={(e)=>setTitle(e.target.value)}/>
                    <label>Review</label>
                    <textarea placeholder='Enter a review'
                    onChange={(e)=>setDesc(e.target.value)}/>
                    <label>Rating</label>
                    <select onChange={(e)=>setRating(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>
                    <button className='submitButton' type="submit">Add</button>
                  </form>
                </div>
              </Popup>
            )}
            {currentUser?(<button className="button logout">Logout</button>):(
              <div ><button className="button login" 
              onClick={()=> setShowLogin(true)}
            >Login</button>
            <button className="button register" onClick={()=>setShowRegister(true)}>Register</button>
            </div> ) }
          {showRegister && <Register setShowRegister={setShowRegister}/>}
          {showLogin && (<Login setShowLogin= {setShowLogin} myStorage={myStorage} 
          setCurrentUser={setCurrentUser}
          />)}
    </Map>
    </div>
  );
}
export default App;