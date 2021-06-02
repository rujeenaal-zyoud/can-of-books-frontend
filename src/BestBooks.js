import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel'
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
// import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/Card';
//import Button from 'react-bootstrap/Button';
import {  Button } from 'react-bootstrap';

import BookFormModal from './BookFormModal';
import UpdatFormBook from './updatFormBook';



class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      name: '',
      description: '',
      status: '',
      server: process.env.REACT_APP_PORT,
      bookArr: [],
      showBooks: false,
      displayModal: false,
      showUpdateStatus: false,
      displayUpdateModal: false,

      index:0,

    }
  }



  showModal = async (e) => {

    this.setState({
      displayModal: true
    })

  }
  hiddeneModal = async (e) => {

    this.setState({
      displayModal: false,
      //displayUpdateModal: false

    })

  }

  updateName = async (e) => {
    this.setState({ name: e.target.value });
  }
  updateDescription = async (e) => this.setState({ description: e.target.value });
  updateStatus = async (e) => this.setState({ status: e.target.value });
  updatimageUrl = async (e) => this.setState({ imageUrl: e.target.value });


  componentDidMount = async () => {
    const user = this.props.auth0.user.email;
    const myBooks = `${this.state.server}/books?email=${user}`;
    const showApiUrlbook = await axios.get(myBooks);
    console.log(showApiUrlbook);
    this.setState({
      bookArr: showApiUrlbook.data,
      showBooks: true
    });
    console.log(this.state.bookArr)
  }


  deleteBook = async (idx) => {
    let { user } = this.props.auth0;
    user = { email: user.email }
    const deleteBook = await axios.delete(`http://localhost:3001/deletebooks/${idx}`, { params: user })

    this.setState({
      bookArr: deleteBook.data
    })
  }



  // showUpdateForm = (idx) => {

  //   const newBookArr = this.state.bookArr.filter((value, index) => {
  //     return idx === index;
  //   });
  //   //console.log(newBookArr)
  //   this.setState({
  //     showUpdateStatus: true,

  //     index: idx,
  //     name: newBookArr[0].name,
  //     description: newBookArr[0].description,
  //     imageUrl: newBookArr[0].imageUrl,
  //     status: newBookArr[0].status,
  //   });
  // }

 
  // updateBook = async (e) => {
  //    e.preventDefault();

  //   const { user } = this.props.auth0;

  //   const reqBody = {
  //     email: user.email,
  //     imageUrl: this.state.imageUrl,
  //     name: this.state.name,
  //     description: this.state.description,
  //     status: this.state.status
  //   };

  //   const booksArray = await axios.put(`http://localhost:3001/updatebooks/${this.state.index}`, reqBody);

  //   this.setState({
  //     bookArr: booksArray.data,
  //     displayUpdateModal: true

  //   });
  // }




  render() {
    return (
      <>
      <>
         {this.state.showUpdateStatus &&
            <UpdatFormBook 
            displayUpdateModal={this.state.displayUpdateModal}
            hiddenModal={this.state.hiddenModal} 
            showUpdateStatus={this.showUpdateStatus}

            name={this.state.name}
              description={this.state.description}
              status={this.state.status}
              imageUrl={this.state.imageUrl}
              updateName={this.updateName}
              updateDescription={this.updateDescription}
              updateStatus={this.updateStatus}
              updatimageUrl={this.updatimageUrl}

              updateBook={this.updateBook}
            />
         }

         
        </>

        <button onClick={this.showModal}> Add Books</button>
        <BookFormModal displayModal={this.state.displayModal} hiddenModal={this.hiddenModal} />


        {this.state.showBooks &&

          <>
            {this.state.bookArr.map((item, idx) => {
              return (

                <>
                  <CardGroup >
                    <Card style={{ width: '18rem' }} key={idx}>
                      <Card.Body>
                        <Card.Img variant="top" src={item.imageUrl} />

                        <Card.Title>Name: {item.name}</Card.Title>
                        <Card.Text>Description: {item.description}</Card.Text>
                        <Card.Text>Status: {item.status}</Card.Text>
                        <Button onClick={() => this.deleteBook(idx)} variant="primary">Delete Book</Button>
                        <Button onClick={() => this.showUpdateForm(idx)} variant="primary">update Book </Button>

                      </Card.Body>
                    </Card>
                  </CardGroup>
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
