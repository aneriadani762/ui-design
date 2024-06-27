document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Simulate a successful login
        window.location.href = 'dashboard.html';
    });

    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            const message = chatbotInput.value.trim();
            if (message) {
                appendMessage('User', message);
                chatbotInput.value = '';
                processChatbotResponse(message);
            }
        }
    });

    function appendMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.textContent = `${sender}: ${message}`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function processChatbotResponse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('stock') && lowerCaseMessage.includes('advice')) {
            appendMessage('Chatbot', 'Sure! Which stock are you interested in?');
        } else if (lowerCaseMessage.includes('apple')) {
            appendMessage('Chatbot', 'Apple (AAPL) is currently strong. It is a good long-term investment.');
        } else if (lowerCaseMessage.includes('microsoft')) {
            appendMessage('Chatbot', 'Microsoft (MSFT) has shown steady growth. It is recommended to hold.');
        } else if (lowerCaseMessage.includes('tesla')) {
            appendMessage('Chatbot', 'Tesla (TSLA) is volatile. It is better for short-term trading.');
        } else if (lowerCaseMessage.includes('market') && lowerCaseMessage.includes('trend')) {
            appendMessage('Chatbot', 'The market trend is bullish. It is a good time to invest.');
        } else {
            appendMessage('Chatbot', 'I can help with stock advice. Ask me about a specific stock or market trend.');
        }
    }
});
