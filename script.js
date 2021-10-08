const app = () => {
    const play = document.querySelector('.play');
    const sound = document.querySelector('audio');
    const outline = document.querySelector('.moving-outline line');
    const spin = document.querySelector('.player img');
    const title = document.querySelector('.title');
    const artist = document.querySelector('.sub-title');
    const mute = document.querySelector('.mute');
    const right = document.querySelector('.right');

    // library
    const library = document.querySelector('.library');
    const button = document.querySelector('.header button');
    const music = document.querySelector('.music');

    button.addEventListener('click', () => {
        library.classList.toggle('show-library');
        music.classList.toggle('translate');
    });

    music.addEventListener('click', (e) => {
        if (e.target.tagName != 'BUTTON' && e.target.tagName !='IMG' && e.target.tagName !='svg') {
            library.classList.remove('show-library');
            music.classList.remove('translate');
        }
    });

    //songs
    const songs = document.querySelectorAll('.library button');
    songs.forEach(song => {
        song.addEventListener('click', function() {
            sound.src = this.getAttribute('data-song');
            spin.src = this.getAttribute('data-img');
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

    // mute song
    mute.addEventListener("click", () => {
        muteSong(sound);
    });

    // x2 song
    right.addEventListener("click", () => {
        fastForward(sound);
    });

    //mute and un mute song 
    const muteSong = sound => {
        if(sound.muted === false) {
            sound.muted = true;
            mute.querySelector('img').src = 'svg/unmute.svg';
        } else {
            sound.muted = false;
            mute.querySelector('img').src = 'svg/mute.svg';
        }
    }

    const fastForward = sound => {
        sound.currentTime * 2;
    }
    

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


    //animate the time and update the lenght and interver of each songs
    sound.ontimeupdate = () => {

        let startPoint = 0;
        let currentTime = sound.currentTime;
        let elapsed = startPoint + currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        document.querySelector('.start').textContent = `${minutes}:${seconds}`;
        spin.style.transform = 'rotate(' + currentTime * 10 + 'deg)';
        spin.style.transition = 'all 0.2s linear';


        // duration
        let duration = sound.duration * 60;
        let minDur = Math.floor((duration / 60) / 60);
        let secDur = Math.floor((duration / 60) % 60);
        document.querySelector('.length').textContent = minDur + ':' + secDur;


        // animate the outline
        let progress = outlineLength - (currentTime / (duration/ 60)) * outlineLength;
        outline.style.strokeDashoffset = progress;

        if (currentTime >= (duration) / 60){
            // sound.pause();
            sound.currentTime = 0;
            play.src = 'svg/play.svg';
            sound.play();
        }
    }
}

app();