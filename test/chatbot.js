
document.addEventListener('DOMContentLoaded', function() {
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const messages = document.querySelector('.messages');
    const chatbotPopup = document.getElementById('chatbot-popup');

    // Display welcome message and example keywords
    addMessage('Bot', 'Welcome to the Stock Market Advisor! You can ask me about buying, selling, or holding stocks. For example: "Should I buy stocks?", "Is it a good time to sell stocks?", "Should I hold my stocks?"');

    // Display greeting message when the chatbot pops up
    chatbotPopup.addEventListener('transitionend', function() {
        if (chatbotPopup.style.display === 'block') {
            addMessage('Bot', 'Hello! How can I assist you with your stock market queries today?');
        }
    });

    sendBtn.addEventListener('click', function() {
        const userMessage = chatInput.value;
        if (userMessage.trim() !== '') {
            addMessage('User', userMessage);
            chatInput.value = '';
            getBotResponse(userMessage);
        }
    });

    function addMessage(sender, message) {
        console.log('Adding message:', sender, message); // Debugging statement
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        console.log('User message received:', userMessage); // Debugging statement
        // Enhanced stock market advice logic
        const lowerCaseMessage = userMessage.toLowerCase();
        let botMessage = 'I am not sure how to respond to that. Let me search for more information.';

        if (lowerCaseMessage.includes('stock') && lowerCaseMessage.includes('buy')) {
            botMessage = 'It might be a good time to buy stocks if the market is bullish. Consider looking into companies with strong financials and growth potential.';
        } else if (lowerCaseMessage.includes('stock') && lowerCaseMessage.includes('sell')) {
            botMessage = 'Consider selling stocks if the market is bearish or if you have made a good profit. It is also wise to sell if the company fundamentals are weakening.';
        } else if (lowerCaseMessage.includes('stock') && lowerCaseMessage.includes('hold')) {
            botMessage = 'Holding stocks can be a good strategy if you believe in the long-term potential of the company. Diversification is key to managing risk.';
        } else if (lowerCaseMessage.includes('dividend')) {
            botMessage = 'Dividend stocks can provide a steady income stream. Look for companies with a history of consistent dividend payments.';
        } else if (lowerCaseMessage.includes('etf')) {
            botMessage = 'ETFs can be a great way to diversify your portfolio. They offer exposure to a broad range of assets with lower fees.';
        } else if (lowerCaseMessage.includes('market trend')) {
            botMessage = 'Market trends can help you make informed decisions. Bullish trends indicate rising prices, while bearish trends indicate falling prices.';
        } else {
            // Fetch information from Google Custom Search API
            fetchInformationFromGoogle(userMessage).then(response => {
                addMessage('Bot', response);
            });
            return;
        }

        console.log('Bot response:', botMessage); // Debugging statement
        addMessage('Bot', botMessage);
    }

    function fetchInformationFromGoogle(query) {
        const apiKey = 'YOUR_API_KEY'; // Replace with your Google Custom Search API key
        const searchEngineId = 'YOUR_SEARCH_ENGINE_ID'; // Replace with your search engine ID
        const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${searchEngineId}`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    const firstResult = data.items[0];
                    return `Here is some information I found on the web: <a href="${firstResult.link}" target="_blank">${firstResult.title}</a>`;
                } else {
                    return 'I could not find any information on the web about that.';
                }
            })
            .catch(error => {
                console.error('Error fetching information from Google:', error);
                return 'I encountered an error while searching for information.';
            });
    }
});

