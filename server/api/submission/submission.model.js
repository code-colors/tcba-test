'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var SubmissionSchema = new Schema({
	title: { type: String, default: '' },
	firstName: { type: String, default: '' },
	surname: { type: String, default: '' },
	email: { type: String, default: '' },
	phone: { type: String, default: '' },
	dateOfBirth: { type: String, default: null },
	cbaBusinessUnit: { type: String, default: '' },
	virginAirlines: { type: Boolean, default: false },
	qantasAirlines: { type: Boolean, default: false },
	beachHoliday: { type: Boolean, default: false },
	skiHoliday: { type: Boolean, default: false },
	familyHoliday: { type: Boolean, default: false },
	cruiseHoliday: { type: Boolean, default: false },
	adventureHoliday: { type: Boolean, default: false },
	tourHoliday: { type: Boolean, default: false },
	luxuryHoliday: { type: Boolean, default: false },
	australiaDestination: { type: Boolean, default: false },
	newZealandDestination: { type: Boolean, default: false },
	southPacificIslandsDestination: { type: Boolean, default: false },
	asiaDestination: { type: Boolean, default: false },
	europeDestination: { type: Boolean, default: false },
	africaDestination: { type: Boolean, default: false },
	northAmericaDestination: { type: Boolean, default: false },
	southAmericaDestination: { type: Boolean, default: false },
	otherDesintation: { type: String, default: '' },
	cbaFriend1: { type: String, default: '' },
	cbaFriend2: { type: String, default: '' },
	cbaFriend3: { type: String, default: '' },
	acceptance: { type: Boolean, default: false },
	dateCreated: { type: Date, default: Date.now },
	downloaded: { type: Boolean, default: false }
});

module.exports = mongoose.model('Submission', SubmissionSchema);