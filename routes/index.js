const router = require('express').Router();

router.use("/points", require("./points"));
router.use("/polygons", require('./polygon'));


module.exports = router;