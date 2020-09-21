let AgentsModel = require('../models/agents.json');
let CustomersModel = require('../models/customers.json');
const fs = require('fs');
const path = require('path');
const agents = require('express').Router();


agents.get('/all', (req, res) => {
  res.json(AgentsModel);
});

agents.post('/add', (req, res) => {
  const newAgent = req.body;
  const requiredFields = ['name', 'address', 'city', 'state', 'zipCode', 'tier', 'phone'];
  const missingField = requiredFields.find(field => ! newAgent.hasOwnProperty(field) );

  if( missingField ) {
    res.send('Missing field: ' + missingField).status(400);
  } else {
    const newFile = AgentsModel.concat(newAgent);
    fs.writeFile(
      path.join( __dirname, '../models/agents.json'),
      JSON.stringify(newFile), err => {
        if (err) throw err;
        AgentsModel = newFile;
        res.sendStatus(201);
      }
    );
  }
});

agents.get('/:id', (req, res) => {
  res.json( AgentsModel.find(agent => agent._id === req.body.id ));
});

agents.put('/:id', (req,res) => {
  const agent = AgentsModel.find(agent => +agent._id === +req.params.id);
  for(const key in req.body) {
    agent[key] = req.body[key];
  }

  fs.writeFile(
    path.join( __dirname, '../models/agents.json'),
    JSON.stringify(AgentsModel), err => {
      if (err) throw err;
      res.sendStatus(201);
    }
  );
  res.send(agent)
});

function _mapCityState(address) {
  const [ street, city, state ] = address.split(',');
  return `${ city.trim() }, ${ state }`;
}

agents.get('/:id/customers', (req,res) => {
  const agent = AgentsModel.find(agent => +agent._id === +req.params.id);
    res.json( CustomersModel
      .filter( cust => +cust.agent_id === agent._id )
      .map( cust => {return [
          `${cust.name.last}, ${cust.name.first}`,
          _mapCityState(cust.address) ] })
    );
});

module.exports = agents;

