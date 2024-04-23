const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
  // f to use fs module. Call it everytime you need to 'serve' a file
  const readWrite = (file, contentType) => {
    fs.readFile(file, function (err, data) {
      res.writeHead(200, { 'Content-Type': contentType });
      res.write(data);
      res.end();
    });
  };
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  const extName = path.extname(page);
  console.log(page);
  if (page == '/') {
    readWrite('index.html', 'text/html');
  }
  else if (page == '/otherpage') {
    readWrite('otherpage.html', 'text/html');
  }
  else if (page == '/otherotherpage') {
    readWrite('otherotherpage.html', 'text/html');
  }
  else if (page == '/api') {
    if ('student' in params) {
      if (params['student'].toLowerCase().includes('papa john')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          response: "You mean dominos, right...",
          audioResponse: "../audio/leon_get_the_beep_out.mp3"
        }
        res.end(JSON.stringify(objToJson));
      } else if ((params['student'] == 'leon')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          name: params['student'].toUpperCase(),
          status: "Boss Man",
          currentOccupation: "Baller"
        }
        res.end(JSON.stringify(objToJson));
      } else {
        let randomNumber = Math.floor(Math.random() * 8);
        const audioResponses = {
          
          'Yuh!': '../audio/yuh.mp3',
          "Let's Go!": '../audio/letsgo.mp3',
          'First tryyy!': '../audio/first-try.mp3',
          "That's wild.": '../audio/thatswild.mp3',
          'What?!': '../audio/what.mp3',
          'You got got... 🦆': '../audio/quack.mp3',
          "Who's gonna carry the boats and logs??": '../audio/boatslogs.mp3',
          'Eeyyyy!!': '../audio/smalleyy.mp3',
        }


        res.writeHead(200, { 'Content-Type': 'application/json' });
        const responseToReturn = Object.keys(audioResponses)[randomNumber]
        const objToJson = {
          response: responseToReturn,
          audioResponse: audioResponses[responseToReturn]
        }
        res.end(JSON.stringify(objToJson));
      }
    }
  }
  else if (page == '/css/style.css') {
    readWrite('css/style.css', '')
  } else if (page == '/js/main.js') {
    readWrite('js/main.js', 'text/javascript');
  }
  else if (page == '/images/leonthegenie.jpg') {
    readWrite('images/leonthegenie.jpg', 'image/jpg');
  }
  else if (extName == '.mp3') {
    console.log("page", page);

    readWrite(`${page.slice(1)}`, 'audio/mpeg')

  }
  else {
    figlet(`PAPA LEON SAYS: GO BACK!`, {
              font: "Standard",
              horizontalLayout: "fitted",
              verticalLayout: "default",
              width: 60,
              whitespaceBreak: true,
            }, function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
