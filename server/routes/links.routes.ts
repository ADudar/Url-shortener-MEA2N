import { Router } from 'express';
import * as jwt_e from 'express-jwt';
import {
        addLink, getUsersClicksById,
        getUsersLinkByUserId, getAllLinksWithTag, getLinkById,
        updateLinkById, deleteLinkById, getLongUrl,
        getLinkByShortUrl } from '../controllers/links.controller';
import { secret } from '../config/config';

const linksRouter = Router();

linksRouter.use('/links', jwt_e({
    secret: secret
  }));

linksRouter.route('/links')
  .post(addLink);
// .get(linksController.getAllLinks);

linksRouter.get('/links/clicks', getUsersClicksById);
linksRouter.get('/links/filter', getUsersLinkByUserId);

linksRouter.route('/links/:link_id')
  .get(getLinkById)
  .put(updateLinkById)
  .delete(deleteLinkById)

linksRouter.get('/redirect/:id', getLongUrl);
linksRouter.get('/:shortUrl/details', getLinkByShortUrl);
linksRouter.get('/link/filter', getAllLinksWithTag);

export { linksRouter }
