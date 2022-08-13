import { Router } from 'express';
import passport from 'passport';
const route = Router();

route.get('/',
    passport.authenticate('discord',
    { 
        failureRedirect: '/error'
    }), (_, res) => { res.redirect('/') }
);

export default route;