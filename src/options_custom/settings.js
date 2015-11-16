


window.addEvent("domready", function () {


  		function genKeypair() {
  				// The passphrase used to repeatably generate this RSA key.
  				var PassPhrase = "hello world passphrase";
  				// The length of the RSA key, in bits.
  				var Bits = 1024;
  				var RSAkey = cryptico.generateRSAKey(PassPhrase, Bits);
  				// Matt's public key string can then be generated like this:
  				var PublicKeyString = cryptico.publicKeyString(RSAkey);
  				return {'private': RSAkey,
  				 				'public': PublicKeyString}
  				}


  		function getKeypair(callback) {
  			chrome.storage.sync.get(["public", "private"], function (obj) {
  					//console.log(obj);
  					callback(obj);
  			});
  		}



    var settings = new FancySettings("My Extension", "icon.png");


    if (localStorage.getItem('my_fbid')) {

          var myDescription = settings.create({
              "tab": "Information",
              "group": "Account",
              "name": "myDescription",
              "type": "description",
              "text": "You are currently logged in as "+localStorage.getItem('my_fbname')+" (user id: "+localStorage.getItem('my_fbid')+")"
          });

          var btnLogout = settings.create({
              "tab": "Information",
              "group": "Account",
              "name": "btnLogout",
              "type": "button",
              "text": "Logout"
          });

          // ...

          btnLogout.addEvent("action", function () {
            localStorage.removeItem('my_fbid');
            localStorage.removeItem('my_fbname');
            alert("You have been logged out.");
            window.location.reload();
          });

    } else {


          var myDescription = settings.create({
              "tab": "Information",
              "group": "Account",
              "name": "myDescription",
              "type": "description",
              "text": "You are not currently logged in. Click the button below to login, and <strong>then reload this page.</strong>"
          });

          var btnLogin = settings.create({
              "tab": "Information",
              "group": "Account",
              "name": "btnLogin",
              "type": "button",
              "text": "Login with Facebook"
          });

          // ...

          btnLogin.addEvent("action", function () {
            window.open("https://www.facebook.com/dialog/oauth?client_id=1037077632989343&response_type=token&scope=public_profile&redirect_uri=http://www.facebook.com/connect/login_success.html");
          });

    }


    var myDescription2 = settings.create({
        "tab": "Information",
        "group": "Keypair",
        "type": "description",
        "text": "Enter your password below and click the button to generate a brand new keypair. All old messages will be lost forever."
    });

    var inputPassword = settings.create({
        "tab": "Information",
        "group": "Keypair",
        "name": "password",
        "id": "passwordinput",
        "type": "text",
        "text": "password"
    });

    var btnGenKeyPair = settings.create({
        "tab": "Information",
        "group": "Keypair",
        "name": "btnGenKeyPair",
        "type": "button",
        "text": "Generate brand new keypair."
    });

    // ...


    btnGenKeyPair.addEvent("action", function () {

      console.log("doing the event..");

      key = genKeypair();

  		console.log("yur privkey is: " + key['private']);
  		console.log("yur pubkey is: " + key['public']);

      /*
  		getKeypair(function(key) {
  			console.log("got public key: "+ key.public);
  			PublicKeyString = key.public;
  			console.log("got private key: "+ key.private);
  			RSAkey = key.private;
  		});
      */

      chrome.extension.sendMessage({action: 'savekey', public: key['public'], private: key['private'], password: document.getElementById("passwordinput").value }, function(response) {
        console.log("settings saved!");
      });

    });


});
