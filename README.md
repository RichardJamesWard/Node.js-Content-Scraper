# Build a Content Scraper
### Treehouse Techdegree Project #6 - Build a Content Scraper

Imagine you work for a price comparison website. You’ve been given the task to create a Node.js command line application that goes to an ecommerce site to get the latest prices and save them to a spreadsheet (CSV format). You will write the application as if the spreadsheet will be used by another application to populate a database. The application you build will run once every day. You should use npm modules to assist you in the project. You have to research and use npm packages that will help you scrape a website and create a CSV file.

# Project Requirements

### Command Line Interface and Dependency Management
- [x] Project includes a package.json file containing dependencies to run node scraper.js
- [x] Running npm install installs relevant dependencies
- [x] The scraper.js file can be run with the npm start command
### Folder Generation
- [x] Program creates onedata folder if that folder doesn’t already exist. If the folder does exist, the program does nothing.
### Research npm packages
- [x] Chosen scraping and CSV packages meet the following requirements on npm:
•	1,000 downloads
•	Updated in the last 6 months
### Crawling
- [x] The project uses thehttp://shirts4mike.com/shirts.phpURL as an entry point to look through the links on the page to find 8 shirts
### Scraping and Saving Data
- [x] Project scrapes the product title, price, image and url, and all information is correct and in the correct place
- [x] A CSV is successfully saved to the ‘data’ folder in this format: ‘YYYY-MM-DD.csv’, e.g. ‘2016-12-30.csv’.
- [x] Column headers are in this order: Title, Price, ImageURL, URL, Time
### Overwriting Data
- [x] If the script is run twice, the program overwrites the data. The file contains the data from the second call.
### Error Handling
- [x] The program displays a human-friendly error (not just the original error code) when it cannot connect to http://shirts4mike.com
- [x] Program logs errors in a scraper-error.log` file.
- [x] New errors append to the end of the file with a timestamp, e.g. [Tue Feb 16 2016 13:00:55 GMT-0800 (PST)] <error message>

# Appraiser Comments
Well done on completing this project. Next project is project 7 and it is a pretty challenging one but a really cool one. I hope you enjoy it and don't forget to reach out on slack should you need any help with it. happy coding
