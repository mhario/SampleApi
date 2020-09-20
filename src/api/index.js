import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
const agents = require('./agents');
const customers = require('./customers');

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	//
	// Test end points
	api.use('/agents', agents);
	api.use('/customers', customers);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
