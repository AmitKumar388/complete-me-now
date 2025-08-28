import express from 'express';
import Joi from 'joi';
import { Note } from '../models/Note';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Validation schemas
const createNoteSchema = Joi.object({
  title: Joi.string().max(200).required(),
  content: Joi.string().max(10000).required(),
  tags: Joi.array().items(Joi.string().max(30)).optional(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});

const updateNoteSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  content: Joi.string().max(10000).optional(),
  tags: Joi.array().items(Joi.string().max(30)).optional(),
  isPinned: Joi.boolean().optional(),
  color: Joi.string().pattern(/^#[0-9A-F]{6}$/i).optional()
});

// Get all notes
router.get('/', async (req: AuthRequest, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const tag = req.query.tag as string;

    // Build query
    const query: any = { userId: req.user!._id };
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (tag) {
      query.tags = tag;
    }

    // Execute query with pagination
    const notes = await Note.find(query)
      .sort({ isPinned: -1, updatedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Note.countDocuments(query);

    res.json({
      notes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    next(error);
  }
});

// Get single note
router.get('/:id', async (req: AuthRequest, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ note });
  } catch (error) {
    next(error);
  }
});

// Create note
router.post('/', async (req: AuthRequest, res, next) => {
  try {
    const { error } = createNoteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const note = new Note({
      ...req.body,
      userId: req.user!._id
    });

    await note.save();

    res.status(201).json({
      message: 'Note created successfully',
      note
    });
  } catch (error) {
    next(error);
  }
});

// Update note
router.put('/:id', async (req: AuthRequest, res, next) => {
  try {
    const { error } = updateNoteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({
      message: 'Note updated successfully',
      note
    });
  } catch (error) {
    next(error);
  }
});

// Delete note
router.delete('/:id', async (req: AuthRequest, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Toggle pin status
router.patch('/:id/pin', async (req: AuthRequest, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user!._id
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    res.json({
      message: `Note ${note.isPinned ? 'pinned' : 'unpinned'} successfully`,
      note
    });
  } catch (error) {
    next(error);
  }
});

export default router;