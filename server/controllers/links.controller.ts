import * as mongoose from 'mongoose';
import * as q from 'q';
import { Types } from 'mongoose';
import { secret } from '../config/config';
import { Link } from '../models/link';
(<any>mongoose).Promise = q.Promise;
import { Request, Response, NextFunction } from 'express';

export function addLink(req: Request, res: Response) {
  const link = new Link({
    longUrl: req.body.longUrl,
    shortUrl: req.body.shortUrl,
    description: req.body.description,
    tags: req.body.tags,
    created: Date.now(),
    user_id: Types.ObjectId(req.body.user_id)
  }); // create a new instance of the Link model
if (!req.body.user_id) {
  throw new Error('user_id is required');
}
  link.save()
    .then(result => {
      res.json({
        success: true,
        message: 'Link added',
        _id: result._id
      });
    })
    .catch(err => {
      res.status(400).json({
        success: false,
        message: err.message
      });
    });
}
export function getUsersClicksById(req: Request, res: Response, next: NextFunction) {
  Link.find({
    user_id: req.query.user_id
  }, (err, docs) => {
    if (err) {
      next(err);
    } else {
      let totalClicks = 0;
      docs.forEach((link: any) => {
        totalClicks += link.clicks;
      }, this);
      res.json({
        'totalClicks': totalClicks
      });
    }
  });
}
export function getUsersLinkByUserId(req: Request, res: Response, next: NextFunction) {
  if (req.query.user_id && req.query.itemsPerPage && req.query.page) {
    Link.find({
      user_id: Types.ObjectId(req.query.user_id)
    }).sort({
      created: -1
    }).exec(function (err, links) {
      if (err) {
        next(err);
      } else {
        const start = (req.query.page - 1) * req.query.itemsPerPage;
        const end = start + +req.query.itemsPerPage;
        res.json({
          'count': links.length,
          'links': links.slice(start, end)
        });
      }

    });
  } else {
    next();
  }
}
export function getAllLinksWithTag(req: Request, res: Response, next: NextFunction) {
  if (req.query.tag) {
    Link.find({
      tags: req.query.tag
    }, function (err, links) {
      if (err) {
        res.status(500).json({
          success: false,
          message: err.message
        });
      } else {
        res.json(links);
      }
    });
  } else {
    next();
  }
}
export function getLinkById(req: Request, res: Response, next: NextFunction) {
  Link.findById(req.params.link_id, function (err, link) {
    if (err) {
      next(err);
    } else {
      res.json(link);
    }
  });
}
export function updateLinkById(req: Request, resp: Response, next: NextFunction) {
  Link.findByIdAndUpdate(req.params.link_id,
    {
      longUrl: req.body.longUrl,
      shortUrl: req.body.shortUrl,
      description: req.body.description,
      tags: req.body.tags,
      clicks: req.body.clicks
    },
    (err, res) => {
      if (err) {
        resp.status(500).json({
          success: false,
          message: err.message
        });
      } else {
        resp.json({
          success: true,
          message: 'Link successfully updated'
        });
      }
    });
}

export function deleteLinkById(req: Request, res: Response, next: NextFunction) {
  Link.findByIdAndRemove(req.params.link_id, function (err, link) {
    if (err) {
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
    res.json({
      success: true,
      message: 'Link deleted'
    });
  });
}
export function getLongUrl(req: Request, res: Response, next: NextFunction) {
  Link.findOne({
    'shortUrl': req.params.id
  }, (err, link: any) => {
    if (err) {
      res.status(500).json({
              success: false,
              message: err.message
      });
    }
    if (link === null) {
      res.json({
        success: false,
        error: 'url not find'
      });
    } else {
      link.clicks++;
      link.save();
      res.json({
        success: true,
        url: link.longUrl
      });
    }
  });
}
export function getLinkByShortUrl(req, res) {
  Link.findOne({
    shortUrl: req.params.shortUrl
  }, function (err, link) {
    if (err) {
      res.status(500).json({
        success : false,
        message: err.message
      });
    }
    res.json({
      success: true,
      link: link
    });
  });
}

// not used function
//     export function getAllLinks (req: Request, res: Response, next: NextFunction)  {
//     Link.find()
//         .select('description shortUrl longUrl tags id')
//         .sort({
//             created: -1
//         })
//         .then(links => res.json(links))
//         .catch(err => res.json({
//             error: err.message
//         }));
// }
