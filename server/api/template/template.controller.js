'use strict';

var _ = require('lodash');
var Template = require('./template.model');

// Get list of submissions
exports.index = function(req, res) {
  Template.find(function (err, template) {
    if(err) { return handleError(res, err); }

    // Seed create if it doesn't exist
    if(!template.length) {
        Template.create({}, function(err, template) {
          if(err) { return handleError(res, err); }
          return res.json(200, template);
        });
    } else {
        return res.json(200, template[0]);
    }
  });
};

// Updates an existing submission in the DB.
exports.update = function(req, res) {
  Template.findById(req.body._id, function (err, template) {
    if (err) { return handleError(res, err); }
    if(!template) { return res.send(404); }
    if(req.body._id) { delete req.body._id; }
    if(req.body._v) { delete req.body._v; }

    var updated = _.merge(template, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, template);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
