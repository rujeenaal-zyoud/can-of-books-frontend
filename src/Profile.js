import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
class Profile extends Component {
    render() {
        const { user, isAuthenticated } = this.props.auth0;
        return (
            <>
                { isAuthenticated &&
                    <>
                        <div>Hello every one{user.name}</div>
                        <div>Email: {user.email}</div>
                        {/* <div>Img :{user.img}</div> */}
                    </>
                }
            </>
        )
    }
}
export default withAuth0(Profile);