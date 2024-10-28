
function startCountdown() {
    let countdown = 15; // 10 seconds countdown
    const countdownElement = document.getElementById('countdown');
    const audio = new Audio('../audio/danger.mp3');

    const playSoundAndCountdown = () => {
        audio.play(); // เล่นเสียง
        countdownElement.textContent = countdown;
        countdown--;

        if (countdown < 0) {
            clearInterval(timer);
            window.location.href = 'https://www.pornhub.com'; // Redirect ไปที่ google.com
        }
    };

    const timer = setInterval(playSoundAndCountdown, 1000); // อัปเดตทุกๆ 1 วินาที
    playSoundAndCountdown(); // เริ่มนับถอยหลังและเล่นเสียง // Update every second
}

// Start the countdown when the page loads
window.onload = startCountdown;