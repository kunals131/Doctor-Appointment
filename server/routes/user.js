const {updateUserHandler, updatePasswordHandler, changeProfilePictureHandler} = require('../controllers/user/updateDetails')
const {getUserDetailsHandler, getUserMessagesHandler} = require('../controllers/user/details')
const express = require('express');

const router = express.Router();

router.put('/:id/',updateUserHandler);
router.get('/:id/',getUserDetailsHandler);
router.get('/:id/messages',getUserMessagesHandler);
router.put('/:id/password', updatePasswordHandler);
router.put('/:id/profile', changeProfilePictureHandler);

module.exports = router;

