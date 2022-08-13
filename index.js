import Express from 'express';
import MongoDBClient from './MongoDBClient.js';
import IndexRoute from './routes/index.js'
import { Strategy } from 'passport-discord';
import fs from 'node:fs';
import passport from 'passport';
import session from 'express-session';
import refreshContributors from './utils/refreshContributors.js';

let config = fs.readFileSync('./config.json');
config = config.toString();
config = JSON.parse(config);

const dbClient = new MongoDBClient(config.mongoDBURL);

const app = Express();

app.use(session({
    secret: config.discordOAuth2.clientSecret,
    resave: false,
    saveUninitialized: false
}));

passport.use(new Strategy({
    clientID: config.discordOAuth2.clientId,
    clientSecret: config.discordOAuth2.clientSecret,
    callbackURL: '/admin/callback',
    scope: ['identity'],
    prompt: 'consent'
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.set('config', config);
app.set('db', dbClient);
app.use('/', IndexRoute);

app.use(Express.json());

app.listen(config.website.port);

(async() => {
    await refreshContributors(dbClient);
    setInterval(async () => {
        await refreshContributors(dbClient);
    }, 30 * 60 * 1000);
})();
