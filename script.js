const app = () => {
    const play = document.querySelector('.play');
    const sound = document.querySelector('.song');
    const outline = document.querySelector('.moving-outline rect');
    const image = document.querySelector('.player img');

    //songs
    const songs = document.querySelectorAll('.library button');
    //get length of outline
    const outlineLength = outline.getTotalLength();
    //duration
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //play song
    play.addEventListener('click', () => {
        checkPlaying(sound);
    });

    //stop and play song
    const checkPlaying = sound => {
        if(sound.paused){
            sound.play();
            play.src = 'svg/pause.svg';
        } else {
            sound.pause();
            play.src = 'svg/play.svg';
        }
    };

    //animate the time
    sound.ontimeupdate = () => {
        let currentTime = sound.currentTime;
        let elapsed = duration - currentTime;
        let seconds =Math.floor(elapsed % 60);
        let minute = Math.floor(elapsed / 60);

        // animate the outline
        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;
    }
}

app();