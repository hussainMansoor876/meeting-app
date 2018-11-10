import React, {Component} from 'react';
import './Dashboard.css'
import './w3.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Cards, { Card } from 'react-swipe-deck'
import firebase from '../../firebase'
import swal from 'sweetalert';

const data = ['Alexandre', 'Thomas', 'Lucien']
const userUid = localStorage.getItem('userUid')

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userUid : localStorage.getItem('userUid'),
            meeting : false,
            meetingList : {},
            meetingPics : {
                pic1 : '',
                pic2 : '',
                pic3 : ''
            },
            userArray : [],
            loader : true,
            getData : false,
            slideIndex : 1
        }
        this.setLoader = this.setLoader.bind(this)
        this.gettingData = this.gettingData.bind(this)
    }
    componentDidMount(){
        const {userArray,userUid} = this.state
        // var {slideIndex} = this.state
        // this.showSlides(slideIndex);
        var meetingListCopy = Object.assign({},this.state.meetingList)
        var meetingPicsCopy = Object.assign({},this.state.meetingPics)
        this.setLoader()
        firebase.database().ref('userList').child(`${userUid}`).once('value',(user)=>{
          let userData = user.val()
        //   console.log(userData)
          let {beverages,timeDurations} = userData
          Object.entries(beverages).forEach(([key,value])=>{
            beverages[key] && firebase.database().ref(`${key}`).once('value',(user)=>{
                var data = user.val();
                // console.log(data)
                Object.entries(data).forEach(([keys,values])=>{
                    // console.log('keys',keys)
                    if(userUid !== values.userUid){
                        if(!meetingListCopy[values.userUid]){
                            var uid = values.userUid
                            // console.log(uid)
                            var storageRef = firebase.storage().ref(`${uid}/${values.pictures['pic1']}`)
                            storageRef.getDownloadURL()
                                .then((url)=>{
                                    // console.log(url)
                                    values.pictures['pic1'] = url
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            storageRef = firebase.storage().ref(`${uid}/${values.pictures['pic2']}`)
                            storageRef.getDownloadURL()
                                .then((url)=>{
                                    // console.log(url)
                                    values.pictures['pic2'] = url
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            storageRef = firebase.storage().ref(`${uid}/${values.pictures['pic3']}`)
                            storageRef.getDownloadURL()
                                .then((url)=>{
                                    // console.log(url)
                                    values.pictures['pic3'] = url
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            meetingListCopy[values.userUid] = values
                            userArray.push(values)
                            // console.log(userArray)
                            this.setState({
                                meetingList : meetingListCopy,
                                userArray
                            })
                    }
                }
                })
        })
        })
        Object.entries(timeDurations).forEach(([key,value])=>{
            timeDurations[key] && firebase.database().ref(`${key}`).once('value',(user)=>{
                var data = user.val();
                Object.entries(data).forEach(([keys,values])=>{
                    // console.log('keys',keys)
                    if(userUid !== values.userUid){
                        if(!meetingListCopy[values.userUid]){
                            var uid = values.userUid
                            // console.log(values)
                            // console.log(uid)
                            var storageRef = firebase.storage().ref(`${uid}/${values.pictures['pic1']}`)
                            storageRef.getDownloadURL()
                                .then((url)=>{
                                    // console.log(url)
                                    values.pictures['pic1'] = url
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            storageRef = firebase.storage().ref(`${uid}/${values.pictures['pic2']}`)
                            storageRef.getDownloadURL()
                                .then((url)=>{
                                    // console.log(url)
                                    values.pictures['pic2'] = url
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            storageRef = firebase.storage().ref(`${uid}/${values.pictures['pic3']}`)
                            storageRef.getDownloadURL()
                                .then((url)=>{
                                    // console.log(url)
                                    values.pictures['pic3'] = url
                                })
                                .catch((err)=>{
                                    console.log(err)
                                })
                            meetingListCopy[values.userUid] = values
                            userArray.push(values)
                            // console.log(userArray)
                            this.setState({
                                meetingList : meetingListCopy,
                                userArray
                            })
                    }
                }
                })
            })
        })
        })
        .then(()=>{
            console.log('pohnch gya',this.state.userArray)
            this.state.userArray && this.gettingData()
        })
      }

    gettingData(){
        this.setState({
            getData : true
        })
    }

    setLoader(){
        setTimeout(()=>{
            this.setState({
                loader : false
            })
            },2000)
    }

    setMeeting(){
        this.setState({
            meeting : true
        })
        // console.log(this.state)
    }

    action(e){
        console.log(e)
    }
  
    fixMeeting(user){
        console.log('user',user)
        swal("Do you want to fix meeting", {
            buttons: {
                cancel: "No",
                Yes: true,
            },
            })
          .then((val)=>{
              console.log('User',user)
              val && this.props.history.replace('/meeting',user)
          })
    }

    plusSlides(n) {
        const {slideIndex} = this.state
        n === 1 ? this.setState({
            slideIndex : slideIndex + 1,
        }) :
        n === -1 && slideIndex === 1 ? this.setState({
            slideIndex : 3
        }) :
        n === -1 && slideIndex !== 1 && this.setState({
            slideIndex : slideIndex - 1
        }) 

        slideIndex === 3 && n === 1 && this.setState({
            slideIndex : 1
        })
      }

    render(){
        var {slideIndex} = this.state
        const {meeting,userArray,loader,getData} = this.state
        return(
            <div>
                {loader ? <center><div className="loader loader1"></div></center> :
                <div>
                    {!meeting ? <div>
                        <h1>“You haven’t done any meeting yet!”</h1>
                        <center>
                            <button className="btn btn-primary btn1" onClick={()=> this.setMeeting()}>
                            Set a meeting!
                            </button>
                            </center>
                    </div> : <center>
                        {getData && 
                        <Cards 
                    onEnd={()=>this.action('end')} 
                    size={[400,700]} 
                    cardSize = {[350,500]}
                    className='master-root'>
                        {userArray.map((user,i) =>
                            <Card
                            key={i}
                            onSwipeLeft={()=>this.action('swipe left')}
                            onSwipeRight={()=>this.fixMeeting(user)}
                            >
                            <div className="card-deck">
                                <div className="card">
                                <div className="w3-content w3-display-container">
                                    {slideIndex === 1 && <img className="mySlides" src={user.pictures['pic1']} style={{width:'100%',height:'350px'}} />}
                                    {slideIndex === 2 && <img className="mySlides" src={user.pictures['pic2']} style={{width:'100%',height:'350px'}} />}
                                    {slideIndex === 3 && <img className="mySlides" src={user.pictures['pic3']} style={{width:'100%',height:'350px'}} />}
                                    <button className="w3-button w3-black w3-display-left" onClick={()=>this.plusSlides(-1)}>&#10094;</button>
                                    <button className="w3-button w3-black w3-display-right" onClick={()=>this.plusSlides(1)}>&#10095;</button>
                                    </div>
                                    <div className="card-body">
                                    <h5 className="card-title">{user.nickName}</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                                    <div className="card-footer">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                    </div>
                                </div>
                                </div>
                            </Card>
                        )}
                        </Cards>}
                        </center>}
                                </div>}
            </div>
        )
    }
}


export default Dashboard;