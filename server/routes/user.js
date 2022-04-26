const {updateUserHandler, updatePasswordHandler} = require('../controllers/user/updateDetails')
const express = require('express');

const router = express.Router();

router.put('/:id/',updateUserHandler);
router.put('/:id/password', updatePasswordHandler);

module.exports = router;

