import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel'
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
// import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import BookFormModal from './BookFormModal';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    imageUrl:'',
      name: '',
      description: '',
      status: '',
      server: process.env.REACT_APP_PORT,
      bookArr: [],
      showBooks: false,
      displayModal:false
    }
  }



  showModal = async (e) => {

    this.setState({
        displayModal: true
    })

}
hiddeneModal = async (e) => {

    this.setState({
        displayModal: false
    })

}



  componentDidMount = async () => {
    const user  = this.props.auth0.user.email;
    const myBooks = `${this.state.server}/books?email=${user}`;
    const showApiUrlbook = await axios.get(myBooks);
console.log(showApiUrlbook);
    this.setState({
      bookArr: showApiUrlbook.data,
      showBooks: true
    });
console.log(this.state.bookArr)  }






  render() {
    return(
      <>
    <button onClick={this.showModal}> Add Books</button>
    <BookFormModal displayModal={this.state.displayModal} hiddenModal={this.hiddenModal} />

  
      {this.state.showBooks &&
     
        <>
          {this.state.bookArr.map((item, index) => {
            return (

              <>
                <Card  key={index} style={{ width: '18rem' }}>
                  <Card.Body>
                  <Card.Img variant="top" src={item.imageUrl} />

                    <Card.Title>Name: {item.name}</Card.Title>
                    <Card.Text>Description: {item.description}</Card.Text>
                    <Card.Text>Status: {item.status}</Card.Text>                         
                  </Card.Body>
                </Card>
              
              </>
            );

          })
          }
        </>
      }


    
  </>
    )
}
}
    

export default withAuth0(BestBooks);
