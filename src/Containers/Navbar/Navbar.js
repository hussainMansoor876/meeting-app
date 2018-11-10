import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
import firebase from '../../firebase'
// import '../node_modules/font-awesome/css/font-awesome.min.css'
// import {BrowserRouter as Router,Link} from "react-router-dom";


var provider = new firebase.auth.FacebookAuthProvider();


class Navbar extends Component {
    constructor(props){
      super(props);
      this.state = {
      }
      this.login = this.login.bind(this)
      this.auth = this.auth.bind(this)
      // console.log('Navbar',props)
    }

    auth(user){
      this.props.history.replace('/user')
    }

    login(){
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // console.log(result)
          // var token = result.credential.accessToken
          // console.log(token)
          var user = result.user
          console.log(user)
          // var saveData = {
          //   email : user.email,
          //   name : user.displayName,
          //   photoUrl : user.photoURL
          // }
          // console.log(saveData)
          // firebase.database().ref().child('Users').push(saveData)
          // ...
          localStorage.setItem('userUid', user.uid)
          localStorage.setItem('userName', user.displayName)
          localStorage.setItem('userEmail', user.email)
        })
        .then((user)=>{
          // console.log(user)
          this.auth()
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code
          // var errorMessage = error.message
          // The email of the user's account used.
          // var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // var credential = error.credential;
          // ...
        });
      }
    render() {
      return (
        <div>
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="javascript:void(0)">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="javascript:void(0)">
                <i className="fa fa-home"></i>
                Home
                <span className="sr-only">(current)</span>
                </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="javascript:void(0)">
                <i className="fa fa-envelope-o">
                  {/* <span className="badge badge-danger">11</span> */}
                </i>
                Messages
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="javascript:void(0)">
                <i className="fa fa-envelope-o">
                  {/* <span className="badge badge-danger">11</span> */}
                </i>
                Disabled
              </a>
            </li>
          </ul>
          <button className="btn" onClick={this.login}>Login With Facebook</button>
        </div>
      </nav>
      
      </div>
      );
    }
  }
  
  export default Navbar;
  