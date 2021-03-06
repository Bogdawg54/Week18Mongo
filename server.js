var express = require('express');
var app = express();

var request = require('request');
var cheerio = require('cheerio');

var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];

var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});

app.get('/', function(req, res) {
  res.send("Hello world");
});

app.get('/all', function(req, res) {
  db.scrapedData.find({}, function(err, found) {
    if (err) {
      console.log(err);
    } 
    else {
      res.json(found);
    }
  });
});

app.get('/scrape', function(req, res) {
  request('https://www.motherjones.com/politics', function(error, response, html) {
    var $ = cheerio.load(html);
    $('.title').each(function(i, element) {
      var title = $(this).children('a').text();
      var link = $(this).children('a').attr('href');

      if (title && link) {
        db.scrapedData.save({
          title: title,
          link: link
        }, 
        function(err, saved) {
          if (err) {
            console.log(err);
          } 
          else {
            console.log(saved);
          }
        });
      }
    });
  });

  res.send("Scrape Complete");
});


app.listen(3000, function() {
  console.log('App running on port 3000!');
});