const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

// Use the CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Connect database
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log(`Mongodb Connection at ${process.env.MONGODB_URL} Success!`);
});

// Import routes
const studentRoute = require('./routes/students_route');
const teacherRoute = require('./routes/teacher_route');
const authRoute = require('./routes/auth_route'); 

// Use routes
app.use('/student', studentRoute);
app.use('/teacher', teacherRoute);
app.use('/auth', authRoute);  // Authentication routes

app.listen(PORT, () => {
  console.log(`Server is up and running on port : ${PORT}`);
});
