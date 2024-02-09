
const el=(css)=>document.querySelector(css);

//--------------
// globale variablen

const legalKeys='qwertzuisdfghj';
let sound; //button sound object
// undefined

const randomSound = [
    "sound/mp3/pong.mp3",
    "sound/mp3/spawn.mp3",
    "sound/mp3/winner.mp3"
]

const allSounds={
    'q':'sound/harp/A_Maj.mp3',
    'w':'sound/harp/A_min.mp3',
    'e':'sound/harp/A7.mp3',
    'r':'sound/harp/Bb_maj.mp3',
    't':'sound/harp/C7.mp3',
    'z':'sound/harp/D_Maj.mp3',
    'u':'sound/harp/D_min.mp3',
    'i':'sound/harp/D7.mp3',
    's':'sound/harp/E_Maj.mp3',
    'd':'sound/harp/F_Maj.mp3',
    'f':'sound/harp/G_Maj.mp3',
    'g':'sound/harp/G_min.mp3',
    'h':'sound/harp/G7.mp3',
    'j':'sound/harp/pE7.mp3'
};

// let sound = new Audio();
//--------------------------
// funktionen
// if(bedingung) { anweisung }

function playAudio(path){
    // virtuelles HTML Audio Element
     const sound = new Audio();
    // const sound = document.createElement('audio');
    sound.src = path;
    sound.play();
}

function keyUp(e){
    const keyCode=e.key;
    if(legalKeys.includes(keyCode)){
    el(`#${keyCode}`).className='passiv';        
    }
}

function keyDown(e){
    const keyCode=e.key;    
    if(legalKeys.includes(keyCode)){
    playAudio(allSounds[keyCode]);
    el(`#${keyCode}`).className='aktiv';        
    }
}
// alle html-eigenschaften immer klein schreiben
//---------------------------

function audioStartRandom(){
    if(sound){
        sound.pause();
    }    
    sound = new Audio();
    const le = randomSound.length;
    // zufälliger index
    const index = Math.floor(Math.random()*le);
    //zufälliger sound wird gewählt
    sound.src=randomSound.indexwww;
    sound.play();
}

// Audio mit Button Steuerung
function audioStart(){
    sound = new Audio();
    sound.src='sound/mp3/atmen.mp3';
    sound.play();
}

function audioPause(){
    if(sound){
        sound.pause();
    }
}

//-------------------------
// Zuweisungen - Ausführungen
el('#start').addEventListener('click', audioStart);
el('#pause').addEventListener('click', audioPause);


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);