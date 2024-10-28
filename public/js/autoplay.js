
function PlayMusic() {
    const audio = new Audio('../audio/songs.mp3')

    audio.play()
}

window.onload = PlayMusic()