API_TEST
========

This is a test API deployment for the Providing for Peacekeeping Database. The application is deployed with Node.js server script. The script uses Mongoose to connect to MongoDB locally and define a series of data models. Express.js is used to define the routes used by the api to get data. Routes are a series of GET requests defined below. The API can be access through [server dns]/ppp_api.

*	**ppp_api/aggregates/[contribution type]** returns all monthly aggregates of contributions by type. Data is returned based on contribution type specification as an object array containing "date" and "value" keys with associated values. Dates are retured as YYYY-MM-DD.

*	**ppp_api/missions/[mission name]** returns mission specific data (country, country id, hq, & hq geo location). Can return full object array of all UN PK missions or search for specific mission.

*	**ppp_api/countries/[country]** returns country specific data (country name, continent, un region, capital, capital geo location, & a variety of group membership flags for RO's etc.). Can return the full object array of all countries or search by specific country ISO 3 id.

*	**ppp_api/contributions/[country]** returns all contribution data as an object array of country-date observations. Can return the full array or a subset based on country ISO 3 id. Country-date objects is made up of basic info (country name, region, date, and continent) as well as and object array of contributions. Contributions object array is made up of a series of loosely typed objects containing contributions for each mission contributed as well as one object for total monthly contribution. Keys include totals and by type where contribution exists and are further disaggregated by gender as a sub-object when that data became available.

*	**ppp_api/search?...** allows for querying on basic contributor group membership. Queries "countries" collection to return an array of countries matching search criteria and applies that array to a query on the contributions collection.


Dependencies
------------
*	[Express](https://www.npmjs.org/package/express "Express") - web framework
*	[Mongoose](https://www.npmjs.org/package/mongoose "Mongoose") - MongoDB connector
*	[BodyParser](https://www.npmjs.org/package/body-parser "BodyParser") - parsing middleware



Planned Functionality
---------------------

*	Search by date or range
*	Search by specific mission contributed to
*	search for records with specific types of contributions


Install & launch
-----------------

Install mongodb on Mac OSX, for example with `brew install mongodb`, then follow the instructions

> To have launchd start mongodb at login:
    ln -sfv /usr/local/opt/mongodb/*.plist ~/Library/LaunchAgents
Then to load mongodb now:
    launchctl load ~/Library/LaunchAgents/homebrew.mxcl.mongodb.plist
Or, if you don't want/need launchctl, you can just run:
    mongod --config /usr/local/etc/mongod.conf

To launch:
`node server.js`
and click on the URL provided.

