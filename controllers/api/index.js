const router = require('express').Router();
const userRoutes = require('./userRoutes');
const outfitRoutes = require('./outfitRoutes');

router.use('/user', userRoutes);
router.use('/outfit', outfitRoutes);

module.exports = router;