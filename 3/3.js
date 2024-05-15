const chat = document.getElementById('chat');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const locationButton = document.getElementById('locationButton');
const messagesDiv = document.getElementById('messages');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

socket.onopen = function(event) {
    console.log('Соединение установлено');
};

socket.onclose = function(event) {
    console.log('Соединение закрыто');
};

socket.onmessage = function(event) {
    showMessage(event.data, false);
};

function sendMessage(message) {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    } else {
        console.error('Ошибка отправки сообщения: соединение не установлено');
    }
}

function showMessage(message, isUserMessage) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = message;
    messageDiv.classList.add('message');
    if (isUserMessage) {
        messageDiv.classList.add('user-message');
    } else {
        messageDiv.classList.add('server-message');
    }
    messagesDiv.appendChild(messageDiv);
}

sendButton.addEventListener('click', function() {
    const message = messageInput.value.trim();
    if (message) {
        sendMessage(message);
        showMessage(message, true);
        messageInput.value = '';
    } else {
        console.warn('Пустое сообщение');
    }
});

locationButton.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            showMessage(`Ваша геолокация: <a href="${mapLink}" target="_blank">Открыть карту</a>`, true);
        }, () => {
            console.error('Ошибка получения геолокации');
        });
    } else {
        console.error('Геолокация не поддерживается');
    }
});
