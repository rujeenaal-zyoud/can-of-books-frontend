import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: process.env.REACT_APP_PORT,
      bookArr: [],
    }
  }

  render() {
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>

        <p>
          This is a collection of my favorite books
        </p>
          <Carousel>
          {this.state.bookArr.length &&
            this.state.bookArr.map((item, idx) => {
              return (
                <Carousel.Item interval={1000}>
                  {/* <img
                    className="d-block w-100"
                    alt="First slide"
                  /> */}
                  <Carousel.Caption>
                    <h3> {item.name}</h3>
                    <p>{item.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })
          } 
         </Carousel> 

      </Jumbotron>
    )
  }
}

export default BestBooks;
