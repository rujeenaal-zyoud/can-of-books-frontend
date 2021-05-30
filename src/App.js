import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Footer from './Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BestBooks from './BestBooks'
import { withAuth0 } from '@auth0/auth0-react';

import Profile from './Profile';

class App extends React.Component {

  render() {
    //console.log('app', this.props);
    //console.log(this.props.isAuthenticated )
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
              {this.props.auth0.isAuthenticated ? <BestBooks/>:<></>}
             {  console.log(this.props.auth0.isAuthenticated )} 
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route>
             <Route path ='/Profile'>
               <Profile/>
               </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}
export default withAuth0(App);