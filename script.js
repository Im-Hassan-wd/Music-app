const app = () => {
    const play = document.querySelector('.play');
    const sound = document.querySelector('audio');
    const slider = document.querySelector('.control-slider');
    const thumbnail = document.querySelector('.player img');
    const title = document.querySelector('.title');
    const artist = document.querySelector('.sub-title');
    const mute = document.querySelector('.mute');
    const start = document.querySelector('.start');
    const next = document.querySelector(".next");
    const songs = document.querySelectorAll('.library button');

    // next songs generate
        //music
    let musics = [
        "hollow.mp3",
        "Keep Going.mp3",
        "Rainy-Nights.mp3",
        "in-and-out.mp3",
        "nothing-really-matters.mp3",
        "pay-up.mp3",
        "sanctuary.mp3",
        "lazarus.mp3",
        "disconnect.mp3"
    ];
        //images
    let thumbnails = [
        "hollow.jpeg",
        "keep-going.jpg",
        "rainy-night.jpeg",
        "in-and-out.jpg",
        "nothing.jpeg",
        "pay-up.jpeg",
        "sanctuary.jpeg",
        "disconnect.jpeg",
        "himalaya.jpeg"
    ];
        //titles
    let titles = [
        "Hollow",
        "Keep Going",
        "Rainy Night",
        "In And Out Of Love",
        "Nothing really matters",
        "Pay up",
        "Sanctuary",
        "In A Cabin By The Lake",
        "Disconnect"
    ]
        //artist
    let artists = [
        "Ecepta",
        "Sworn",
        "Azaleh",
        "The Eastern Plain",
        "Astroblk",
        "Astroblk",
        "Aviscerall",
        "Lazarus Moment",
        "Victoriya"
    ]

    // get length of slider
    let sliderLength = slider.max;
    slider.value = sliderLength;
    let currentTime = 0;

    // library
    const library = document.querySelector('.library');
    const button = document.querySelector('.header button');
    const musicPage = document.querySelector('.music');

    // event listerners
    button.addEventListener('click', showLibrary);
    musicPage.addEventListener('click', (e) => closeLibrary(e));
    // slider.addEventListener("change", (e) => fastForward(e));
    //play song
    play.addEventListener('click', () => checkPlaying(sound));
    // mute song
    mute.addEventListener("click", () => muteSong(sound));
    //next song 
    next.addEventListener("click", () => playNext());

    //functions 
    function closeLibrary(e) {
        if (e.target.tagName != 'BUTTON' && e.target.tagName !='IMG' && e.target.tagName !='svg') {
            library.classList.remove('show-library');
            musicPage.classList.remove('translate');
        }
    }
    function showLibrary(){
        library.classList.toggle('show-library');
        musicPage.classList.toggle('translate');
    }

    function fastForward(e){
        slider.value = e.target.value;
        console.log(slider.value);
        console.log(e.target.value);
    }


    //songs
    songs.forEach((song,e) => {
        song.addEventListener('click', function() {
            sound.src = this.getAttribute('data-song');
            thumbnail.src = this.getAttribute('data-img');
            title.textContent = this.getAttribute('data-title');
            artist.textContent = this.getAttribute('data-artist');
            checkPlaying(sound);
            sound.muted = false;
        });
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

    const playNext = () => {
        // index
        let index = Math.floor(Math.random() * musics.length);
        const nextSong = musics[index];

        //music, thumbnail, title, artist
        sound.src = "music/" + nextSong;
        thumbnail.src = "img/" + thumbnails[index];
        title.textContent = titles[index];
        artist.textContent = artists[index];
        sound.play();
        play.querySelector('img').src = 'svg/pause.svg';
    }


    //animate the time and update the lenght and interver of each songs
    sound.ontimeupdate = (e) => {

        // fastForward(e);

        //setting songs time
        let startPoint = 0;
        currentTime = sound.currentTime
        let elapsed = startPoint + currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        //outputing the current time
        start.textContent = `${minutes}:${seconds}`;
        thumbnail.style.transform = 'rotate(' + currentTime * 10 + 'deg)';
        thumbnail.style.transition = 'all 0.2s linear';


        // duration
        let duration = sound.duration * 60;
        let minDur = Math.floor((duration / 60) / 60);
        let secDur = Math.floor((duration / 60) % 60);
        //outputing the current song length
        document.querySelector('.length').textContent = minDur + ':' + secDur;


        // animate the outline
        let progress = sliderLength - (currentTime / (duration/ 60)) * sliderLength;
        slider.value = progress;

        if (currentTime >= (duration) / 60){
            // sound.pause();
            sound.currentTime = 0;
            play.src = 'svg/play.svg';
            sound.play();
        }
    }
}



app();