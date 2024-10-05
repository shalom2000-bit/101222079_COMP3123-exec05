const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const userData = require('./user.json');

app.use(express.json());

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

router.get('/profile', (req, res) => {
    res.json(userData);
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username !== userData.username) {
        return res.json({ status: false, message: "User Name is invalid" });
    } 
    if (password !== userData.password) {
        return res.json({ status: false, message: "Password is invalid" });
    } 
    return res.json({ status: true, message: "User Is valid" });
});


router.get('/logout', (req, res) => {
    const username = req.query.username;
    res.send(`<b>${username} successfully logged out.</b>`);
});

app.use((err, req, res, next) => {
    res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
    console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});

