const User = require('../models/User');
const LeaveRequest = require('../models/LeaveRequest');

// @desc    Get all users (employees) with leave stats
// @route   GET /api/users
// @access  Private/Employer
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'employee' }).select('-password');
        
        // Enhance users with leave stats
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const count = await LeaveRequest.countDocuments({ employeeId: user._id });
            return {
                ...user._doc,
                totalLeaves: count
            };
        }));

        res.status(200).json({
            success: true,
            count: usersWithStats.length,
            data: usersWithStats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update user profile (name)
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name
        };

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
