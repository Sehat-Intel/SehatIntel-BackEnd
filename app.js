var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
const favicon = require('express-favicon');
require('dotenv').config();



const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const AdminBroExpress = require('@admin-bro/express');

const User = require('./models/users.model');

var indexRouter = require('./routes/index.route');
var usersRouter = require('./routes/users.route');
var dataRouter = require('./routes/data.route');
const Data = require('./models/data.model');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.svg'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
next();
});
AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
    rootPath: '/admin',
    logoutPath: '/admin/logout',
    loginPath: '/admin/login',
    resources: [User, Data],
    dashboard: {
      handler: async () => {
        return { some: 'output' }
      },
      component: AdminBro.bundle('./component/my-dashboard-component')
    },
    branding: {
      logo:
        'https://res.cloudinary.com/imagecdntuminzee/image/upload/v1616488582/SehatIntel_ikbeuz.png',
      favicon: 'https://res.cloudinary.com/imagecdntuminzee/image/upload/v1616488582/SehatIntel_ikbeuz.png',
          companyName: 'Sehat Intel',
        softwareBrothers: false
    }, 
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN
        }
        return null
    },
    cookieName: 'adminbro',
    cookiePassword: 'somePassword',
});
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true
}));


// const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);



app.use(logger('dev'));
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);

module.exports = app;
