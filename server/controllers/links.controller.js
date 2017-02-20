var jwt = require('jsonwebtoken');
var jwt_e = require('express-jwt');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var Promise = require('q').Promise;
mongoose.Promise = require('q').Promise;
var config = require('../config/config');
var Link = require('../models/link');

module.exports = {
    jwtCheck: jwt_e({
        secret: config.secret
    }),

    addLink: (req, res) => {
        var link = new Link(req.body); // create a new instance of the Link model
        link.longUrl = req.body.longUrl;
        link.shortUrl = req.body.shortUrl;
        link.description = req.body.description;
        link.tags = req.body.tags;
        link.clicks = req.body.clicks;
        link.created = Date.now();
        try {
            link.user_id = ObjectId(req.body.user_id);
        } catch (err) {
            res.json({
                success: false,
                message: err.message
            });
        }
        link.save()
            .then(result => {
                res.json({
                    success: true,
                    message: "Link added",
                    _id: result._id
                });
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: err.message
                });
            });
    },

//not used function
    // getAllLinks: (req, res) => {
    //     Link.find()
    //         .select('description shortUrl longUrl tags id')
    //         .sort({
    //             created: -1
    //         })
    //         .then(links => res.json(links))
    //         .catch(err => res.json({
    //             error: err.message
    //         }));
    // },

    getUsersClicksById: (req, res, next) => {
        Link.find({
            user_id: req.query.user_id
        },  (err, docs) => {
            if (err) next(err);
            else {
                var totalClicks = 0;
                docs.forEach(function (link) {
                    totalClicks += link.clicks;
                }, this);
                res.json({
                    'totalClicks': totalClicks
                });
            }
        });
    },

    getUsersLinkByUserId: function (req, res, next) {
        if (req.query.user_id && req.query.itemsPerPage && req.query.page) {
            Link.find({
                user_id: ObjectId(req.query.user_id)
            }).sort({
                created: -1
            }).exec(function (err, links) {
                if (err) next(err);
                let start = (req.query.page - 1) * req.query.itemsPerPage;
                let end = start + +req.query.itemsPerPage;
                res.json({
                    'count': links.length,
                    'links': links.slice(start, end)
                });
            });
        } else next();
    },

    getAllLinksWithTag:  (req, res, next) => {
        if (req.query.tag) {
            Link.find({
                tags: req.query.tag
            }, function (err, links) {
                if (err) res.json({
                    success: false
                });
                res.json(links);
            });
        } else next();
    },

    getLinkById: (req, res, next) => {
        Link.findById(req.params.link_id, function (err, link) {
            if (err)
                next(err);
            else res.json(link);
        });
    },

    updateLinkById: (req, res) => {
        Link.findById(req.params.link_id, function (err, link) {

            if (err)
                res.send(err);
            link.longUrl = req.body.longUrl;
            link.shortUrl = req.body.shortUrl;
            link.description = req.body.description;
            link.tags = req.body.tags;
            link.clicks = req.body.clicks;

            // save the link
            link.save( (err) => {
                if (err)
                    res.send(err);
                else {
                    res.json({
                        success: true,
                        message: "Link successfully updated"
                    });
                }
            });

        });
    },

    deleteLinkById: (req, res) => {
        Link.findByIdAndRemove(req.params.link_id, function (err, link) {
            if (err)
                res.send(err);

            res.json({
                message: 'Link deleted'
            });
        });
    },

    getLongUrl: (req, res, next) => {
        Link.findOne({
            'shortUrl': req.params.id
        }, (err, link) => {
            if (err) res.json(err);
            if (link === null) res.json({
                error: "url not find"
            });
            else {
                link.clicks++;
                link.save();
                res.json({
                    url: link.longUrl
                });
            }
        });
    },

    getLinkByShortUrl: (req, res) => {
        Link.findOne({
            shortUrl: req.params.shortUrl
        }, function (err, link) {
            if (err)
                res.send(err);
            res.json(link);
        });
    }

};