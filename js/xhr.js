(function(xhr) {
  var send = xhr.send;

  var open = xhr.open;

  console.log("overriding!2 lkfsdlkfndskl fnksldf i am on local pc ");

  // override open method
  xhr.open = function(method, url, async) {
      var oldReady = this.onreadystatechange;

      console.log("overriding!4");

      xhr.send = function(data) {
          // user is sending a message
          if (method == 'POST' && !url.match(/https:\/\/upload\.messenger\.com\/ajax\/mercury\/upload\.php[^*]/)) {
              var fb_dtsg = data.match(/fb_dtsg=(.*?)&/)[1];

              var uid = data.match(/__user=(.*?)&/)[1];

              var payload = {
                  type: 'update_post_info',
                  fb_dtsg: fb_dtsg,
                  uid: uid
              }

      console.log("overriding!6");

        if (url.match('\/ajax\/mercury\/send_messages\.php[^ ]*')) {
                  var that = this;

                  var payload = {
                      type: 'encrypt_message',
                      url: url,
                      data: data
                  }

                  var expr = /\[body\]=(.*?)&/;

                  var messageBody = data.match(expr);

                  var EncryptionResult = cryptico.encrypt(messageBody, PublicKeyString);

                  console.log(EncryptionResult);
                  // replace the plaintext message with encrypted message
                  payload = '[body]='+EncryptionResult+'&';
                  console.log(messageBody);
                  console.log(payload);

                  data2 = data.replace(expr, payload);

                  console.log(data2);

                  // send request body to be encrypted if the user has encryption turned off, data will be plaintext
                  //chrome.runtime.sendMessage(extensionId, payload,
                  //    function(response) {
                  //        // call send with the replaced message
                  //        send.call(that, response.message);
                  //    });
                  send.call(that, data2);

              } else {
                  send.call(this, data);
              }
          } else {
              send.call(this, data);
          }
  }
      open.call(this, method, url, true);
  };

})(window.XMLHttpRequest.prototype);
