const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
	noteContent: {
		type: String,
		// required: true,
	},
	creator: {
		type: mongoose.Types.ObjectId,
    required: true
	},
}, {timestamps: true});

module.exports = mongoose.model('Note', noteSchema);