
// Request is designed to be the simplest way possible to make http calls
var request = require('request');
// The cheerio NPM module provides a server-side jQuery implementation and allows us to parse HTML with JavaScript on the server-side
var cheerio = require('cheerio');
// json2csv converts json into csv with column titles and proper line endings
var json2csv = require('json2csv');
// moment is lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates
var moment = require("moment");
// The Node.js file system module allows you to work with the file system on your computer
var fs = require("fs");
// Our entry point
var url = 'http://shirts4mike.com/shirts.php'
// Empty arrays to store links to product pages & information about individual shirts
var productLinks = [];
var productInfo = [];

// error function
 function printError(error) {
  console.log(`Whoops! Something went wrong...(${error}) `);
  // New errors append to the end of the file with a timestamp
  fs.appendFile("scraper-error.log", new Date() + error.message + "\r\n", function(err) {
    if (err) throw err;
    console.log("This error has been logged to the content scraper error log");  
  });
};

// The structure of our request call
// The first parameter is our URL
// The callback function takes 3 parameters, an error, response status code and the html
request(url, function(error, response, body){

    // First check to make sure no errors occurred when making the request
    if (!error && response.statusCode == 200) {
      
        // Next, utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(body);

        // Loop through links to idividual product prages and push their href values to productLinks array
        $('a[href*="shirt.php?id="]').each(function() {
        var href = $(this).attr('href');
        var path = `http://shirts4mike.com/${href}`;
        productLinks.push(path);
        });

        // Scrape relevent information from each product prage in our productLinks array...
        for (var i = 0; i < productLinks.length; i++) {
            request(productLinks[i], function (error, response, body) {

                if (!error && response.statusCode == 200) { 
             
                    var $ = cheerio.load(body);

                    // Define the variables we're going to capture
                    var title = $('title').text();
                    var price = $('.price').text();
                    var img = $('.shirt-picture img').attr('src');

                    // Create empy shirts object to store t-shirt info
                    var shirts = {};

                    shirts.Title = title;
                    shirts.Price = price;
                    shirts.ImageURL = `http://shirts4mike.com/${img}`;
                    shirts.Time = moment().format("MMMM Do YYYY, h:mm:ss a");
                    shirts.URL = response.request.uri.href;
                    
                    // Push individual t-shirt information to our productInfo array
                    productInfo.push(shirts);

                    // define path
                    var dir = "./data";

                    // If directory does not already exist
                    if(!fs.existsSync(dir)) {
                      // create directory
                      fs.mkdirSync(dir);
                    }

                    // json2csv converts json into csv with column titles and proper line endings.
                    json2csv({ data: productInfo, fields: ['Title', 'Price', 'ImageURL', 'URL', 'Time']}, function(error, csv) {
                        // If file already exists writeFile will overwrite it
                        fs.writeFile( dir + "/shirts4mike price list.csv", csv, function() {
                            if (error) throw error;
                                console.log('Download complete');
                        });
                    });
                } else {
                    printError(error);
                } 
            });
        }
    } else {
        printError(error);
    }
});


