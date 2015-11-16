

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");


		/************************************************************************************
		This is your Page Code. The appAPI.ready() code block will be executed on every page load.
		For more information please visit our docs site: http://docs.crossrider.com
		*************************************************************************************/

		console.log('Hello World');

		// you have to do this.. we can't just include the code here. because the content_Script is executed in a weird way.
		var s = document.createElement('script');
		// TODO: add .js script to web_accessible_resources in manifest.json
		s.src = chrome.extension.getURL('js/xhr.js');
		s.onload = function() {
				this.parentNode.removeChild(this);
		};
		(document.head || document.documentElement).appendChild(s);

		var s = document.createElement('script');
		// TODO: add .js script to web_accessible_resources in manifest.json
		s.src = chrome.extension.getURL('js/cryptico.js');
		s.onload = function() {
				this.parentNode.removeChild(this);
		};
		(document.head || document.documentElement).appendChild(s);






		// ----------------------------------------------------------

	}
}, 10);
});
