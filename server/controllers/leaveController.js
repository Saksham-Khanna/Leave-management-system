const LeaveRequest = require('../models/LeaveRequest');

// @desc    Apply for leave
// @route   POST /api/leaves/apply
// @access  Private/Employee
exports.applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        // Basic validation
        if (!leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ success: false, message: 'Start date cannot be after end date' });
        }

        const leave = await LeaveRequest.create({
            employeeId: req.user.id,
            leaveType,
            startDate,
            endDate,
            reason
        });

        res.status(201).json({
            success: true,
            data: leave
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get my leave applications
// @route   GET /api/leaves/my
// @access  Private/Employee
exports.getMyLeaves = async (req, res) => {
    try {
        const leaves = await LeaveRequest.find({ employeeId: req.user.id }).sort('-createdAt');

        res.status(200).json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all leave requests (for employer)
// @route   GET /api/leaves/all
// @access  Private/Employer
exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await LeaveRequest.find().populate('employeeId', 'name email').sort('-createdAt');

        res.status(200).json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Approve leave request
// @route   PUT /api/leaves/:id/approve
// @access  Private/Employer
exports.approveLeave = async (req, res) => {
    try {
        let leave = await LeaveRequest.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave request not found' });
        }

        leave = await LeaveRequest.findByIdAndUpdate(
            req.params.id,
            { status: 'approved' },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: leave
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Reject leave request
// @route   PUT /api/leaves/:id/reject
// @access  Private/Employer
exports.rejectLeave = async (req, res) => {
    try {
        let leave = await LeaveRequest.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({ success: false, message: 'Leave request not found' });
        }

        leave = await LeaveRequest.findByIdAndUpdate(
            req.params.id,
            { status: 'rejected' },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: leave
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
