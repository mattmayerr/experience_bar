const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Buster1326',  // Update with your MySQL password
    database: 'exp_bar'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware to serve static files from the 'public' directory
app.use(express.static('public')); // Serve HTML, CSS, JS from 'public' directory

// Middleware
app.use(bodyParser.json());

// API to get experience data
app.get('/api/experience', (req, res) => {
    db.query('SELECT * FROM experience WHERE id = 1', (err, result) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).send('Error fetching data');
        }
        if (result.length > 0) {
            return res.json(result[0]);  // Send back the experience data (level, experiencePoints)
        }
        // If no data exists, send back the default experience data
        return res.json({ level: 1, experiencePoints: 0 });
    });
});

// API to update experience data
app.post('/api/experience', (req, res) => {
    const { level, experiencePoints } = req.body;

    db.query('INSERT INTO experience (id, level, experiencePoints) VALUES (1, ?, ?) ON DUPLICATE KEY UPDATE level = ?, experiencePoints = ?',
        [level, experiencePoints, level, experiencePoints], (err, result) => {
            if (err) {
                console.error('Error details:', er