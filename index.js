/**
 * Info sur la balise canvas :
 * On utilise l'élément HTML <canvas> avec l'API canvas, 
 * ou l'API WebGL pour dessiner des graphiques et des 
 * animations.
 */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');


// On définit la taille du canvas
canvas.width = 1024;
canvas.height = 576;


context.fillRect(0,0, canvas.width, canvas.height);

// On définit la couleur de remplissage
context.fillStyle = 'black';

const gravity = 0.3;

//On va créer le joueur et l'ennemi. 
class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
    }

    // On va créer une méthode pour dessiner le Sprite
    draw(){
        context.fillStyle = 'red';
        //50 largeur et 50 hauteur
        context.fillRect(this.position.x, this.position.y, this.width, this.height); 
    }

    update(){  
        this.draw();
        
        this.position.x += this.velocity.x;

        //gravity
        this.position.y += this.velocity.y;

        /*position.y = la partie haute de la hitbox donc on doit additionner la hauteur du
        sprite pour avoir la partie basse de la hitbox
        */
        if(this.position.y + this.height + this.velocity.y > canvas.height){
            this.velocity.y = 0;
        }
        else{
            /**
             * On ajoute la gravité à la vitesse verticale si on est pas au sol
             */
            this.velocity.y += gravity;
        }
    }
}

const player = new Sprite({
    position: {x: 0, y: 0},
    velocity: {x: 0, y: 0} //par défaut il bouge pas
});

const ennemy = new Sprite({
    position: {x: 400, y: 0},
    velocity: {x: 0, y: 0} //par défaut il bouge pas
});

const keys = {
    q: {
        pressed: false
    },

    d: {
        pressed: false
    }
};

let lastKey;


/*Une fonction qui gère l'animation en boucle, c'est pour cela qu'elle
s'appelle elle même
*/
function animate(){
    window.requestAnimationFrame(animate);
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    ennemy.update();
   
    player.velocity.x = 0;

    if(keys.q.pressed && lastKey === 'q'){
        player.velocity.x = -1;
    }
    else if(keys.d.pressed && lastKey === 'd'){
        player.velocity.x = 1;
    }

}

animate();

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'q':
            keys.q.pressed = true;
            lastKey = 'q';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        
        
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'q':
            keys.q.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
        
        
    }
});

/*
40:00 in the video
*/