import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

class BookFormModal extends React.Component {

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
          displayModal:false,
          book:[],
        }
      }
    

    //add all requment data for form
    updateBookName = (event) => {
        this.setState({
            name: event.target.value
        })
        console.log(this.state.name);
    }


    updateDescription = (event) => {
        this.setState({
            description: event.target.value
        })
        console.log(this.state.description);
    }

    updateImg = (event) => {
        this.setState({
            imageUrl: event.target.value
        })
        console.log(this.state.imageUrl);
    }

    updateStatus = (event) => {
        this.setState({
            status: event.target.value
        })
        console.log(this.state.status);
    }

    

    addBook = async (event) => {
        event.preventDefault();

        const { user } = this.props.auth0;
        const book = {
            
            email:this.props.auth0.user.email,
            name: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            status: this.state.status,

        }
        // let config = {
        //     mode: 'cors',
        //     cache: 'no-cache',
        //     credentials: 'same-origin',
        //     headers: {
        //       'Content-Type': 'application/json'
        //      },
        //      Body :book,
          
        //     redirect: 'follow',
        //     referrerPolicy: 'no-referrer',
        //   }

          
        // console.log(bookData);
        const newBook =  axios.post(`http://localhost:3001/addbooks`, book);
        this.setState({
            book:  await newBook.data
        });
        console.log(newBook);

    }
    render() {
        return (
            <div>
                <Modal show={this.props.displayModal} onHide={this.props.hiddenModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book  To Favorites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form  >
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Name of the book</Form.Label>
                                <Form.Control onChange={this.updateName} type='text' />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>description of the book</Form.Label>
                                <Form.Control onChange={this.updateDescription} type='text' />
                            </Form.Group>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Label>Book Img</Form.Label>
                                <Form.Control type="text" label="book image" onChange={this.updateImg} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status of the book</Form.Label>
                                <Form.Control onChange={this.updateStatus} type='text' />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hiddenModal}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={this.addBook}>
                            Add Book
                         </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default withAuth0(BookFormModal);