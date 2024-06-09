const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/taskmanager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/tasks', require('./routes/tasks'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
