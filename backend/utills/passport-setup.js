import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth20';
import User from './models/User'; // Import your user model

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            new User({ googleId: profile.id, username: profile.displayName }).save().then((user) => done(null, user));
        }
    });
}));

// GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ githubId: profile.id }).then((existingUser) => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            new User({ githubId: profile.id, username: profile.displayName }).save().then((user) => done(null, user));
        }
    });
}));
