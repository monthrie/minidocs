// Initialize MDS
MDS.init(function(msg) {
    // Check if the message is an MDSCOMMS message
    if (msg.event !== "MDSCOMMS") return;

    MDS.log('Received MDSCOMMS message: ' + JSON.stringify(msg));
    
    // Handle the different message types
    handleMessage(msg);
});

// Handle incoming messages
function handleMessage(msg) {
    // Parse the message payload
    var payload = msg.data;
    //log the payload
    MDS.log('Parsed JSON: ' + JSON.stringify(payload));

    // Parse the message property of the payload into a JSON object
    var message = JSON.parse(payload.message);

    // Get the question
    var question = message.data;

    // Send the question to the ChatPDF API
    sendQuestionToChatPDF(question);
}


// Function to send question to the ChatPDF API
function sendQuestionToChatPDF(question) {
    fetch('https://api.chatpdf.com/v1/chats/message', {
        method: 'POST',
        headers: {
            'x-api-key': 'sec_1QzomXQVJQknzDyVmrU9MpHWx1qYwpV7',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sourceId: 'src_TVGQfooMgUAhj8SkrgKSo',
            messages: [
                {
                    role: 'user',
                    content: question
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('answer').innerText = data.content;
    })
    .catch(error => console.error('Error:', error));
}

// Handle form submission
document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var question = document.getElementById('question').value;
    sendQuestionToChatPDF(question);
});

/*
document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var question = document.getElementById('question').value;
    fetch('https://api.chatpdf.com/v1/chats/message', {
        method: 'POST',
        headers: {
            'x-api-key': 'sec_1QzomXQVJQknzDyVmrU9MpHWx1qYwpV7',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sourceId: 'src_TVGQfooMgUAhj8SkrgKSo',
            messages: [
                {
                    role: 'user',
                    content: question
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('answer').innerText = data.content;
    })
    .catch(error => console.error('Error:', error));
});
*/