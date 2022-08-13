import { Router } from 'express';
import refreshContributors from '../../utils/refreshContributors.js';
const route = Router();

route.get('/', async (req, res) => {
    if (!req.user?.id) return res.status(401).json({ error: 'Not logged in.' });

    if (!req.app.get('config').admins.includes(req.user.id)) return res.status(403).json({ error: 'User not an admin.' });

    await refreshContributors(req.app.get('db'));
    res.json({});
});

export default route;