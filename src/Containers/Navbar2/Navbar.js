import React, { Component } from 'react';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'
// import '../node_modules/font-awesome/css/font-awesome.min.css'




class Navbar extends Component {
    constructor(props){
      super(props);
      this.state = {
      }
      // console.log('Navbar',props)
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
        </div>
      </nav>
      
      </div>
      );
    }
  }
  
  export default Navbar;
  