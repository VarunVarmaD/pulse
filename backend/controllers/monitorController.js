const pool = require('../db/pool.js');

const createMonitor = async (req, res) => {
    try {
        const user_id = req.user;
        const url = req.body.url;
        const domain_name = req.body.domain_name ? req.body.domain_name : '';
        const interval = req.body.interval;

        const result = await pool.query("INSERT INTO monitors(user_id, url, domain_name, interval) VALUES ($1, $2, $3, $4) RETURNING *", [user_id, url, domain_name, interval]);
        res.status(200).json(result.rows[0]);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "Error creating monitor"});
        return;
    }
}

const deleteMonitor = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user;

        const result = await pool.query("DELETE FROM monitors WHERE id = $1 AND user_id = $2", [id, user_id]);
        res.status(200).json({msg: "Successfully deleted monitor"});
        return;
    } catch(err) {
        console.log(err);
        res.status(400).json({msg: "Error deleting monitor"});
        return;
    }
}

const updateMonitor = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user;
        const url = req.body.url;
        const domain_name = req.body.domain_name ? req.body.domain_name : '';
        const interval = req.body.interval;

        const result = await pool.query("UPDATE monitors SET url=$1, domain_name=$2, interval=$3 WHERE id=$4 AND user_id=$5 RETURNING *", [url, domain_name, interval, id, user_id]);
        res.status(200).json(result.rows[0]);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "Error updating monitor"});
        return;
    }
}

const fetchMonitor = async (req, res) => {
    try {
        const id = req.params.id;
        const user_id = req.user;

        const result = await pool.query("SELECT * FROM monitors WHERE id = $1 AND user_id = $2", [id, user_id]);
        res.status(200).json(result.rows[0]);
        return;
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "Error fetching monitor"});
        return;
    }
}

const fetchMonitors = async (req, res) => {
    try {
        const user_id = req.user;

        const result = await pool.query("SELECT * FROM monitors WHERE user_id = $1", [user_id]);
        res.status(200).json(result.rows);
        return;
    } catch(err) {
        console.log(err);
        res.status(400).json({msg: "Error fetching monitors"});
        return;
    }

}

module.exports = {createMonitor, deleteMonitor, updateMonitor, fetchMonitor, fetchMonitors};