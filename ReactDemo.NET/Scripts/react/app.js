
import Product, { ProductGridTable } from './Product';
import Store, { StoresGridTable } from './Stores'; SalesGridTable
import Customers, { CustomersGridTable } from './Customers';
import Sales, { SalesGridTable } from './Sales';
import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

//ReactDOM.render(                
//            <div>
//                <ProductGridTable />                    
//            </div> , document.getElementById('app')
                   
//);

if (window.location.pathname === '/Sales') {
    ReactDOM.render(
        <SalesGridTable />,
        document.getElementById('appSales')
    );
}
else if (window.location.pathname === '/Products') {
    ReactDOM.render(
        <ProductGridTable />,
        document.getElementById('appProd')
    );
}
else if (window.location.pathname === '/Customers') {
    ReactDOM.render(
        <CustomersGridTable />,
        document.getElementById('appCust')
    );
}
else if (window.location.pathname === '/Stores') {
    ReactDOM.render(
        <StoresGridTable />,
        document.getElementById('appStore')
    );
    console.log('app.js');
}



        
        
        
        
        
        
