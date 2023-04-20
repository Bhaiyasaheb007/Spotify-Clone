console.log("Welcome to soptify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "Ankhon Mein Teri ", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Khuda Jaane", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Beete Lamhein", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Kya Mujhe Pyaar Hai", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Make Some Noise For The Desi Boyz", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sajde", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Dil Ibaadat", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Sach Keh Raha Hai Deewana", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tu hi Meri Shab Hai", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Zara sa", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
];

songItems.forEach((element, i) =>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
})


// audioElement.play();

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    // console.log("time update");
    //update seekbar
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;
});
// handle progressbar events
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) /100;
})
//handle play pause click
masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})

function makeAllPlays () {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
       
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        masterSongName.innerText = songs[songIndex].songName;

        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0;
    }
    else{
        songIndex +=1;

    }
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove("fa-play-circle");
    document.getElementById(`${songIndex}`).classList.add("fa-pause-circle");

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 9;
    }
    else{
        songIndex -=1;

    }

    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove("fa-play-circle");
    document.getElementById(`${songIndex}`).classList.add("fa-pause-circle");

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});