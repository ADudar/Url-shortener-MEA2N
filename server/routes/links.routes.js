var express = require('express');
var router = express.Router();
var linksController = require('../controllers/links.controller');

// router.use('/links', linksController.jwtCheck);

router.route('/links')
    .post(linksController.addLink);
    // .get(linksController.getAllLinks);

router.get('/links/clicks', linksController.getUsersClicksById);
router.get('/links/filter', linksController.getUsersLinkByUserId);

router.route('/links/:link_id')
    .get(linksController.getLinkById)
    .put(linksController.updateLinkById)
    .delete(linksController.deleteLinkById)
    

router.get('/redirect/:id', linksController.getLongUrl);
router.get('/:shortUrl/details', linksController.getLinkByShortUrl);
router.get('/link/filter', linksController.getAllLinksWithTag);

module.exports = router;