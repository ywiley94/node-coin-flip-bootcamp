const http = require('http'); 
const fs = require('fs') // access file system
const url = require('url');// able to get that url
const path = require("path");
const querystring = require('querystring');
const figlet = require('figlet')


const server = http.createServer(function(req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
      fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
      
    }else if (page == '/api') {
        let random = Math.ceil(Math.random() * 2) === 1 ? 'heads' : 'tails'
        if('student' in params){
          
          if(params['student'] == random){
            res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              name: "leon",
              status: "Boss Man",
              currentOccupation: "Baller",
              result: 'winner'
            }
            res.end(JSON.stringify(objToJson));

          }//student = leon
          else if(params['student'] !== random){
            res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = {
              name: "unknown",
              status: "unknown",
              currentOccupation: "unknown",
              result: 'loser'
            }
            res.end(JSON.stringify(objToJson));
          }//student != leon
        }//student if
      }
    else if (page == '/css/style.css'){
        fs.readFile('css/style.css', function(err, data) {
          res.write(data);
          res.end();
        });
        } else if (page == '/js/main.js'){
        fs.readFile('js/main.js', function(err, data) {
          res.writeHead(200, {'Content-Type': 'text/javascript'});
          res.write(data);
          res.end();
        });
    }
    else if (page == '/images/heads.png'){
        fs.readFile('images/heads.png', function(err, data) {
          res.writeHead(200, {'Content-Type': 'image/png'});
          res.write(data);
          res.end();
        });
    }else if (page == '/images/tails.png'){
        fs.readFile('images/tails.png', function(err, data) {
          res.writeHead(200, {'Content-Type': 'image/png'});
          res.write(data);
          res.end();
        });
    } 
    else {
        figlet('404!!', function(err, data) {
          if (err) {
              console.log('Something went wrong...');
              console.dir(err);
              return;
          }
          res.write(data);
          res.end();
        });
      }
})
server.listen(8000)

// Requiring module
// const express = require('express');
  
// // Creating express object
// const app = express();
  
// // Defining port number
// const PORT = 3000;                  
  
// // Function to serve all static files
// // inside public directory.
// app.use(express.static('public'));  
// app.use('/images', express.static('images')); 
  
// // Server setup
// app.listen(PORT, () => {
//   console.log(`Running server on PORT ${PORT}...`);
// })