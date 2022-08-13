import { Router } from 'express';
import Calllback from './callback.js';
import Login from './login.js';
import refreshContributors from './refreshContributors.js';

const route = Router();

route.use('/callback', Calllback);
route.use('/login', Login);
route.use('/refreshContributors', refreshContributors);

export default route;