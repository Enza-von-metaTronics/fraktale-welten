	
    
    const co = document.querySelector('#canvas');
    const ctx = co.getContext('2d');
    // alle Klone hier hinein
    const spiderCollector = [];
    
    let img;
    
    function loadImage(){
        
        img = new Image();
        
        img.addEventListener('load',spriteAction);
        img.src = 'img/expl2.png';
    }
    
    function spriteAction (){
        // console.log(img)
        
        let pos = {x:0,y:0};
        let animate = false;
        
        const spriteObj = {
            sw : img.width / 8,  //8 Bild auf dem Server
            sh : img.height / 6,
            dx : 100,              //6 canvas
            dy : co.height - 250,
            posx : [],  // Hilfsvariablen Einzelbilder
            posy : [],  // Hilfsvariablen Einzelbilder
            x : 0,      // Hilfsvariablen Einzelbilder
            y : 0,      // Hilfsvariablen Einzelbilder
            index : 0,  // Hilfsvariablen Einzelbilder
            spY : 2,
            size: 1, // große / kleine Spinnen
            init  : function(){
                
                // this.size = Math.random()*2;
                // this.dy = Math.random() * co.height; // Start pos Y Achse
                // this.dx = Math.random() * co.width;  // Start Pos X Achse
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
                
                spiderCollector.push(this);
                
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
                
                // this.dy -= this.spY;
                // 
                // if (this.dy < -150){
                //     this.dy = co.height;
                // }
            }
            
        }
        
        
        // spriteObj.init();
        function klonFabrik(){
            for (let i = 0; i < 1; i ++){
                const klon = Object.create(spriteObj);
                klon.init();
            }
        }
   
        
        function render(){
            ctx.clearRect(0,0,co.width,co.height)
           
                
            animate = requestAnimationFrame(render);  // 60 fps
           
          
            spiderCollector.forEach((spider) => {
                spider.move();
            });
        }
        
        klonFabrik();
        // render();
        
        
        
        
        document.querySelector('canvas')
        .addEventListener('click',function(e){
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            pos.x = x;
            pos.y = y;
            
            
            
            if (!animate){
                render();
            }else{
                
            }
        })
    }
    
    
    loadImage();