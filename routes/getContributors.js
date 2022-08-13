import { Router } from 'express';
const route = Router();

route.get('/', async (req, res) => {
    const contributors = await req.app.get('db').getContributors();

    res.json(contributors);
});

export default route;