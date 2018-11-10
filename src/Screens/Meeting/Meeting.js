import Map from './Map'
import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Meeting.css'
// import DateTimePicker from 'material-ui-datetimepicker';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import firebase from '../../firebase'
import swal from 'sweetalert';
import Direction from './Direction'





const PATH_BASE = 'https://api.foursquare.com/v2/venues';
const PATH_SEARCH = '/search';
const EXP = '/explore'
const PARAM_SEARCH = 'query=';
const client_id = '2PIYDCL4HOLTQNIW4AHEY15IUSTCMDJKZX2ZY0AQU2FDKHD4'
const client_secret = '4GZNWXJE52UB3TQVT5NFMTPVVN4FX5LF40BJVIZVLOHVK1ZR'

class Meeting extends Component {
  constructor(props){
    super(props);
    this.state = {
      latitude : props.location.state.latitude,
      longitude : props.location.state.longitude,
      currentUser : localStorage.getItem('userUid'),
      meetingUser : props.location.state.userUid,
      locationsList : [],
      address : false,
      startDate: moment(),
      meetingLocation : {},
      locationSelect : false
    }
    console.log('props',props)
    this.locationExist = this.locationExist.bind(this)
    this.handleChange = this.handleChange.bind(this);
  } 

  handleChange(date) {
    // console.log(date._d)
    // console.log(this.state.meetingLocation)
    this.setState({
      startDate: date,
      meetingLocation : {
        ...this.state.meetingLocation,
        selectedDate : date._d.toString()
      }
    })
  }

  componentDidMount(){
      const {latitude,longitude} = this.state
      fetch(`${PATH_BASE}${EXP}?ll=${latitude},${longitude}&client_id=${client_id}&client_secret=${client_secret}&v=20181025`)
      .then((response)=>{
          return response.json()
      })
      .then((result)=>{
          // console.log(result.response.groups[0].items)
          const {locationsList} = this.state
          var val = result.response.groups[0].items
          val.map((user,i)=>{
              return locationsList.push(user.venue)
          })
      })
      .then(()=>{
        const {locationsList} = this.state
        // console.log(locationsList)
        locationsList && this.locationExist()
      })
  }

  locationExist(){
    this.setState({
      address : true
    })
    // console.log(this.state.locationsList)
  }

  searchLocation(){
    this.setState({
      locationsList : []
    })
    const {latitude,longitude} = this.state
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${this.input.value}&ll=${latitude},${longitude}&client_id=${client_id}&client_secret=${client_secret}&v=20181025`)
    .then((response)=>{
        return response.json()
    })
    .then((result)=>{
        const {locationsList} = this.state
        console.log(result.response.venues)
        var val = result.response.venues
        val.map((user,i)=>{
            locationsList.push(user)
            return null
        })
    })
    .then(()=>{
      const {locationsList} = this.state
      locationsList && this.locationExist()
      // console.log(locationsList)
    })
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log(nextProps)
  //   console.log(nextState)
  //   return nextState.serachVal === this.state.serachVal
  // }

  selectedLocation(val){
    // const {meetingLocation} = this.state
    // meetingLocation['name'] = val.name
    console.log(val)
    this.setState({
      locationSelect : true,
      meetingLocation: {
        ...this.state.meetingLocation,
        name: val['name'],
        address : val['location']['address'],
        lat : val['location']['lat'],
        lng : val['location']['lng']
  }
    })
  }
  
  fixMeeting(){
    console.log(this.state)
    const {meetingLocation,meetingUser,currentUser} = this.state
    swal("Do you want to fix meeting", {
      buttons: {
          cancel: "No",
          Yes: true,
      },
      })
    .then((val)=>{
        console.log(val)
        val && firebase.database().ref(`userList/${meetingUser}`).child(`meetingList/recieve/${currentUser}`).set(meetingLocation)
        val && firebase.database().ref(`userList/${currentUser}`).child(`meetingList/send/${meetingUser}`).set(meetingLocation)
    })
  }

  render() {
    const {locationsList,address,startDate,locationSelect} = this.state
    // var currentDate = new Date()
    // console.log(currentDate.toDateString())
    return (
      <div>
        {/* <Direction/> */}
        {locationSelect ?
          <center>
            <div className='container-fluid'>
            <h2><u>Select Date and Time For Meeting</u></h2>
            <DatePicker
              selected={startDate}
              onChange={this.handleChange}
              minDate={moment()}
          />
          <br/>
          <DatePicker
            selected={startDate}
            onChange={this.handleChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="LT"
            timeCaption="Time"
            />
            <button type="button" className="btn btn-primary btn2" onClick={()=>this.fixMeeting()} >Confirm</button>
            </div>
            </center> :
            <div>
          <div className="form-group">Search Location
                <p><input placeholder="Search Here" ref={e => this.input = e} className="form-control" /></p>
                <button type="button" className="btn btn-primary btn1" onClick={()=>this.searchLocation()}>Search</button>
            </div>
            <center>
            {address && locationsList.map((v,i)=>{
              return i < 6 && <div className="card" key={i}>
                <div style={{width:'100%'}}><Map lat={v.location['lat']} lng={v.location['lng']}/>
              <div className="container">
                <h4 className='name'><b>{v.name}</b></h4> 
                <p>{v.location.address}</p> 
                <p>Set Meeting Here...!</p>
                </div>
                <button className='btn btn-primary' style={{width:'100%',height : '50px'}} onClick={this.selectedLocation.bind(this,v)}>Select Location</button>
              </div>
                   <hr/>
                </div>
                
            })}</center>
            </div>}
      </div>
    );
  }
}

export default Meeting;