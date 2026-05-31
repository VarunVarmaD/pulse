const express = require('express');
const {createMonitor, deleteMonitor, fetchMonitor, fetchMonitors, updateMonitor} = require("../controllers/monitorController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post('/', auth, createMonitor);
router.delete('/:id', auth, deleteMonitor);
router.get('/:id', auth, fetchMonitor);
router.get('/', auth, fetchMonitors);
router.put('/:id', auth, updateMonitor);

module.exports = router;