const express = require('express');
const { getUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.get('/', authorize('employer'), getUsers);

module.exports = router;
