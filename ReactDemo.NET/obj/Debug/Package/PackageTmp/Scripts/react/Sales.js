import React from 'react';
import {
    Button,
    Form,
    Grid,
    Header,
    Message,
    Segment,
    Modal,
    Dropdown,
} from 'semantic-ui-react';



export class SaleGridRow extends React.Component {

    render() {

        let sale = new SalesGridTable();
        var date = this.props.item.saleDate;
        var nowDate = new Date(parseInt(date.substr(6)));
        
        return (
            
            <tr>
                <td>{nowDate.toDateString()}</td>
                <td>{this.props.item.custName}</td>
                <td>{this.props.item.prodName}</td>
                <td>{this.props.item.storeName}</td>
                <td>
                    <ModalUpdate item={{ sdate: nowDate.toDateString(), Id: this.props.item.Id, custName: this.props.item.custName, storeName: this.props.item.storeName, prodName: this.props.item.prodName }} />
                </td>
                <td>
                    <ModalDelete item={{ sdate: nowDate.toDateString(), Id: this.props.item.Id, custName: this.props.item.custName, storeName: this.props.item.storeName, prodName: this.props.item.prodName }} />
                </td>
            </tr>
        );
    }

};


export class SalesGridTable extends React.Component {

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
        let dataUrl = '/Sales/GetSalesData';
        console.log(dataUrl);
        $.get(dataUrl, function (data) {
            console.log(data);
            this.setState({
                items: data
            });
        }.bind(this));
    }

    componentDidUpdate() {
        let dataUrl = '/Sales/GetSalesData';
        $.get(dataUrl, function (data) {
            this.setState({
                items: data
            });
        }.bind(this));
    }


    createData(pId, sId, cId) {
        //ajax call logic 
        var sDate = document.getElementById('saleDate').value;       
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        let finalUrl = '/Sales/Create';
        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'prodId': pId, 'storeId': sId, 'custId' : cId, 'saleDate': sDate },
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
    updateRow(Id, pId, sId, cId) {
        //ajax call logic 
        var sDate = document.getElementById('saleDate').value; 
        
        var antiForgeryToken = $("input[name=__RequestVerificationToken]").val();
        let finalUrl = '/Sales/Edit';
        $.ajax({
            type: "GET",
            url: finalUrl,
            dataType: "json",
            data: { 'id': Id, 'prodId': pId, 'custId': cId, 'storeId': sId, 'saleDate': sDate },
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
        let finalUrl = '/Sales/Delete';
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
            rows.push(<SaleGridRow key={item.Id} item={item}/>);
        });
        return (
            <div>

                <div>
                    <ModalCreate />
                </div>
                <table className="table table-bordered table-responsive">
                    <thead>
                        <tr>
                            <th>Date Sold</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Store Name</th>
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
            showModal: false,
            dboxProdData: [],
            dboxCustData: [],
            dboxStoreData: [],
            selectValue: null,
            selectStoreValue: null,
            selectCustValue: null
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getdropdownProduct = this.getdropdownProduct.bind(this);
        this.getdropdownStore = this.getdropdownStore.bind(this);
        this.getdropdownCust = this.getdropdownCust.bind(this);
    }

    componentDidMount() {

        let prodUrl = '/Sales/GetProdData';
        let custUrl = '/Sales/GetCustData';
        let storeUrl = '/Sales/GetStoreData';
        $.get(prodUrl, function (data) {
            console.log(data);
            this.setState({
                dboxProdData: data
            });

        }.bind(this));
        $.get(custUrl, function (data) {
            console.log(data);
            this.setState({
                dboxCustData: data
            });

        }.bind(this));
        $.get(storeUrl, function (data) {
            console.log(data);
            this.setState({
                dboxStoreData: data
            });

        }.bind(this));
    }

    componentDidUpdate() {

    }

    handleOpenModal() {
        this.setState(() => {
            return { showModal: true };
        });
    }
    getdropdownProduct(e, data) {
        console.log('Product Id ' + data.value);
        this.setState({ selectValue: data.value });
    }
    getdropdownStore(e, data) {
        console.log('Store Id ' + data.value);
        this.setState({ selectStoreValue: data.value });
    }
    getdropdownCust(e, data) {
        console.log('Cust Id ' + data.value);
        this.setState({ selectCustValue: data.value });
    }
    handleUpdate() {
        let sale = new SalesGridTable();
        sale.updateRow(this.props.item.Id,this.state.selectValue, this.state.selectStoreValue, this.state.selectCustValue);
        this.handleCloseModal();
    }

    handleCloseModal() {
        console.log(this.state.showModal);
        this.setState(() => {
            return { showModal: false };
        });
    }


    render() {
        const { selectValue } = this.state;
        const { selectStoreValue } = this.state;
        const { selectCustValue } = this.state;
        return (
            <div>
                <Modal
                    open={this.state.showModal}
                    className="ui modal"
                    size='tiny'
                    trigger={<Button onClick={this.handleOpenModal} className="ui yellow"><i className="edit icon"></i>EDIT</Button>}
                    onClose={this.handleCloseModal}
                >
                    <Modal.Header>EDIT Sales</Modal.Header>
                    <Modal.Content>
                        <Form className="ui form">
                            <div className="field">
                                <label>Sale Date</label>
                                <input type="text" id="saleDate" placeholder="Date (YYYY/MM/DD)" defaultValue={this.props.item.sdate} />
                            </div>
                            <div className="field">
                                <label>Product</label>
                                <Dropdown
                                    id='dpProd'
                                    placeholder='Select Product'
                                    fluid
                                    selection
                                    options={this.state.dboxProdData}
                                    onChange={this.getdropdownProduct}
                                    value={selectValue}
                                />
                            </div>
                            <div className="field">
                                <label>Customer</label>
                                <Dropdown
                                    placeholder='Select Customer'
                                    fluid
                                    selection
                                    options={this.state.dboxCustData}
                                    onChange={this.getdropdownCust}
                                    value={selectCustValue}
                                />
                            </div>
                            <div className="field">
                                <label>Store</label>
                                <Dropdown
                                    placeholder='Select Store'
                                    fluid
                                    selection
                                    options={this.state.dboxStoreData}
                                    onChange={this.getdropdownStore}
                                    value={selectStoreValue}
                                   
                                />
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
        let s = new SalesGridTable();
        s.deleteRow(this.props.item.Id);


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
                        <p>Are you sure you want to delete this Sale ?</p>
                        <p>Date Sold : ({this.props.item.sdate})</p>
                        <p>Customer : ({this.props.item.custName})</p>
                        <p>Product : ({this.props.item.prodName})</p>
                        <p>Store : ({this.props.item.storeName})</p>
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
            showModal: false,
            dboxProdData: [],
            dboxCustData: [],
            dboxStoreData: [],
            selectValue: null,
            selectStoreValue: null,
            selectCustValue: null
        };
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.getdropdownProduct = this.getdropdownProduct.bind(this);
        this.getdropdownStore = this.getdropdownStore.bind(this);
        this.getdropdownCust = this.getdropdownCust.bind(this);
    }

    componentDidMount() {
        
        let prodUrl = '/Sales/GetProdData';
        let custUrl = '/Sales/GetCustData';
        let storeUrl = '/Sales/GetStoreData';        
        $.get(prodUrl, function (data) {
            console.log(data);
            this.setState({
                dboxProdData: data
            });
             
        }.bind(this));
        $.get(custUrl, function (data) {
            console.log(data);
            this.setState({
                dboxCustData: data
            });

        }.bind(this));
        $.get(storeUrl, function (data) {
            console.log(data);
            this.setState({
                dboxStoreData: data
            });

        }.bind(this));
    }

    componentDidUpdate() {
     
    }

    handleOpenModal() {
        this.setState(() => {
            return { showModal: true };
        });
    }
    getdropdownProduct(e, data) {  
        console.log('Product Id ' + data.value);
        this.setState({ selectValue: data.value });        
    }
    getdropdownStore(e, data) {
        console.log('Store Id ' + data.value);
        this.setState({ selectStoreValue: data.value });
    }
    getdropdownCust(e, data) {
        console.log('Cust Id ' + data.value);
        this.setState({ selectCustValue: data.value });
    }
    handleCreate() {
        let sale = new SalesGridTable();
        sale.createData(this.state.selectValue , this.state.selectStoreValue, this.state.selectCustValue);
        this.handleCloseModal();
    }

    handleCloseModal() {
        console.log(this.state.showModal);
        this.setState(() => {
            return { showModal: false };
        });
    }


    render() {
        const { selectValue } = this.state;
        const { selectStoreValue } = this.state;
        const { selectCustValue } = this.state;
        return (
            <div>
                <Modal
                    open={this.state.showModal}
                    className="ui modal"
                    size='tiny'
                    trigger={<Button onClick={this.handleOpenModal} className="ui blue"><i className="file alternate  icon"></i>CREATE</Button>}
                    onClose={this.handleCloseModal}
                >
                    <Modal.Header>CREATE Sales</Modal.Header>
                    <Modal.Content>                        
                        <Form className="ui form">
                            <div className="field">
                                <label>Sale Date</label>
                                <input type="text" id="saleDate" placeholder="Date (YYYY/MM/DD)" />
                            </div>
                            <div className="field">
                                <label>Product</label>
                                <Dropdown
                                    id='dpProd'
                                    placeholder='Select Product'
                                    fluid
                                    selection
                                    options={this.state.dboxProdData}
                                    onChange={this.getdropdownProduct}
                                    value={selectValue}
                                 />
                            </div>
                            <div className="field">
                                <label>Customer</label>
                                <Dropdown
                                    placeholder='Select Customer'
                                    fluid
                                    selection
                                    options={this.state.dboxCustData}
                                    onChange={this.getdropdownCust}
                                    value={selectCustValue}
                                />
                            </div>
                            <div className="field">
                                <label>Store</label>
                                <Dropdown
                                    placeholder='Select Store'
                                    fluid
                                    selection
                                    options={this.state.dboxStoreData}
                                    onChange={this.getdropdownStore}
                                    value={selectStoreValue}
                                />                                
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

