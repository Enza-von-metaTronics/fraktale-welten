const co = document.querySelector('#canvas');
const ctx = co.getContext('2d');


// ############# PONG LEVEL 1 ###############

const collector = {};
let index = 0;
// {prop: 20} -- {'0' : 20}

let animate = false;

let tCode = false; //speichert, welche taste gedrückt

let img; // expl.png
let klonFabrik2;

const ball = {

    x : 0,          // circle X
    y : 0,          // circle Y
    r : 16,         // circle Radius
    xI : 100,
    yI : 130,
    wI : 35,
    hI : 35,
    dx : 0, // nach rechts
    dy : 0, // nach unten
    spX: 5,
    spY: 2,
    img : null,
    init:function(){
        this.img = new Image();
        this.img.src= 'img/ball.png';
        // console.log(this.img)
    },

    move : function(){

        // rechts - links

        if (this.xI<0){this.dx=0}
        if (this.xI>co.width){this.dx=1}
        if (this.yI<0){this.dy=0}
        if (this.yI>co.height){this.dy=1}

        // AnPassung des Bildes an den Kreis
        this.x = this.xI+this.wI/2;
        this.y = this.yI+this.hI/2;

        // kollision mit paddle
        if(kollision(this, paddle)){
            this.dy = 1 //nach oben
        }

        // oberkante erreicht
        if(this.yI < 0){
            this.dy = 0; //nach unten
        }

        // fällt uten durch
        // neuer einwurf x-achse random
        // muss runter fallen
        if(this.yI > co.height){
            this.yI = 150;
            this.dy = 0;
            this.xI = Math.ceil(Math.random()*(co.width - 200)) + 100;
        }

        // Bewegung
        if(this.dx === 0){this.xI += this.spX};
        if(this.dx === 1){this.xI -= this.spX};

        if(this.dy === 0){this.yI += this.spY}
        if(this.dy === 1){this.yI -= this.spY}
        



        this.draw();
    },
    draw : function(){
        ctx.drawImage(this.img,this.xI,this.yI);
        // console.log(this)
    }

};

// ------------ paddle --------------

const paddle = {
    x : 10,
    y : 350,
    w : 120, // kann geändert werden! - level 1
    h : 10,
    col : 'darkblue',
    spX : 10,
    move : function(){
        if (tCode === 'ArrowLeft' && this.x > 0){this.x -= this.spX}
        if (tCode === 'ArrowRight' && this.x < co.width - this.w){this.x += this.spX}
        this.draw();
    },
    draw : function(){
        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
};

// -----------------------------


const protoBrick = {
    x : 30,
    y : 10,
    w : 60,
    h : 15,
    col : 'crimson',
    id : 0,
    init : function(){
        this.id = index;
        collector[index]=this;
        // { '0' : {}, '1' : {} ...}
        index++;
    },
    draw : function(){

        // kollision
        if(kollision(ball , this)){
            ball.dy = 0;

            //brick löschen
            delete collector[this.id];
            // woran merke, daß alle weg sind
            const keys = Object.keys(collector)
            if (keys.length === 0){
                ball.yI = 150;
                klonFabrik();
            }
        }

        ctx.fillStyle = this.col;
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
};

function kollision(circle,rect){
    const distX = Math.abs(circle.x - rect.x-rect.w/2);
    const distY = Math.abs(circle.y - rect.y-rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    const dx = distX-rect.w/2;
    const dy = distY-rect.h/2;

    return (dx*dx+dy*dy<=(circle.r*circle.r));

}; // ENDE kollision

function klonFabrik(){
    let klon, x = 15, y = 10;
    for(let i = 0; i < 40; i++){  //anzahl der bricks
        klon = Object.create(protoBrick);
        klon.init();


        klon.x=x;
        klon.y=y;

        x += 90;
        if (x > co.width){
            x = 15;
            y += 30;
        }
    }
}
function render(){
    animate = requestAnimationFrame(render);
    ctx.clearRect(0,0,co.width,co.height);

    for(let i in collector){
        collector[i].draw();
    }

    paddle.move();
    ball.move();

}

function checkKeyDown(e){
    tCode = e.key;
    console.log(tCode);
}
function checkKeyUp(){
    tCode = false;
}

klonFabrik();

// -------- explosion --------

function loadImage(){
        
    img = new Image();
    
    img.addEventListener('load',spriteAction);
    img.src = 'img/expl.png';
}

function spriteAction (){
     console.log(img)
    
    let pos = {x:0,y:0};
    let animate = false;
    
    const spriteObj = {
        sw : img.width / 8,  // Bild auf dem Server
        sh : img.height / 6,
        dx : 100,              // canvas
        dy : co.height - 250,
        posx : [],  // Hilfsvariablen Einzelbilder
        posy : [],  // Hilfsvariablen Einzelbilder
        x : 0,      // Hilfsvariablen Einzelbilder
        y : 0,      // Hilfsvariablen Einzelbilder
        index : 0,  // Hilfsvariablen Einzelbilder
        spY : 2,
        size: 1, 
        init  : function(){
            
            this.spY = (Math.random() * 5) +2;   // speed 2 - 7
            for (let i =1; i < (6 * 8); i ++){
                this.posx.push(this.x);
                this.posy.push(this.y);
                this.x += this.sw;
                if (i % 4 === 0){
                    this.x = 0;
                    this.y += this.sh;
                }
            }
        },
        move  : function(){
            ctx.drawImage(
                img,
                this.posx[this.index],
                this.posy[this.index],
                this.sw,
                this.sh,
                pos.x -  this.sw/2,
                pos.y - this.sw/2,
                this.sw * this.size ,
                this.sh * this.size 
                
            );
            this.index ++;
            if (this.index === this.posx.length){
                this.index = 0;
                cancelAnimationFrame(animate);
                animate = false;
            }
        }
    } 
      spriteObj.init();
    //  function klonFabrik2(){
    //     for (let i = 0; i < 1; i ++){
    //         const klon2 = Object.create(spriteObj);
    //         klon2.init();
    //         console.log(klon2)
    //     }
    // }

    
    // function render2(){
    //     ctx.clearRect(0,0,co.width,co.height)
       
            
     //    animate = requestAnimationFrame(render2);  // 60 fps
       
      
    //     spiderCollector.forEach((spider) => {
            // spider.move();
     //   };
    
    
   klonFabrik(); 
    
    document.querySelector('#canvas')
        .addEventListener(kollision,function(e){
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            pos.x = x;
            pos.y = y;
            
                       
            if (!animate){
                render2();
            }else{
                
            }
        })
    }
    
    
    loadImage();

// ------------ buttons ------------------

ball.init();
document.addEventListener('keydown', checkKeyDown);
document.addEventListener('keyup', checkKeyUp);


document.querySelector('#loopmode')
.addEventListener('click',function(){
    ctx.clearRect(0,0,co.width,co.height);
    paddle.w=878;
    paddle.draw();
});
document.querySelector('#level1')
.addEventListener('click',function(){
    ctx.clearRect(0,0,co.width,co.height);
    paddle.w=120;
    paddle.draw();
});
document.querySelector('#level2')
.addEventListener('click',function(){
    ctx.clearRect(0,0,co.width,co.height);
    paddle.w=80;
    paddle.draw();
});
document.querySelector('#level3')
.addEventListener('click',function(){
    ctx.clearRect(0,0,co.width,co.height);
    paddle.w=40;
    paddle.draw();
});


document.querySelector('#btn')
.addEventListener('click',function(){
    if (!animate){
        render();
    }else{
        cancelAnimationFrame(animate);
        animate = false;
    }
    
});

document.querySelector('#loopmode')
.addEventListener('click',function(){
    if (!animate){
        render();
    }else{
        cancelAnimationFrame(animate);
        animate = false;
    }
    
});


















