\
var request = require('request'); 
var cheerio = require('cheerio'); 


console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from motherjones website:" +
            "\n******************************************\n")

request('https://www.motherjones.com/politics', function (error, response, html) {

  
  var $ = cheerio.load(html);

  
  var result = [];

  
  $('a').each(function(i, element){

      
      var title = $(this).text();

      
      result.push({
        title:title,
        link:link
      });
    });

  console.log(result);
});