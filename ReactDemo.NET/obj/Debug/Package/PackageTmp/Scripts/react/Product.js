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


 
export class ProductGridRow extends React.Component {
    
    render() {
       
        let prod = new ProductGridTable(); 
        
        return (

            <tr>
                <td>{this.props.item.Name}</td>
                <td>${this.props.item.Price}</td>                
                <td>
                    <ModalUpdate item={{ prodId: this.props.item.Id, prodName: this.props.item.Name, prodPrice: this.props.item.Price }}/>
                </td>
                <td>
                    <ModalDelete item={{ prodId: this.props.item.Id, prodName: this.props.item.Name, prodPrice: this.props.item.Price }} />
                </td>
            </tr>
        );
    }

};


export class ProductGridTable extends React.Component {
    
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
        let dataUrl = '/Products/GetProductData';
        $.get(dataUrl, function (data) {
            this.setState({
                items: data
            });

        }.bind(this));
    }

    componentDidUpdate() {
        let dataUrl = '/Products/GetProductData';
        $.get(dataUrl, function (data) {
            this.setState({
                items: data
            });

        }.bind(this));
    }

    
    createData() {
        //ajax call logic 
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        let finalUrl = '/Products/Create';
        var pName = document.getElementById('prodName').value;
        var pPrice = document.getElementById('prodPrice').value;
        
            
        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'pName': pName, 'pPrice': pPrice },
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
        let finalUrl = '/Products/Edit';
        var pName = document.getElementById('prodName').value;
        var pPrice = document.getElementById('prodPrice').value;
        
        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'id':id , 'pName':pName , 'pPrice':pPrice},
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
        let finalUrl = '/Products/Delete';
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
            rows.push(<ProductGridRow key={item.Id} item={item} />);
        });
        return (
            <div>   
                
                <div>
                     <ModalCreate />  
                </div>
                <table className="table table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
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
        let prod = new ProductGridTable();
        prod.updateRow(this.props.item.prodId);
        

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
                    <Modal.Header>EDIT Product</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form">
                            <div className="field">
                                <label>Product Name</label>
                                <input type="text" id="prodName" placeholder="Product Name" defaultValue={this.props.item.prodName} />
                            </div>
                            <div className="field">
                                <label>Product Price</label>
                                <input type="text" id="prodPrice" placeholder="Product Price" defaultValue={this.props.item.prodPrice} />
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
        let prod = new ProductGridTable();
        prod.deleteRow(this.props.item.prodId);


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
                    <Modal.Header>DELETE Product</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure you want to delete this product ({this.props.item.prodName}) ?</p>
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
        let prod = new ProductGridTable();
        prod.createData();


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
                    <Modal.Header>CREATE Product</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form">
                            <div className="field">
                                <label>Product Name</label>
                                <input type="text" id="prodName" placeholder="Product Name" />
                            </div>
                            <div className="field">
                                <label>Product Price</label>
                                <input type="text" id="prodPrice" placeholder="Product Price" />
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