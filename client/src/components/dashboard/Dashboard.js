import React, { Component } from 'react' ;
import PropTypes from 'prop-types' ;
import { connect } from 'react-redux' ;
import { getCurrentProfile  , deleteAccount} from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link} from 'react-router-dom' ;
import ProfileActions from './ProfileActions' ;
import Experience from './Experience';
import Education from './Education';

 class Dashboard extends Component {

    componentDidMount() {
this.props.getCurrentProfile();
    }
    onDeleteClick(e) {
        this.props.deleteAccount();
      }

  render() {

    const { user } = this.props.auth ; 
    const { profile , loading } = this.props.profile ; 


    let DashboardContent  ; 
    if ( profile === null  || loading){
        DashboardContent = < Spinner/>

    }  else {
         // Check if logged in user have a profile data 
         if (Object.keys(profile).length > 0 ){
                DashboardContent = (
                    <div> 
                          <p  className=" lead  text-muted"> Welcome <Link to={`/profile/${profile.handle}`}> 
                           {user.name} </Link></p>
                           <ProfileActions />
                           <Experience experience={profile.experience} />
                           <Education education={profile.education} />
                                <div style={{ marginBottom: '60px' }} />
                                <button
                                  onClick={this.onDeleteClick.bind(this)}
                                 className="btn btn-danger" >
                                 Delete My Account
                                  </button>
                    </div>
                )
         } else {
                   // Usr is logged in but has no profile 
                   DashboardContent = (
                       <div>
                           <p  className=" lead  text-muted"> Welcome {user.name} </p>
                           <p> You have not yet setup a profile  , please add some info </p>
                           <Link  to="/create-profile" className=" btn btn-lg  btn-info "> 
                           Create profile  </Link>
                       </div>
                   )
         }
    }
    return (
        <div  className="dashboard">  
          <div  className="container">
          <div  className="row">
          <div  className="col-md-12">

              <h1 className="display-4"   >  Dashboard </h1>
              { DashboardContent}
         </div>
         </div>
         </div>
        </div>
     
    )
  }
}

Dashboard.protoTypes = {
    getCurrentProfile : PropTypes.func.isRequired , 
    deleteAccount: PropTypes.func.isRequired,
    auth : PropTypes.object.isRequired , 
    profile : PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    profile : state.profile ,
    auth : state.auth
} ) ;

export default  connect( mapStateToProps ,{ getCurrentProfile , deleteAccount} ) (Dashboard) ;