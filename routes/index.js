import { Router } from 'express';
import getContributors from './getContributors.js';
import Admin from './admin/index.js';

const route = Router();

route.use('/contributors', getContributors);
route.use('/admin', Admin);
route.get('/', (_, res) => res.json({ hello: 'world!'}));

export default route;