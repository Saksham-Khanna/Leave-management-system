const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Sick', 'Casual', 'Paid'],
        required: [true, 'Please specify leave type']
    },
    startDate: {
        type: Date,
        required: [true, 'Please specify start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please specify end date']
    },
    reason: {
        type: String,
        required: [true, 'Please provide a reason']
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
