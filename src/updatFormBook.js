import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


export class UpdatFormBook extends Component {
    render() {
        return (
            <Modal show={this.props.showUpdateStatus} onHide={this.props.hiddenModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form onSubmit={(e) => this.props.updateBook(e)}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Name of the book</Form.Label>
                            <Form.Control onChange={(e) => this.props.updateName(e)} type='text' value={this.props.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>description of the book</Form.Label>
                            <Form.Control onChange={(e) => this.props.updateDescription(e)} type='text' value={this.props.description} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>urlOfImage</Form.Label>
                            <Form.Control onChange={(e) => this.props.updatimageUrl(e)} type='text' value={this.props.imageUrl} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status of the book</Form.Label>
                            <Form.Control onChange={(e) => this.props.updateStatus(e)} type='text' value={this.props.status} />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hiddenModal}>
                        Close
                   </Button>
                    <Button variant="primary" onClick={this.props.updateBook}>
                        Update Book
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default UpdatFormBook;