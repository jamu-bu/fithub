const router = require('express').Router();
const { Product, Outfit, OutfitProducts, Category, User } = require('../models');
const authCheck = require('../utils/auth');

// Displaying landing page
router.get('/', async (req, res) => {
    res.render('landing', {layout: false});
});

// Displaying login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/top');
        return;
    }
    res.render('login', { layout: false });
});

// Displaying user's saved outfits
router.get('/yours', authCheck, async (req, res) => {
    try {
        // Finding all saved outfits by user id
        const userData = await Outfit.findAll({
            where: { user_id: req.session.user_id },
            include: [
                { model: Product, through: OutfitProducts },
                { model: User }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'Error finding user data.' })
        };

        const outfits = userData.map((outfit) => outfit.get({ plain: true }));

        res.render('yours', { outfits });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to page where user can create a new outfit.
router.get('/create', authCheck, async (req, res) => {
    try {
        res.render('create');

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for top outfits page
router.get('/top', authCheck, async (req, res) => {
    try {
        // Finding top outfit data
        const topFits = await Outfit.findAll({
            order: [['likes', 'DESC']],
            // limit: 3,
            include: [
                { model: Product, through: OutfitProducts },
                { model: User}
            ]
        });

        if (!topFits) {
            res.status(404).json({ message: 'Error finding top outfits data.' })
        }

        const outfits = topFits.map((outfit) => outfit.get({ plain: true }));

        res.render('top', { outfits,
            logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for viewing selected outfit
router.get('/fit/:id', authCheck, async (req, res) => {
    try {
        // Finding user selected outfit
        const id = req.params.id;
        const selectedFit = await Outfit.findByPk(id, {
            include: [{ model: Product, through: OutfitProducts },
                { model: User}]
        });

        if (!selectedFit) {
            res.status(404).json({ message: 'Error finding outfit data.' })
        }

        const fit = selectedFit.get({ plain: true });

        res.render('fit', { fit });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for user editing selected outfit
router.get('/edit/:id', authCheck, async (req, res) => {
    try {
        // Find user selected outfit
        const id = req.params.id;
        const selectedFit = await Outfit.findByPk(id, {
            include: [{ model: Product, through: OutfitProducts },
                { model: User}]
        });

        if (!selectedFit) {
            res.status(404).json({ message: 'Error finding outfit data.' })
        };

        const fit = selectedFit.get({ plain: true });

        res.render('edit', { fit });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
