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
            sourceId: 'src_lDKlw6iNMRufHui6jfHQ5',
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
