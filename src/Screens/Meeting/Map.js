import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class Map extends Component {
    constructor(props){
      super(props);
      this.state = {
        latitude : props.lat,
        longitude : props.lng,
        setUserLatitude : '',
        setUserLongitude : ''
      }
      // this.setPosition = this.setPosition.bind(this)
      // console.log('Map props',props)
    } 
    // componentDidMount(){
    //   this.setPosition()
    // }
  
    
  
    // setPosition(){
    //   navigator.geolocation.getCurrentPosition(position=>{
    //     // console.log(position.coords)
    //     this.setState({
    //       latitude : position.coords.latitude,
    //       longitude : position.coords.longitude,
    //       setUserLatitude : position.coords.latitude,
    //       setUserLongitude : position.coords.longitude
    //     })
    //     const {latitude,longitude} = this.state
    //     // console.log('latitude',latitude)
    //     // console.log('longitude',longitude)
    //     this.props.latLng(latitude,longitude)
    //   })
    // }
  
    // updateLocation(e){
    //   // console.log(e.latLng.lat())
    //   var lat = e.latLng.lat()
    //   // console.log(e.latLng.lng())
    //   var lng = e.latLng.lng()
    //   console.log(lng)
    //   this.setState({
    //     setUserLatitude : lat,
    //     setUserLongitude : lng
    //   })
    //   this.props.latLng(lat,lng)
    // }
    // shouldComponentUpdate(props,state){
    //   // console.log(props)
    //   // console.log(state)
    //   return state.latitude === state.setUserLatitude
    // }
    
  
    render() {
      const {latitude,longitude} = this.state
      const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: latitude , lng: longitude }}
  
    >
      {props.isMarkerShown && <Marker position={{ lat: latitude, lng: longitude }} 
      />}
    </GoogleMap>
  ))
  
      return (
        <div>
           
           {latitude && <MyMapComponent
    isMarkerShown
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />}
        </div>
      );
    }
  }
  
  export default Map;

// import React, {Component} from 'react';
// import ReactMapGL from 'react-map-gl';

// class Map extends Component {
//     constructor() {
//         super();
//         this.state = {
//           viewport: {
//             width: 400,
//             height: 400,
//             latitude: 37.7577,
//             longitude: -122.4376,
//             zoom: 8
//           }
//     }
//   }

//     render(){
//         return(
//           <ReactMapGL
//           {...this.state.viewport}
//           onViewportChange={(viewport) => this.setState({viewport})}
//           mapboxApiAccessToken='pk.eyJ1IjoiaHVzc2Fpbm1hbnNvb3I4NzYiLCJhIjoiY2ppNGh2czhjMDB2MDNrbzB4dzhyMzhwZiJ9.hzX5bu_Wg5VDigDLPl3A6w'
//           size = {14}
//         />
//         )
//     }
// }


// export default Map;