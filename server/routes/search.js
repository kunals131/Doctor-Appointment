const { getDoctorsBasedOnKeywordsHandler } = require("../controllers/search/details");
const express = require('express');

const router = express.Router();

router.get('/doctors/',getDoctorsBasedOnKeywordsHandler);

module.exports = router;
