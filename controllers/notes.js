const Note = require('../models/Note')

exports.getTodo = async (req, res, next) => {
  try {
    const notesQuantity = await Note.countDocuments({creator: req.userId});
    if(notesQuantity === 0) {
      return res.status(204).json({
        message: "This user don't have notes",
      });
    }
    const notes = await Note.find({creator: req.userId})
    res.status(200).json({
      notes
    })
  } catch(err) {
    next(err)
  }
}

exports.addTodo = async (req, res, next) => {
  try {
    const note = new Note({
      noteContent: req.body.noteContent,
      creator: req.userId
    })
    await note.save()
    res.status(201).json({
      message: 'Note created!'
    })
  } catch(err) {
    next(err)
  }
}

exports.deleteTodo = async (req, res, next) => {
  try {
    const noteId = req.body.noteId
    await Note.findByIdAndDelete(noteId)
    res.status(202).json({
      message: 'Note deleted!'
    })
  } catch(err) {
    next(err)
  }
}

exports.updateTodo = async (req, res, next) => {
  const {noteContent, noteId} = req.body;
  try {
		await Note.findByIdAndUpdate(noteId, {noteContent});
    res.status(202).json({
			message: "Note modified!",
		});
	} catch (err) {
		next(err);
	}
}
