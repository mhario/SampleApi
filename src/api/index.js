import { version } from '../../package.json';
import { Router } from 'express';
const agents = require('./agents');
const customers = require('./customers');

export default () => {
	let api = Router();

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
