//  GET OUR ELEMENTS
const player = document.querySelector('.player');
console.log(player);

const video = player.querySelector('.viewer');
console.log(`video: ${video}`);

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const fullscreenBtn = player.querySelector('.fullscreen__button');


// build our functions
function togglePlay() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('update the button')
}

function skip() {
    // console.log("skipping");
    // currentTime = video.currentTime;
    // console.log(this)
    // if(this.dataset.skip === "-10") {
    //     console.log('i am 10');
    //     currentTime = currentTime -10;
    // } 
    // if(this.dataset.skip === "25") {
    //     console.log("i am 25")
    //     currentTime = currentTime + 25;
    // }
    // video.currentTime = currentTime;
    console.log(video.currentTime);

    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

function handleProgress() {
    console.log("handle progress working")
    const percent = (video.currentTime / video.duration) * 100;
    console.log(`percent working: ${percent}`);
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    // const percent = (event.layerX * 100) / 640;
    // progressBar.style.flexBasis = `${percent}%`;
}
function makeFullscreen(e) {
    if(video.webkitSupportsFullscreen) {
        videowebkitEnterFullscreen();
        return;
    }
    video.requestFullscreen();
}

// hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreenBtn.addEventListener('click', makeFullscreen);