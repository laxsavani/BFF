const express = require('express')
const path = require('path')
const port = 2000;
const flash = require('express-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');


app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(morgan("dev"))
app.use(cookieParser())

require('dotenv').config();

app.use(session({
    saveUninitialized: true,
    secret: 'secret',
    resave:false
}))

app.use('/admin', require('./routes/adminrouter'));

require('./config/dataBase')

app.get('/', (req, res) => {
    res.redirect('/student/login');
})
app.get('/admin/', (req, res) => {
    res.redirect('/admin/login');
})
app.get('/manager/', (req, res) => {
    res.redirect('/manager/login');
})
app.get('/student/', (req, res) => {
    res.redirect('/student/login');
})

app.use((req, res) => {
    res.render('404');
});
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server Is Running " + port);
})