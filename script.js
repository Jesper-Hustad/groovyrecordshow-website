function handleInputChange(){
    var inputText = document.getElementById('myInput').value;
    var button = document.getElementById('myButton');

    // Check if the input has any text
    if (inputText.trim() !== '') {
        button.style.opacity = 1; // Set opacity to 100%
    } else {
        button.style.opacity = 0.5; // Set opacity to 50%
    }
}

function joinNewsletter(){
    var inputText = document.getElementById('myInput').value;
    
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