const divElm = document.createElement('div');
divElm.classList.add('cursor');

document.body.querySelector('body > main').append(divElm);

let tmrTimeout = null;
let mouseX;
let mouseY;
document.body.addEventListener('mousemove', (eventData)=>{
    clearTimeout(tmrTimeout);
    mouseX = eventData.clientX;
    mouseY = eventData.clientY;
    divElm.style.left = eventData.clientX + "px";
    divElm.style.top = eventData.clientY + "px";
    divElm.style.visibility = 'visible';
    divElm.style.opacity = '1';
    tmrTimeout = setTimeout(()=>{
        divElm.style.opacity = '0';
    }, 30000);

});


document.body.addEventListener('mouseleave', (eventData)=>{
    divElm.style.opacity = '0';
});


class Particle {
    width = 20 + Math.floor((Math.random()* 20));
    height = this.width;
    x = Math.floor(Math.random()* (innerWidth - this.width));
    y = Math.floor(Math.random()* (innerHeight - this.height));
    dx = 10 + (Math.ceil((Math.random() * 10)) *(Math.random() > 0.5? -1:1));
    dy = 10 + (Math.ceil((Math.random() * 10))*(Math.random() > 0.5? -1:1));
    elm;

    constructor(){
        this.elm = document.createElement('div');
        this.elm.style.position = 'absolute';
        this.elm.style.width = `${this.width}px`;
        this.elm.style.height = `${this.height}px`;
        this.elm.style.left = `${this.x}px`;
        this.elm.style.top = `${this.y}px`;

        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        this.elm.style.backgroundColor = `rgb(${r},${g},${b})`;
        this.elm.style.borderRadius = '100%';
        document.body.append(this.elm);
    }

    move(){
        this.collision();
        this.y += this.dy;
        this.x += this.dx;

        if(this.y < 0 || this.y > innerHeight) {
            this.y = 2;
            this.dy = -this.dy;
        }
        if(this.x < 0 || this.x > innerWidth) {
            this.x = 2;
            this.dx = -this.dx;
        }

        if (this.y >= (innerHeight - this.height) || this.y <= 0) this.dy = -this.dy;
        if (this.x >= (innerWidth - this.width) || this.x <= 0) this.dx = -this.dx;
        this.elm.style.top = `${this.y}px`;
        this.elm.style.left = `${this.x}px`;

        let r1 = this.width/2;
        let x1 = this.x + this.width/2;
        let y1 = this.y + this.height/2;
        let distance = Math.sqrt(((mouseX - x1) ** 2) + ((mouseY - y1) ** 2));
        if(distance <= (65 + this.width/2)){
            this.dx = -this.dx;
            this.dy = -this.dy;
            this.x = 10;
            this.y = 10;
        }
        
    }

    collision(){
        const restBalls = this.balls.filter(value => value != this);

        restBalls.forEach(value => {
            const xDif = (this.x + this.width/2) - (value.x + value.width/2) + this.dx; 
            const yDif = (this.y + this.height/2) - (value.y + value.height/2) + this.dy; 

            const hypot = Math.hypot(xDif, yDif);
            if(hypot < (this.width/2 + value.width/2)){
                this.dx = -this.dx;
                this.dy = -this.dy;
                this.x = (xDif) >=0? (this.x - 5) : (this.x + 5);
                this.y = (yDif) >=0? (this.y - 5) : (this.y + 5);
                value.dx = -value.dx;
                value.dy = -value.dy;
            }

        })
    }
}

const particles = [];

for(let i = 0; i< 40; i++) {
    particles.push(new Particle());
}

Particle.prototype.balls = particles.slice();

setInterval(()=> {
    particles.forEach(particle => {
        particle.move();
    });
},100);


