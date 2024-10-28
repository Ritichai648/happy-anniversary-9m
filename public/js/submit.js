document.getElementById('quizForm').addEventListener('submit', function (event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const formData = new FormData(this);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert(result.message);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});