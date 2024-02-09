function memoryGame(){   
    let max, imgMix, counter, img1, img2, pairs, clickCounter, startTime, soundSwitch;

    const allSounds = {
        pair    : 'sound/mp3/pong.mp3',
        nopair  : 'sound/mp3/spawn.mp3',
        end     : 'sound/mp3/winner.mp3'
    };

    function playSound(path){
        if(soundSwitch){
        const sound = new Audio();
        sound.src = path;

        sound.volume = 0.1;
        sound.play();
        }
    }
    playSound(allSounds.pair);
    
    function initVaris(){
        // Startwerte für  die Variablen setzen
        max             = 36; // Gesamtzahl der Bilder
        imgMix          =  mixMyArray(loadImgSet());
        // console.log(imgMix)
        counter         = 0; // zählt die aufgedeckten Bilder
        img1            = null; // 1. aufgedecktes Bild
        img2            = null; // 2. aufgedecktes Bild
        pairs           = 0;  // zählt die gefundenen Bildpaare
        clickCounter    = 0;  // zählt alle Klicks
        startTime       = null; // SpielStartZeit
        soundSwitch     = false; // Sound ein - aus
        
        
        // für alle weiteren Spiele
        el('#klicks').innerHTML     = '&nbsp;';             // p Element klick Ausgabe
        el('#zeit').innerHTML       = '&nbsp;';             // p Element Zeit Ausgabe    
        el('#start').className      = 'start-passiv';       // Start Button unsichtbar
    }
    
    function createField(){
        
        for (let i = 0; i < max; i ++){
             const img = create('img');
            //const img = new Image();
            img.setAttribute('src','img_1/memory_1.gif');
            img.setAttribute('alt','Memory Image');
            img.setAttribute('data-index',i);
            img.addEventListener('click',gameLogic);
            el('#game').append(img);
            
        }
    }
    
    function loadImgSet(){
        // aus einem Bilder pool von 25 Bildern
        // 8 Stück in ein Array speichern (2 Stück pro Bild)
        const pool = [];
        const set  = [];
        
        // pool mit 25 BilderPfaden füllen
        for (let i = 1 ; i < 26; i ++) {
            const path = `img_1/p_${i}.gif`;
            pool.push(path);
        }

        // set füllen aus pool -- 8 Paare
        for (let i = 0; i < max/2; i ++){
            // 1. zufälliger index aus pool
            const index = Math.floor(Math.random() * pool.length);
            const path = pool.splice(index,1)[0];
            set.push(path);
             set.push(path);
            
        }
        return set; 
    }
    
    function mixMyArray(array){
        const mix = [];
        const le = array.length;
        for(let i = 0; i < le; i ++){
            // 1. zufälligen index suchen
            const index = Math.floor(Math.random() * array.length);
            // WErt aus array löschen
            const path = array.splice(index,1)[0];
            // Wert in mix speichern
            mix.push(path);
        }
        return mix;
    }
  
   function countAllClicks(){
            clickCounter ++;
            let klicks = "click";
            
            if (clickCounter === 1){
                klicks = "click";
            }else{
                klicks = "clicks";
            }
            
            el('#klicks').innerText = `${clickCounter} ${klicks}`;
   }
    
    function setStartTime(){
        // Wenn der Spieler das 1. Mal auf ein Bild klickt
        if (clickCounter === 1){
              startTime = new Date();
        }  
    }
    
    function getGameDuration(){
        const stopTime = new Date();
        const diff = Math.floor((stopTime - startTime)/1000); // Sekunden
        el('#zeit').innerText = `You played ${diff} seconds`; // Ausgabe
    }
    function changeImg(img){
        const index = parseInt(img.getAttribute('data-index'));
        img.src = imgMix[index];
        img.removeEventListener('click',gameLogic);
    }
    
    function gameLogic(){
        playSound(allSounds.klick);

        counter ++;
        countAllClicks();
        setStartTime();
        // 1. Bild
        if (counter === 1){
            img1 = this;
            changeImg(img1);
        }
        // 2. Bild
        if (counter === 2) {
            img2 = this;
            changeImg(img2);
            // Vergleich nur hier
            if (img1.src === img2.src){
                    equalImg();
                    gameOver(); 
                }else{
                    unEqualImg();
            }    
        } 
    }// ENDE gameLogic
    
    function gameOver(){
        if (pairs === max/2){
            playSound(allSounds.end);
            // Spiel- Ende
           // Zeit messen und Ausgabe
            getGameDuration();
             // Alle Bilder tauschen
            group('#game img').forEach((img,index) => {
                img.src = imgMix[index];
            });
            // Start Button sichtbar 
            el('#start').className = 'start-aktiv';
        }  
    }
    
    function equalImg(){

        playSound(allSounds.pair);

        img1.src = 'img_1/wow.gif';
        img2.src = 'img_1/wow.gif';
        counter = 0;
        // Spielende registrieren
        pairs ++;
    }
    
    function unEqualImg(){
        playSound(allSounds.nopair);
        setTimeout(()=> {
            img1.src = 'img_1/memory_1.gif';
            img2.src = 'img_1/memory_1.gif';
            img1.addEventListener('click',gameLogic);
            img2.addEventListener('click',gameLogic);
            counter = 0;
        },400);
    }
    
    function newGame(){
        initVaris();
        
        group('#game img').forEach((img) => {
            // Deckblatt tauschen
            img.src = 'img_1/memory_1.gif';
            img.addEventListener('click',gameLogic);
            
        });
        
    }
    

    //####################################
    initVaris();
    createField();
   el('#start').addEventListener('click',newGame);
   el('#audio').addEventListener('click', function(){
    soundSwitch = !soundSwitch;
    if(soundSwitch){
        this.innerText= 'Sound On';
        this.className='audio-aktiv'
    }else{
        this.innerText= 'Sound Off';
        this.className= 'audio-passiv'
    }
   });
    
} // ENDE memoryGame



memoryGame();