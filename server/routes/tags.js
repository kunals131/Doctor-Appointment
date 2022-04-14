const express = require('express');
const { getAllTagsHandler } = require('../controllers/tag/details');
const { createTagHandler, removeTagHandler } = require('../controllers/tag/updateDetails');

const router = express.Router();

router.get('/', getAllTagsHandler);
router.post('/', createTagHandler);
router.delete('/:id', removeTagHandler);

module.exports = router;