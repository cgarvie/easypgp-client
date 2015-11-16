// SAMPLE
this.i18n = {
    "settings": {
        "en": "Settings",
        "de": "Optionen"
    },
    "search": {
        "en": "Search",
        "de": "Suche"
    },
    "nothing-found": {
        "en": "No matches were found.",
        "de": "Keine Übereinstimmungen gefunden."
    },



    "information": {
        "en": "Information",
        "de": "Information"
    },
    "login": {
        "en": "Login",
        "de": "Anmeldung"
    },
    "password": {
        "en": "Password:",
        "de": "Passwort:"
    },
    "x-characters": {
        "en": "6 - 12 characters",
        "de": "6 - 12 Zeichen"
    },
    "x-characters-pw": {
        "en": "10 - 18 characters",
        "de": "10 - 18 Zeichen"
    },
    "logout": {
        "en": "Logout",
        "de": "Abmeldung"
    },
    "enable": {
        "en": "Enable",
        "de": "Aktivieren"
    },
};
if (localStorage.getItem('my_fbid')) {
  this.i18n['description'] = {"en": "You are currently logged in as "+localStorage.getItem('my_fbname')+" (user id: "+localStorage.getItem('my_fbid')+")"}
} else {
  this.i18n['description'] = {"en": "You are not currently logged in. <a href=\"https://www.facebook.com/dialog/oauth?client_id=1037077632989343&response_type=token&scope=public_profile&redirect_uri=http://www.facebook.com/connect/login_success.html\">Login with Facebook</a>"}
}
