'use strict'

const Fs = require('fs');
const request = require('request');

request.post({
  url: 'http://192.168.1.14:8080/mail',
  body: {
    email: 'jeanbaptiste@richardet.fr',
    attachments: [
      {
        content: Fs.readFileSync('www/img/dague_1.jpg', 'base64'),
        encoding: 'base64',
        filename: 'img1.jpg'
      },
      {
        content: Fs.readFileSync('www/img/forge.png', 'base64'),
        encoding: 'base64',
        filename: 'img2.png'
      }
    ]
  },
  json: true
}, (err, res, body) => {
  console.log(err, body);
});
