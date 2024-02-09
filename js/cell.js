const co = document.querySelector('#canvas');
const ctx = co.getContext('2d');
let animate = false; // animation start-stop
let speed = 200;
const automat = {
    color1      : '#18dbcb',
    color2      : '#1e312f',
    max         : 50,
    abstand     : 5,
    currGen     : [],
    nextGen     : [],
    init(){
        const w = window.innerWidth;
        const h = window.innerHeight - 200;


        co.width = w;
        co.height = h; 
        const wr = Math.floor(w / this.max - this.abstand); // breite
        const hr = wr;
        let xPos = 1;
        let yPos = 1;
        // kästchen - rects
        for(let i = 0; i < this.max; i++){
            const rect = {}
            rect.x = xPos;
            rect.y = yPos;
            rect.w = wr;
            rect.h = wr;
            // alle kästchen gelb
            rect.col = this.color1;
            // in der mitte einer blau
            if( i === this.max/2){
                rect.col = this.color2;
            }
            this.currGen.push(rect);
            // nächstes kästchen berechnen
            xPos += (wr + this.abstand);
            this.draw(rect);
        }
        // console.log(this.currGen)
    },
    setRow(){
        for (let i = 0; i < this.max; i++){

            if(this.nextGen[i]){
                this.currGen[i].col = this.color2
            }else{
                this.currGen[i].col = this.color1
            }
            this.draw(this.currGen[i]);

        }
    },
    update(){

        let left,right,status;
        // left: linker nachbar
        // right : rechter nachbar
        // status : true - false
        // true : color2 - false : color1

         for (let i = 1; i < this.max - 1; i++){
            left = (this.currGen[i - 1].col === this.color2);
            right = (this.currGen[i + 1].col === this.color2);

            status = (left !== right); // true - false
            this.nextGen[i] = status; 
            
         }
         // console.log(this.nextGen)

    },
    draw(rect){
        ctx.fillStyle = rect.col;
        ctx.strokeRect(rect.x,rect.y,rect.w,rect.h);
        ctx.fillRect(rect.x,rect.y,rect.w,rect.h);

        rect.y += rect.h + this.abstand;
        if(rect.y >= co.height){rect.y = 1;
        ctx.clearRect(0,0,co.width,co.height);
        }

    }

}

automat.init();

function changeSpeed(){
    speed = parseInt(this.value);
    document.querySelector('#speed-label')
    .innerText = speed;
}

function render(){
        // animate = requestAnimationFrame(render);
        animate = setTimeout(render, speed);

        automat.update(); // jetzt-status berechnen
        automat.setRow(); // sichtbar machen
}

document.querySelector('#speed')
.addEventListener('input', changeSpeed),

document.querySelector('#btn')
.addEventListener('click', function(){

    if (!animate){
        render();
    } else {
        // cancelAnimationFrame(animate);
        clearTimeout(animate);
        animate = false;
    }

});

// nur für testzwecke
// render();

