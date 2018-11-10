import React, {Component} from 'react';
import './User.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Map from '../Map/Map'
import swal from 'sweetalert'
import firebase from '../../firebase'
import { Picture } from 'glamorous';

// const userUid = localStorage.getItem('userUid')
// const userName = localStorage.getItem('userName')
// const userEmail = localStorage.getItem('userEmail')
// console.log(userUid)
// console.log(userName)
// console.log(userEmail)

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab : 0,
            userInfo : {
                userName : localStorage.getItem('userUid'),
                userUid : localStorage.getItem('userUid'),
                userEmail : localStorage.getItem('userEmail'),
                nickName : '',
                phoneNumber : '',
                latitude : '',
                longitude : '',
                beverages : {
                    Coffe : false,
                    Juice : false,
                    Cocktail : false
                },
                timeDurations : {
                    min_30 : false,
                    min_60 : false,
                    min_120 : false
                },
                pictures : {
                    pic1 : '',
                    pic2 : '',
                    pic3 : ''
                }
            },
            pictures : {
                pic1 : '',
                pic2 : '',
                pic3 : ''
            },
            selectBeverages : false,
            selectTimeDurations : false,
            loader : true,
            loader1 : true
        }
        // console.log('props',props)
        // this.userData = this.userData.bind(this)
        this.loaderOff = this.loaderOff.bind(this)
        this.latLng = this.latLng.bind(this)

    }

    nextPrev(bool){
        const {currentTab,userInfo,selectBeverages,selectTimeDurations,pictures} = this.state
        // console.log(bool)
        !bool ?  this.setState({
            currentTab : currentTab - 1
        }) : !currentTab && !userInfo.nickName && !userInfo.phoneNumber ? swal('Please fill the required fields') : 
        currentTab === 1 && !pictures.pic1 && !pictures.pic2 && !pictures.pic3 ? swal('Please upload 3 pictures') : currentTab === 2 && !selectBeverages ? swal('Please Select atleast any one') : currentTab === 3 && !selectTimeDurations ? swal('Please Select atleast any one') : this.setState({
            currentTab : currentTab+1
        })
        // bool ? this.setState({
        //     currentTab : currentTab + 1
        // }) : this.setState({
        //     currentTab : currentTab - 1
        // })
    }

    userData(e){
        var valName = e.target.name
        var valValue = e.target.value 
        let userInfoCopy = Object.assign({},this.state.userInfo)
        userInfoCopy[valName] = valValue
        // console.log(e)
        this.setState({
            userInfo : userInfoCopy
        })
    }

    pics(e){
        var valName = e.target.name
        var valFile = e.target.files[0] 
        let picsName = Object.assign({},this.state.pictures)
        let userInfoCopy = Object.assign({},this.state.userInfo)
        // console.log(userInfoCopy)
        userInfoCopy.pictures[valName] = valFile.name
        // console.log(userInfoCopy)
        // userInfoCopy[valName] = URL.createObjectURL(valFile)
        picsName[valName] = valFile
        // console.log(e)
        this.setState({
            pictures : picsName,
            userInfo : userInfoCopy
        })
        // console.log('pics',this.state.pictures.pic1.name)
        // this.setState({
        //     demoPic : URL.createObjectURL(valFile)
        // })
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         // User is signed in.
        //         // console.log(user);
        //         // console.log(user.uid);
        //         localStorage.setItem('userUid', user.uid)
        //         localStorage.setItem('userName', user.displayName)
        //         localStorage.setItem('userEmail', user.email)
        //     } else {
        //         // No user is signed in.
        //         console.log("Bye");
        //     }
        // })
    }
    
    updateCheckBox(e){
        // console.log(e.checked)
        var valValue = e.value
        var checked = e.checked
        var valName = e.name
        let userCheckBox = Object.assign({},this.state.userInfo)
        userCheckBox[valName][valValue] = checked
        this.setState({
            userInfo : userCheckBox
        })
        if(userCheckBox.beverages.Coffe || userCheckBox.beverages.Juice || userCheckBox.beverages.Cocktail){
            this.setState({
                selectBeverages : true
            })
        }
        else{
            this.setState({
                selectBeverages : false
            })
        }
        if(userCheckBox.timeDurations.min_30 || userCheckBox.timeDurations.min_60 || userCheckBox.timeDurations.min_120){
            this.setState({
                selectTimeDurations : true
            })
        }
        else{
            this.setState({
                selectTimeDurations : false
            })
        }
    }

    loaderOff(){
        // console.log('Hello')
        setTimeout(()=>{
        this.setState({
            loader : false
        })
        },2000)
    }

    latLng(lat,lng){
        // console.log('lat ',lat)
        // console.log('lng ',lng)
        let userCheckBox = Object.assign({},this.state.userInfo)
        userCheckBox.latitude = lat
        userCheckBox.longitude = lng
        this.setState({
            userInfo : userCheckBox
        })
    }

    submitData(){
        this.setState({
            loader1 : false
        })
        const {userInfo,pictures} = this.state
        let {beverages,timeDurations} = userInfo
        // console.log(beverages)
        Object.entries(beverages).forEach(([key,value])=>{
            // console.log(beverages[key])
            beverages[key] && firebase.database().ref(`${key}`).child(`${userInfo.userUid}`).set(userInfo)
        })
        Object.entries(timeDurations).forEach(([key,value])=>{
            // console.log(timeDurations[key])
            timeDurations[key] && firebase.database().ref(`${key}`).child(`${userInfo.userUid}`).set(userInfo)
        })
        firebase.database().ref(`userList`).child(`${userInfo.userUid}`).set(userInfo)
        .then(()=>{
            console.log('Done')
            Object.entries(pictures).forEach(([key, value]) => {
                var storageRef = firebase.storage().ref(`${userInfo.userUid}/${pictures[key]['name']}`)
                storageRef.put(value)
            });
        })
        .then(()=>{
            this.props.history.replace('/dashboard')
        })
    }

    render(){
        const {currentTab,userInfo,loader,loader1} = this.state
        // console.log(userInfo)
            // Object.entries(pictures).forEach(([key, value]) => console.log(pictures[key]['name']));
        return(
            <div>
                {loader1 ? <form id="regForm" action="">
                {currentTab === 0 && <div className="form-group">Nick Name:
                <p><input placeholder="Nick Name..." name='nickName' value={userInfo.nickName}  onChange={(e)=>this.userData(e)} className="form-control" /></p>
                Phone Number:
                <p><input placeholder="Phone Number..." name='phoneNumber' value={userInfo.phoneNumber} type="number" onChange={(e)=>this.userData(e)} className="form-control" /></p>
                </div>}

                {currentTab === 1 && <div className="form-group">Pictures
                <p><input type='file' className="form-control" name='pic1' onChange={(e)=> this.pics(e)} accept=".png, .jpg, .jpeg"/></p>
                <p><input type='file' className="form-control" name='pic2' onChange={(e)=> this.pics(e)} accept=".png, .jpg, .jpeg"/></p>
                <p><input type='file' className="form-control" name='pic3' onChange={(e)=> this.pics(e)} accept=".png, .jpg, .jpeg"/></p>
                </div>}

                {currentTab === 2 && <div className="form-group">
                <h1>Select Beverages</h1>
                    <label className="container1">Coffe
                        <input type="checkbox" name='beverages' value='Coffe' onClick={(e)=> this.updateCheckBox(e.target)}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="container1">Juice
                        <input type="checkbox" name='beverages' value='Juice' onClick={(e)=> this.updateCheckBox(e.target)} />
                        <span className="checkmark"></span>
                        </label>
                        <label className="container1" >Cocktail
                        <input type="checkbox" name='beverages' value='Cocktail' onClick={(e)=> this.updateCheckBox(e.target)} />
                        <span className="checkmark"></span>
                        </label>
                </div>}

                {currentTab === 3 && <div className="form-group">
                <h1>Select Time Duration</h1>
                    <label className="container1">30 minutes
                        <input type="checkbox" name='timeDurations' value='min_30' onClick={(e)=> this.updateCheckBox(e.target)} />
                        <span className="checkmark"></span>
                        </label>
                        <label className="container1">60 minutes
                        <input type="checkbox"  name='timeDurations' value='min_60' onClick={(e)=> this.updateCheckBox(e.target)}/>
                        <span className="checkmark"></span>
                        </label>
                        <label className="container1">120 minutes
                        <input type="checkbox" name='timeDurations' value='min_120' onClick={(e)=> this.updateCheckBox(e.target)} />
                        <span className="checkmark"></span>
                        </label>
                </div>}

                {currentTab === 4 && 
                <div>
                    <h1>Select Your Location</h1>
                    <hr/>
                {loader ? this.loaderOff() : null}
                {loader && <center><div className="loader loader1"></div></center>}
                    <Map  latLng={this.latLng}/>
                </div>}

                <div style={{overflow:'auto'}}>
                {currentTab === 4 ? <div style={{float:'right'}}>
                    <button type="button" className="btn btn-primary btn1" onClick={()=>this.nextPrev(false)}>Previous</button>
                    <button type="button" className="btn btn-primary btn1" onClick={()=> this.submitData()}>Submit</button>
                </div> : <div style={{float:'right'}}>
                    {!currentTab ?  null : <button type="button" className="btn btn-primary btn1" onClick={()=>this.nextPrev(false)}>Previous</button>}
                    <button type="button" className="btn btn-primary btn1" onClick={()=> this.nextPrev(true)}>Next</button>
                </div>}
                </div>

                {/* <div className='div2'>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
                <span className="step"></span>
                </div> */}
                </form> : <div><center><div className="loader loader1"></div></center></div>}
                {/* <img src={pictures.pic1}/>
                <img src={pictures.pic2}/>
                <img src={pictures.pic3}/> */}
            </div>
        )
    }
}


export default User;