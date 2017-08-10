# cbaholidays
cbaholidays.com.au microsite

* `npm install`
* `bower install`
* `grunt serve`

## For Deployments
* `mkdir dist/`
* `git remote add heroku git@heroku.com:think-cba-microsite-test.git`
* `sudo grunt build`
* `grunt buildcontrol:heroku`

Then upgrade staging pipeline to production through heroku.

* Staging: [http://think-cba-microsite-test.herokuapp.com](http://think-cba-microsite-test.herokuapp.com)
* Production Heroku: [http://think-cba-microsite.herokuapp.com](http://think-cba-microsite.herokuapp.com)
* Production URL: [http://cbaholidays.com.au](http://cbaholidays.com.au)
