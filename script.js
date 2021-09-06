const app = () => {
    const play = document.querySelector('.play');
    const song = document.querySelector('.song');

    play.addEventListener('click', () => {
        song.play();
        play.src = 'svg/pause.svg';
    });

    function playMusic() {
       
    }
}

app()