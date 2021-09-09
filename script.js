const app = () => {
    const play = document.querySelector('.play');
    const sound = document.querySelector('.player .song');
    const outline = document.querySelector('.moving-outline line');
    const image = document.querySelector('.player img');

    // library
    const library = document.querySelector('.library');
    const button = document.querySelector('.header button');
    const music = document.querySelector('.music');

    button.addEventListener('click', () => {
        library.classList.toggle('show-library');
    });

    //songs
    
    //get length of outline
    const outlineLength = outline.getTotalLength();

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
            play.querySelector('img').src = 'svg/pause.svg';
        } else {
            sound.pause();
            play.querySelector('img').src = 'svg/play.svg';
        }
    };

    //animate the time
    sound.ontimeupdate = () => {
        let startPoint = 0;
        let currentTime = sound.currentTime;
        let elapsed = startPoint + currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        document.querySelector('.start').textContent = `${minutes}:${seconds}`;
        // duration
        let duration = sound.duration * 60;
        let minDur = Math.floor((duration / 60) / 60);
        let secDur = Math.floor((duration / 60) % 60);
        document.querySelector('.length').textContent = minDur + ':' + secDur;
        // animate the outline
        let progress = outlineLength - (currentTime / (duration/ 60)) * outlineLength;
        // console.log(progress)
        outline.style.strokeDashoffset = progress;

        if (currentTime >= (duration) / 60){
            sound.pause()
            sound.currentTime = 0;
            play.src = 'svg/play.svg';
        }
    }
}

app();