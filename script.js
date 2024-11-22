<script>
document.getElementById("htmlForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve values
    var name = document.getElementsByName('name')[0].value;
    var phone = document.getElementsByName('phone')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var position = document.getElementById('position').value;
    var message = document.getElementsByName('message')[0].value;

    // Get checkbox values as separate entries
    var interests = Array.from(document.getElementsByName('interests'))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => `entry.1830960129=${encodeURIComponent(checkbox.value)}`)
        .join("&");

    // Get selected radio button value (gender)
    var gender = Array.from(document.getElementsByName('gender'))
        .find(radio => radio.checked)?.value || '';

    // Get rating value
    var rating = Array.from(document.getElementsByName('rating'))
        .find(radio => radio.checked)?.value || '';

    // Example data structure
    var formSpecificData = [
        {   //example 
            formUrl: "https://docs.google.com/forms/d/e/form_id_1/formResponse",
            formData: `entry.11111111=${encodeURIComponent(name)}&entry.2222222=${encodeURIComponent(phone)}&entry.3333333=${encodeURIComponent(email)}&entry.444444444=${encodeURIComponent(position)}&${interests}&entry.66666666666=${encodeURIComponent(gender)}&entry.56666666666=${encodeURIComponent(rating)}&entry.555555555555=${encodeURIComponent(message)}`
        },
        {
            formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdV7zQQZ-kvBfJxdBxutGk9HtzIgAT-Q-rIFLu5FWmde5l7hQ/formResponse",
            formData: `entry.855882516=${encodeURIComponent(name)}&entry.1675339736=${encodeURIComponent(phone)}&entry.1646223286=${encodeURIComponent(email)}&entry.59866498=${encodeURIComponent(position)}&${interests}&entry.55562270=${encodeURIComponent(gender)}&entry.547909188=${encodeURIComponent(rating)}&entry.1955326194=${encodeURIComponent(message)}`
        }
    ];

    // Submit data
    formSpecificData.forEach(function (formDataItem) {
        fetch(formDataItem.formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formDataItem.formData,
        }).then(response => {
            showSuccessMessage();
            startCountdown(3); // 3-second countdown
        }).catch(error => {
            console.error("Error submitting form:", error);
        });
    });
});



    function showSuccessMessage() {
        var form = document.getElementById('htmlForm');
        var successMessage = document.getElementById('successMessage');
        form.style.display = 'none';
        successMessage.style.display = 'block';
    }

    function startCountdown(seconds) {
        var countdownElement = document.getElementById('countdown');
        var countdown = seconds;

        countdownElement.innerText = countdown;
        var countdownInterval = setInterval(function () {
            countdown--;

            if (countdown <= 0) {
                clearInterval(countdownInterval);
                resetForm();
            } else {
                countdownElement.innerText = countdown;
            }
        }, 1000);
    }

    function resetForm() {
        var form = document.getElementById('htmlForm');
        var successMessage = document.getElementById('successMessage');

        form.style.display = 'block';
        successMessage.style.display = 'none';

        // Reset form fields
        form.reset();
      location.reload();
      
    }
</script>
