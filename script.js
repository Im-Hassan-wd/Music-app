const app = () => {
    const play = document.querySelector('.play');
    const sound = document.querySelector('.song');
    const outline = document.querySelector('.moving-outline line');
    const image = document.querySelector('.player img');

    //songs
    const songs = document.querySelectorAll('.library button');
    songs.forEach(song => {
        song.addEventListener('click', function() {
            sound.src = this.getAttribute('data-song');
            image.src = this.getAttribute('data-img');
            checkPlaying(sound);
        })
    })
    //get length of outline
    const outlineLength = outline.getTotalLength();
    //duration
    let startPoint = 0;
    let duration = sound.duration * 60;
    let minDur = Math.floor((duration / 60) / 60);
    let secDur = Math.floor((duration / 60) % 60);
    document.querySelector('.length').textContent = minDur + ':' + secDur;

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
        let elapsed = startPoint + currentTime;
        let seconds =Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        document.querySelector('.start').textContent = `${minutes}:${seconds}`;

        // animate the outline
        let progress = outlineLength - (currentTime / (duration/ 60)) * outlineLength;
        // console.log(progress)
        outline.style.strokeDashoffset = progress;

        if (currentTime >= duration){
            sound.pause()
            sound.currentTime = 0;
            play.src = 'svg/play.svg';
        }
    }
}

app();