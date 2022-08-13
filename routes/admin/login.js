import { Router } from 'express';
import passport from 'passport';
const route = Router();

route.get('/', passport.authenticate('discord', { scope: ['identify'], prompt: 'consent' }), function(req, res) {});

export default route;