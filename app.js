const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const dotenv = require('dotenv');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

dotenv.config()

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes)

app.listen(3000, ()=>{console.log('server running on port', port);})
