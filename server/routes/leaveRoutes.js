const express = require('express');
const {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    approveLeave,
    rejectLeave
} = require('../controllers/leaveController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Private routes
router.use(protect);

router.post('/apply', authorize('employee'), applyLeave);
router.get('/my', authorize('employee'), getMyLeaves);

router.get('/all', authorize('employer'), getAllLeaves);
router.put('/:id/approve', authorize('employer'), approveLeave);
router.put('/:id/reject', authorize('employer'), rejectLeave);

module.exports = router;
