function handleInputChange(){
    var inputText = document.getElementById('tlemail').value;
    var button = document.getElementById('myButton');

    // Check if the input has any text
    if (inputText.trim() !== '') {
        button.style.opacity = 1; // Set opacity to 100%
    } else {
        button.style.opacity = 0.5; // Set opacity to 50%
    }
}

function joinNewsletter(){
    var inputText = document.getElementById('tlemail').value;
    
    // check that input text is valid email
    if (inputText.trim() !== '' && validateEmail(inputText)) {
        alert('Thank you for joining our newsletter!');
    } else {
        alert('Please enter a valid email address');
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}





async function getGistTextContent(gistId){
    const data = await fetch("https://api.github.com/gists/" + gistId)
    return Object.values((await data.json()).files)[0].content
}

// var gist_id = "53e1780a5a68fe9281cfbbc9820d381f"
// (async () => console.log(await getGistTextContent("53e1780a5a68fe9281cfbbc9820d381f")))();



async function sendContact(ev) {
    ev.preventDefault();

    const senderEmail = document.getElementById('nameInput').value;
    const senderMessage = document.getElementById('messageInput').value;

    const webhookBody = {
      embeds: [{
        title: 'New Song Request',
        fields: [
          { name: 'Name', value: senderEmail },
          { name: 'Song', value: senderMessage }
        ]
      }],
    };

    const webhookUrl = 'https://discord.com/api/webhooks/1178973102420541521/h83f7Vy2VMtdx9Ir0i13djXrjxJ6w4ti6elxiycWE3x60eGu2oSS_i1iT3b5IoZ_Q1JT';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookBody),
    });
    const result = response.ok
    const msg = result ? 'Song request sent successfully!' : 'Sorry, something went wrong';
    alert(msg);
  }