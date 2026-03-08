const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Fix for E11000 duplicate key error: username_1 dup key: { username: null }
        // This drops the legacy/accidental unique index on 'username'
        try {
            await mongoose.connection.db.collection('users').dropIndex('username_1');
            console.log('Legacy username index dropped successfully');
        } catch (err) {
            // Index might not exist, which is fine
            if (err.code !== 27) { // 27 is 'IndexNotFound'
                console.log('Note: Username index not found or already dropped');
            }
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
