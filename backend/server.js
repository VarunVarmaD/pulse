const express = require('express');
const cors = require('cors');
const pool = require('./db/pool.js');
const authRouter = require('./routes/auth');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})