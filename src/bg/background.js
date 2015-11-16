// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL(scriptName);
    scriptEl.addEventListener('load', callback, false);
    document.head.appendChild(scriptEl);
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == 'savekey') {
        chrome.storage.sync.set({'public': request.public, 'private': request.private}, function() {
        // Notify that we saved.
        console.log("settings saved!" + request.public + request.private);

        console.log(request.password + " is ur pass");

        loadScript('js/cryptojs/rollups/sha256.js');
        /*
        var sha256 = CryptoJS.createHash("sha256");
        sha256.update(request.password, "utf8");//utf8 here
        var pw = sha256.digest("base64");
        */
        var pw = CryptoJS.SHA256(request.password);


        console.log(pw.toString() + " is ur encrypted pass");

        var dict = { 'fbid': localStorage.getItem('my_fbid'),
          'auth': pw,
          'pubkey': request.public};
          console.log(dict);
        $.post( "http://easypgp.herokuapp.com/api/v1/setkey",
                dict,
                function( data ) {}
              );
      });
    }
    else if (request.action == 'getkey') {

        console.log("settings saved!" + publ + priv);
        $.get( "http://easypgp.herokuapp.com/api/v1/getkey/"+request.fbid,
                function( data ) {
                  /*
                  // send a msg back and say "ok now send the msg" ?
                  // or somehow use local storage to achieve this?

                  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                      console.log(response.farewell);
                    });
                  });

                  */

                }
              );

    }
    else {
    	chrome.pageAction.show(sender.tab.id);
      sendResponse();
    }
  });


var successURL = 'www.facebook.com/connect/login_success.html';

function onFacebookLogin(){

    var worked = false;
    //if (!localStorage.getItem('my_fbid')) {
    chrome.tabs.query({}, function(tabs) { // get all tabs from every window
      for (var i = 0; i < tabs.length; i++) {
        //console.log("logging");
        //console.log(tabs);
        //console.log(tabs[i]);
        console.log(tabs[i].url);
        if (tabs[i].url.indexOf(successURL) !== -1) {
          // below you get string like this: access_token=...&expires_in=...
          var params = tabs[i].url.split('#')[1];

          // in my extension I have used mootools method: parseQueryString. The following code is just an example ;)
          var accessToken = params.split('&')[0];
          accessToken = accessToken.split('=')[1];

          localStorage.setItem('accessToken', accessToken);
          console.log("got access token:" + accessToken);
          worked = true;
          chrome.tabs.remove(tabs[i].id);

          $.get( "https://graph.facebook.com/me/?access_token="+accessToken, function( data ) {
            console.log("user name is " +data.name);
            console.log("user fb id is "+data.id);
            localStorage.setItem('my_fbname', data.name);
            localStorage.setItem('my_fbid', data.id);
          });
        }
      }
    });
    /*
    chrome.tabs.query({}, function(tabs) { // get all tabs from every window
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].url.indexOf('chrome-extension') !== -1) {
          var code = 'window.location.reload();';
          chrome.tabs.executeScript(tabs[i].id, {code: code});
          console.log("RELOADING SETTINGS PAGE");
        }
      }
    });
    */
    //}
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);
