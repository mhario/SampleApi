let CustomersModel = require('../models/customers.json');
const fs = require('fs');
const path = require('path');

const customers = require('express').Router();

customers.get('/', (req, res) => {
  const params = {
    page_size: req.query.page_size || 10,
    offset: req.query.offset || 0,
  }

  res.json(
    CustomersModel.slice(params.offset, params.offset + params.page_size)
  );
});

customers.get('/:id', (req, res) => {
  res.json(
    CustomersModel.find( customer => +customer._id === +req.params.id )
  );
});

customers.post('/add', (req, res) => {
  const newCustomer = req.body;

  const requiredFields = ['agent_id', 'isActive', 'name', 'email', 'registered'];
  const missingField = requiredFields.find(field => ! newCustomer.hasOwnProperty(field) );

  if( missingField ) {
    res.send('Missing field: ' + missingField).status(400);
  } else {
    newCustomer._id = Math.random() * 25000;
    const newFile = CustomersModel.concat(newCustomer);

    fs.writeFile(
      path.join( __dirname, '../models/customers.json'),
      JSON.stringify(newFile), err => {
        if (err) throw err;
        CustomersModel = newFile;
        res.json( newCustomer );
      }
    );
  }
});

customers.delete('/:id', (req, res) => {
  const target = CustomersModel.find(cust => cust._id === +req.params.id);
  if (! target) {
    res.sendStatus(410);
  }
  const targetIndex = CustomersModel.indexOf(target);
  CustomersModel.splice(targetIndex, 1);
  const newFile = CustomersModel;

  fs.writeFile(
    path.join( __dirname, '../models/customers.json'),
    JSON.stringify(newFile), err => {
      if (err) throw err;
      CustomersModel = newFile;
      res.sendStatus(204);
    }
  );
});

customers.put('/:id', (req, res) => {
  const customer = CustomersModel.find(cust => cust._id === +req.params.id);
  if (! customer) {
    res.sendStatus(400);
  }
  for(const key in req.body) {
    customer[key] = req.body[key];
  }

  fs.writeFile(
    path.join( __dirname, '../models/customers.json'),
    JSON.stringify(CustomersModel), err => {
      if (err) throw err;
      res.json(customer);
    }
  );
});

module.exports = customers;
