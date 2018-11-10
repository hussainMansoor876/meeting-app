import React, { Component } from 'react';
import './App.css';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Routes from './Config/routes'
// import {User} from './Screens'

// // console.log(User)

class App extends Component {
  constructor(){
    super();
    this.state = {
      latitude : '',
      longitude : '',
      setUserLatitude : '',
      setUserLongitude : ''
    }
    // this.setPosition = this.setPosition.bind(this)
  } 
  // componentDidMount(){
//     this.setPosition()
//   }

  

//   setPosition(){
//     navigator.geolocation.getCurrentPosition(position=>{
//       // console.log(position.coords)
//       this.setState({
//         latitude : position.coords.latitude,
//         longitude : position.coords.longitude,
//         setUserLatitude : position.coords.latitude,
//         setUserLongitude : position.coords.longitude
//       })
//       // console.log(this.state)
//     })
//   }

//   updateLocation(e){
//     console.log(e.latLng.lat())
//     console.log(e.latLng.lng())
//     this.setState({
//       latitude : e.latLng.lat(),
//       longitude : e.latLng.lng()
//     })
//   }
//   shouldComponentUpdate(props,state){
//     // console.log(props)
//     // console.log(state)
//     return state.latitude === state.setUserLatitude
//   }
  

  render() {
//   //   const {latitude,longitude} = this.state
//   //   const MyMapComponent = withScriptjs(withGoogleMap((props) =>
//   // <GoogleMap
//   //   defaultZoom={14}
//   //   defaultCenter={{ lat: latitude , lng: longitude }}

//   // >
//   //   {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} draggable 
//   //   onDragEnd = {(e)=>this.updateLocation(e)}
//   //   />}
//   // </GoogleMap>
// // ))

    return (
      <div>
         <Routes/>
         {/* {latitude && <MyMapComponent
//   isMarkerShown
//   googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
//   loadingElement={<div style={{ height: `100%` }} />}
//   containerElement={<div style={{ height: `400px` }} />}
//   mapElement={<div style={{ height: `100%` }} />}
// />} */}
      </div>
    );
  }
}

export default App;