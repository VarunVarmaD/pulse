const express = require('express');
const cors = require('cors');
const pool = require('./db/pool.js');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Welcome');
});

(async () => {
    try{
        const result = await pool.query('SELECT NOW()', []);
        console.log(result.rows);
    }
    catch(err){
        console.log(err);
    }
})();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})