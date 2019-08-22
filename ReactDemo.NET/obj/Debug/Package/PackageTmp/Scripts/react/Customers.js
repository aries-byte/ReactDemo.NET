import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
    Modal,
} from 'semantic-ui-react';



export class CustomerGridRow extends React.Component {

    render() {

        let cust = new CustomersGridTable();

        return (

            <tr>
                <td>{this.props.item.Name}</td>
                <td>{this.props.item.Address}</td>
                <td>
                    <ModalUpdate item={{ custId: this.props.item.Id, custName: this.props.item.Name, custAddress: this.props.item.Address }} />
                </td>
                <td>
                    <ModalDelete item={{ custId: this.props.item.Id, custName: this.props.item.Name, custAddress: this.props.item.Address }} />
                </td>
            </tr>
        );
    }

};


export class CustomersGridTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.createData = this.createData.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.deleteRow = this.deleteRow.bind(this);


    }

    componentDidMount() {
        let dataUrl = '/Customers/GetCustomersData';
        $.get(dataUrl, function (data) {
            this.setState({
                items: data
            });
        }.bind(this));
    }

    componentDidUpdate() {
        let dataUrl = '/Customers/GetCustomersData';
        $.get(dataUrl, function (data) {
            this.setState({
                items: data
            });

        }.bind(this));
    }


    createData() {
        //ajax call logic 
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        let finalUrl = '/Customers/Create';
        var custName = document.getElementById('custName').value;
        var custAddress = document.getElementById('custAddress').value;


        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'custName': custName, 'custAddress': custAddress },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log("this data is created");
                console.log(data);

            },
            error: function (response) {
                console.log('error ' + response);
            }
        })
    }
    updateRow(id) {
        //ajax call logic        
        console.log('update this ' + id);
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        let finalUrl = '/Customers/Edit';
        var custName = document.getElementById('custName').value;
        var custAddress = document.getElementById('custAddress').value;

        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'id': id, 'custName': custName, 'custAddress': custAddress },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log("this data is updated");
                console.log(data);

            },
            error: function (response) {
                console.log('error ' + response);
            }

        })



    }
    deleteRow(id) {
        //ajax call logic       
        console.log('delete this ' + id);
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        let finalUrl = '/Customers/Delete';
        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'id': id },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                console.log("this data is deleted");
                console.log(data);

            },
            error: function (response) {
                console.log('error ' + response);
            }
        })
    }

    render() {
        var rows = [];

        this.state.items.forEach(function (item) {
            rows.push(<CustomerGridRow key={item.Id} item={item} />);
        });
        return (
            <div>

                <div>
                    <ModalCreate />
                </div>
                <table className="table table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}

                    </tbody>
                </table>


            </div>

        );

    }
};

const inlineStyle = {
    modal: {
        margin: '0 auto!important',
        top: 'auto!important',
        left: 'auto!important',
        transition: 'all ease .5s'
    }
};
export default class ModalUpdate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    handleOpenModal() {
        this.setState(() => {
            return { showModal: true };
        });
    }

    handleUpdate() {

        this.handleCloseModal();
        let cust = new CustomersGridTable();
        cust.updateRow(this.props.item.custId);


    }

    handleCloseModal() {
        console.log(this.state.showModal);
        this.setState(() => {
            return { showModal: false };
        });
    }


    render() {
        return (
            <div>
                <Modal
                    open={this.state.showModal}
                    className="ui modal"
                    size='tiny'
                    trigger={<Button onClick={this.handleOpenModal} className="ui yellow"><i className="edit icon"></i>EDIT</Button>}
                    onClose={this.handleCloseModal}

                >
                    <Modal.Header>EDIT Customer</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form">
                            <div className="field">
                                <label>Customer Name</label>
                                <input type="text" id="custName" placeholder="Customer Name" defaultValue={this.props.item.custName} />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" id="custAddress" placeholder="Address" defaultValue={this.props.item.custAddress} />
                            </div>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleCloseModal} negative >No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='EDIT' onClick={this.handleUpdate} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};


export class ModalDelete extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleOpenModal() {
        this.setState(() => {
            return { showModal: true };
        });
    }

    handleDelete() {
        this.handleCloseModal();
        let cust = new CustomersGridTable();
        cust.deleteRow(this.props.item.custId);


    }

    handleCloseModal() {
        console.log(this.state.showModal);
        this.setState(() => {
            return { showModal: false };
        });
    }


    render() {
        return (
            <div>
                <Modal
                    open={this.state.showModal}
                    className="ui modal"
                    size='tiny'
                    trigger={<Button onClick={this.handleOpenModal} className="ui red"><i className="trash icon"></i>DELETE</Button>}
                    onClose={this.handleCloseModal}
                >
                    <Modal.Header>DELETE Customer</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this store ({this.props.item.custName}) ?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleCloseModal} negative >No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='DELETE' onClick={this.handleDelete} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};

export class ModalCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }
    handleOpenModal() {
        this.setState(() => {
            return { showModal: true };
        });
    }

    handleCreate() {
        this.handleCloseModal();
        let cust = new CustomersGridTable();
        cust.createData();


    }

    handleCloseModal() {
        console.log(this.state.showModal);
        this.setState(() => {
            return { showModal: false };
        });
    }


    render() {
        return (
            <div>
                <Modal
                    open={this.state.showModal}
                    className="ui modal"
                    size='tiny'
                    trigger={<Button onClick={this.handleOpenModal} className="ui blue"><i className="file alternate  icon"></i>CREATE</Button>}
                    onClose={this.handleCloseModal}
                >
                    <Modal.Header>CREATE Customer</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form">
                            <div className="field">
                                <label>Customer Name</label>
                                <input type="text" id="custName" placeholder="Customer Name" />
                            </div>
                            <div className="field">
                                <label>Address</label>
                                <input type="text" id="custAddress" placeholder="Address" />
                            </div>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleCloseModal} negative >No</Button>
                        <Button positive icon='checkmark' labelPosition='right' content='CREATE' onClick={this.handleCreate} />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
};