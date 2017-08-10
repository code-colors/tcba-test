'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TemplateSchema = new Schema({
	bannerImageURL: { type: String, default: 'http://www.goodgle.com.au/images/banner.png' },
	bannerLinkURL: { type: String, default: 'http://www.goodgle.com.au' },
});

module.exports = mongoose.model('Template', TemplateSchema);
