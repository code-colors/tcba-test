'use strict';

describe('Service: submission', function () {

  // load the service's module
  beforeEach(module('cbaholidaysApp'));

  // instantiate service
  var submission;
  beforeEach(inject(function (_submission_) {
    submission = _submission_;
  }));

  it('should do something', function () {
    expect(!!submission).toBe(true);
  });

});
