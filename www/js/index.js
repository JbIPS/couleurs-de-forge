/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var FOLDER_NAME = "Photos";
var STORAGE_KEY = "cdf_pics";

var currentStage = null;
var pictures = [];

function onError(err) {
  window.alert("Error: ", err.code || err);
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

      // Set background
      var bkg = document.getElementById("atelier");
      bkg.classList.add(window.structure[0].class);

      // Add exit strategy
      var timer;
      bkg.addEventListener("touchstart", function() {
        timer = window.setTimeout(function() {
          KioskPlugin.isInKiosk(function(isInKiosk){
            console.log("Is it in Kiosk?", isInKiosk);
            if(isInKiosk)
              KioskPlugin.exitKiosk();
            });
          }, 2000);
      });
      bkg.addEventListener("touchend", function(){
        if(timer)
          window.clearTimeout(timer);
      });

      var stages = document.getElementsByClassName('stage');
      for(var idx = 0; idx < stages.length; idx++) {
        stages.item(idx).addEventListener("touchstart", this.launchStage);
      }

      // Init camera

      document.getElementById("camBtn")
      .addEventListener("touchstart", function () {
        navigator.camera.getPicture(function(pic) {
          if(document.location.hash === '')
            document.location.hash = currentStage;
          pictures.push(pic);
        }, console.error, {
          quality: 80,
          destinationType: Camera.DestinationType.DATA_URL
        });
      });

      document.getElementById("exitBtn").onclick = function() {
        var toHide = document.getElementsByClassName('onStage');
        for(var i = 0; i < toHide.length; i++) {
          toHide.item(i).style.visibility = 'hidden';
        }
        document.getElementById(document.location.hash.substr(1))
        .classList.add("hiddenStage");
        document.getElementById('home').style.visibility = 'visible';
      }

      document.getElementById("closeBtn").onclick = function() {
        if(this.style.opacity !== '0') {
          document.getElementById("mailPopin").style.visibility = 'visible';
          document.getElementById("overlay").style.visibility = 'visible';
          this.style.opacity = '0';
        } else {
          document.getElementById('end').style.visibility = 'hidden';
          document.getElementById('overlay').style.visibility = 'hidden';
          this.style.opacity = '1';
        }
      };

      document.getElementById("returnBtn").onclick = function() {
        document.getElementById("mailPopin").style.visibility = 'hidden';
        document.getElementById('closeBtn').style.opacity = '1';
      };

      // Send mails and reset
      document.getElementById("endBtn").onclick = function(){
        document.getElementById("mailPopin").style.visibility = 'hidden';
        var end = document.getElementById('end');
        emailAddress = document.getElementById('email').value
        end.style.visibility = 'visible';
        if(pictures.length === 0 || emailAddress === '') return;

        var overlay = end.getElementsByClassName('overlay').item(0);
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '.95';
        var attachments = pictures.map(function(pic, index) {
          return {
            filename: 'Couleurs de forge ' + index + '.png',
            content: pic,
            encoding: 'base64'
          };
        });
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'http://192.168.1.14:8080/mail', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function() {//Call a function when the state changes.
          if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            overlay.style.visibility = 'hidden';
            end.querySelector('span').style.display = 'initial';
            pictures = [];
          }
        }
        xhr.send(JSON.stringify({
          email: emailAddress,
          attachments: attachments
        }));

        [].forEach.call(document.getElementsByClassName("unlocked"), function(el) {
          el.classList.remove("unlocked");
        });
      }

      // Init nav
      var next = document.getElementsByClassName("topnav next").item(0);
      initNav(document.getElementsByClassName("topnav previous").item(0),
        next, bkg, 1024);
      //next.style.visibility = "visible";

      var fileTransfer = new FileTransfer();
      var loadedData = 0;
      var totalData = 0;

      var onMediaLoaded = function(spot, url){
        var elem = document.createElement('div');
        elem.id = spot.id;
        elem.classList.add('key');
        if(spot.locked)
          elem.classList.add('locked');
        elem.style.cssText = "left: " + spot.position.x + "px; top: " + spot.position.y + 'px;';
        elem.addEventListener("touchstart", function(e){
          e.preventDefault();
          switch(spot.type) {
            case "text":
              app.playSound(url, spot.content.text);
              break;
            case "movie":
              app.playVideo(url);
              break;
            case "slideshow":
              app.playSideshow(spot.content);
          }
          if(spot.unlock) {
            for(var unlocked, i = 0; unlocked = spot.unlock[i]; i++) {
              document.getElementById(unlocked).classList.add("unlocked");
            }
          }
        }, false);
        document.getElementById(spot.stageId).appendChild(elem);
        if(url && ++loadedData == totalData) app.start();
      }

      for(var stage, i = 0; stage = window.structure[i]; i++) {
        for(var spot, j = 0; spot = stage.spots[j]; j++) {
          var myFilename;
          switch(spot.type) {
            case "text":
              myFilename = spot.content.sound;
              break;
            case "movie":
              myFilename = spot.content;
              break;
          }
          spot.stageId = stage.id;
          if(myFilename) {
            totalData++;
            var myUrl = cordova.file.applicationDirectory + "www/media/" + myFilename;
            var filePath = cordova.file.dataDirectory + myFilename;
            fileTransfer.download(encodeURI(myUrl), filePath, function(entry) {
              onMediaLoaded(this, entry.nativeURL);
            }.bind(spot), (function(error) {
              console.error("Asset download error: source " + error.source);
            }), true, {
              headers: {
                Authorization: "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
              }
            });
          } else onMediaLoaded(spot);
        }
      }

      // Init player
      app.initPlayer();
      app.initReader();
    },

    start: function() {
      //console.log("START");
      // Reset storage
      window.localStorage.removeItem(STORAGE_KEY);
    },

    initPlayer: function(){
      document.querySelector("#player .close").addEventListener('touchstart', app.closePlayer, false);
      document.getElementById("overlay").addEventListener('touchstart', app.closePlayer, false);

      var video = document.getElementById("video");
      video.addEventListener('transitionend', function(e){
        if(this.currentTime != 0){
          this.currenTime = 0;
        } else {
          this.play();
        }
      }, false);

      video.addEventListener('ended', app.closePlayer, false);
      video.addEventListener('touchstart', function(){
        video.paused ? video.play() : video.pause();
      });
    },

    initReader: function() {
      var reader = document.getElementById("reader");
      reader.getElementsByClassName("close").item(0).addEventListener('touchstart', app.closeReader, false);
      document.getElementById("overlay").addEventListener('touchstart', app.closeReader, false);

      var audio = document.getElementById('audio');
      var content = document.getElementById("content");
      content.addEventListener('transitionend', function(e){
        console.log("Start audio", audio.src);
        if(this.currentTime != 0){
          audio.currenTime = 0;
        } else {
          audio.play();
        }
      }, false);

      initNav(reader.getElementsByClassName("previous").item(0),
        reader.getElementsByClassName("next").item(0),
        document.getElementById("slider"), 810);
    },

    launchStage: function(event) {
      var toShow = document.getElementsByClassName('onStage');
        for(var elem, i = 0; elem = toShow.item(i); i++) {
          if(!elem.classList.contains('previous'))
            elem.style.visibility = 'visible';
        }
      var targetedStage = event.target.parentElement.href.split('#').pop();
      //document.getElementById(targetedStage).style.visibility = 'visible';
      document.getElementById(targetedStage).classList.remove("hiddenStage");
      document.getElementById('home').style.visibility = 'hidden';
      document.location.hash = currentStage = targetedStage;
    },

    playSound: function(url, text) {
      var audio = document.getElementById('audio');
      var reader = document.getElementById('reader');
      var contentZone = document.getElementById('slider');

      contentZone.innerHTML = "";

      contentZone.innerHTML = text;
      reader.classList.add('visible');

      audio.src = url;
      audio.play();
    },

    playSideshow: function(content) {
      var audio = document.getElementById('audio');
      var reader = document.getElementById('reader');
      var contentZone = document.getElementById('slider');

      contentZone.innerHTML = "";

      var template = document.getElementById('image_tile');
      var contentWidth = 0;
      content.forEach(function(src){
        template.content.firstElementChild.firstElementChild.src = src.img;
        template.content.firstElementChild.lastElementChild.innerHTML = src.legend;
        contentZone.appendChild(document.importNode(template.content, true));
        contentWidth += 810;
      });
      contentZone.style.width = contentWidth + "px";
      reader.getElementsByClassName("next").item(0).style.visibility = "visible";

      reader.classList.add('visible');
    },

    playVideo: function(url){
      var video = document.getElementById('video');
      var player = document.getElementById('player');

      video.src = url;
      player.classList.add('visible');
    },

    closePlayer: function(){
      document.getElementById('video').pause();
      document.getElementById('player').classList.remove('visible');
    },

    closeReader: function() {
      document.getElementById('audio').pause();
      var reader = document.getElementById('reader');
      var contentZone = document.getElementById('slider');
      reader.classList.remove('visible');
      contentZone.innerHTML = '';
      contentZone.removeAttribute('style');
      var nav = reader.querySelectorAll(".previous, .next");
      for(var a = 0, arrow; arrow = nav[a]; a++){
        arrow.style.visibility = "hidden";
      }
    }
};

app.initialize();

function initNav(prev, next, target, step) {
  prev.addEventListener('touchstart', function(){
    var left = target.style.left;
    left = left == "" ? 0 : parseInt(left.substr(0, left.length-2)) + step;
    target.style.left = left + "px";
    if(left === 0) prev.style.visibility = "hidden";
    else prev.style.visibility = "visible";
    next.style.visibility = "visible";
  });
  next.addEventListener('touchstart', function(){
    var left = target.style.left;
    left = left == "" ? -step : parseInt(left.substr(0, left.length-2)) - step;
    target.style.left = left + "px";
    var max = window.getComputedStyle(target).width;

    if(left === -parseInt(max.substr(0, max.length-2)) + step) next.style.visibility = "hidden";
    else next.style.visibility = "visible";
    prev.style.visibility = "visible";
  });
}
