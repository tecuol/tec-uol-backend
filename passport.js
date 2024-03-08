"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const passport_local_1 = __importDefault(require("passport-local"));
const LocalStrategy = passport_local_1.default.Strategy;
function init(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser((req, user, done) => {
        done(undefined, user);
    });
    // passport.deserializeUser((id: Admin, done) => {
    //     Admin.findByPk(id.id).then((user: Admin) => {
    //         done(null, user);
    //     }).catch((e) => {
    //         done(e, null);
    //     });
    // });
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    // passport.use('local-login', new LocalStrategy({ usernameField: "username", passwordField: "password", passReqToCallback: true }, async (req, username, password, done) => {
    //     try {
    //         let user = await Admin.findOne({
    //             where: {
    //                 username: username
    //             }
    //         });
    //         if (user) {
    //             if (bcrypt.compareSync(password, user.password)) {
    //                 done(null, user);
    //             } else {
    //                 done(null, false, { message: 'Invalid credentials!' });
    //             }
    //         } else {
    //             done(null, false, { message: 'Invalid credentials' });
    //         }
    //     } catch (e) {
    //         done(e);
    //     }
    // }));
}
exports.init = init;
;
