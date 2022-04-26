const {updateUserHandler, updatePasswordHandler} = require('../controllers/user/updateDetails')
const {getUserDetailsHandler} = require('../controllers/user/details')
const express = require('express');

const router = express.Router();

router.put('/:id/',updateUserHandler);
router.get('/:id/',getUserDetailsHandler);
router.put('/:id/password', updatePasswordHandler);

module.exports = router;

