import React from 'react';
import { Modal, Form, Button, Icon, Header, Image } from 'semantic-ui-react';

export default class ModalProduct extends React.Component {
 
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleOpenModal ()  {
        console.log("Here");
        this.setState(() => {
            console.log(`Changing state to 'showModal open`);
            return { showModal: true };
        });
    }

    handleUpdate() {
        console.log("I am Here");
        this.handleCloseModal();
    }

    handleCloseModal () {
        console.log(this.state.showModal);
        this.setState(() => {
            console.log(`Changing state to 'showModal: close`);
            return { showModal: false };
        });
    }

        render() {
            return (
                                
                    <Modal id="modalUpdate"
                        open={this.state.showModal}
                        className="ui modal"
                        size='tiny'
                        trigger={<Button onClick={this.handleOpenModal} className="ui button">EDIT</Button>}                       
                        onClose={this.handleCloseModal}
                        basic
                        >
                            <Modal.Header>EDIT Product</Modal.Header>
                            <Modal.Content>
                                <Form className="ui form">
                                    <div className="field">
                                        <label>Product Name</label>
                                        <input type="text" id="prodName" placeholder="Product Name" />
                                    </div>
                                    <div className="field">
                                        <label>Product Price</label>
                                        <input type="text" id="prodPrice" placeholder="Product Price"  />
                                    </div>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                            <Button onClick={this.handleCloseModal} negative >No</Button>
                            <Button positive icon='checkmark' labelPosition='right' content='Edit' onClick={this.handleUpdate} />
                            </Modal.Actions>
                        </Modal>    
                    
               
            )
        }
}



