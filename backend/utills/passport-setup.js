import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Here, find or create a user in your database
    return done(null, profile);
}));

passport.use(new GitHubStrategy({
    clientID: 'YOUR_GITHUB_CLIENT_ID',
    clientSecret: 'YOUR_GITHUB_CLIENT_SECRET',
    callbackURL: 'http://localhost:3000/api/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
    // Here, find or create a user in your database
    return done(null, profile);
}));

// Serialize and deserialize user (required for session support)
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;