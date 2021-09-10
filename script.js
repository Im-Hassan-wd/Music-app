const app = () => {
    const play = document.querySelector('.play');
    const sound = document.querySelector('.player .song');
    const outline = document.querySelector('.moving-outline line');
    const image = document.querySelector('.player img');
    const title = document.querySelector('.title');
    const artist = document.querySelector('.sub-title');

    // library
    const library = document.querySelector('.library');
    const button = document.querySelector('.header button');
    const music = document.querySelector('.music');

    button.addEventListener('click', () => {
        library.classList.toggle('show-library');
    });

    //songs
    const songs = document.querySelectorAll('.library button');
    songs.forEach(song => {
        song.addEventListener('click', function() {
            sound.src = this.getAttribute('data-song');
            image.src = this.getAttribute('data-img');
            title.innerText = this.getAttribute('data-title');
            artist.textContent = this.getAttribute('data-artist');
            checkPlaying(sound);
        });
    });
    
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
        image.style.transform = 'rotate(' + currentTime * 10 + 'deg)';
        image.style.transition = 'all 0.3s linear';


        // duration
        let duration = sound.duration * 60;
        let minDur = Math.floor((duration / 60) / 60);
        let secDur = Math.floor((duration / 60) % 60);
        document.querySelector('.length').textContent = minDur + ':' + secDur;
        // animate the outline
        let progress = outlineLength - (currentTime / (duration/ 60)) * outlineLength;
        outline.style.strokeDashoffset = progress;

        if (currentTime >= (duration) / 60){
            sound.pause()
            sound.currentTime = 0;
            play.src = 'svg/play.svg';
        }
    }
}

app();