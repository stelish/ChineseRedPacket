/**
 * Created by kells4 on 26/01/2016.
 */
function Confetti(elem) {
    var scope = this;
//canvas init
    var canvas = elem;
    var ctx = canvas.getContext("2d");
//canvas dimensions
    var W = canvas.offsetWidth;
    var H = canvas.offsetHeight;
//snowflake particles
    var mp = 75; //max particles
    var particles = [];
    var colour = ['#c0bb65', '#9a953f', '#cdd28f'];

    scope.init = function(){
        W = canvas.offsetWidth;
        H = canvas.offsetHeight;
        canvas.width = W;
        canvas.height = H;
        for (var i = 0; i < mp; i++) {
            particles.push({
                x: Math.random() * W, //x-coordinate
                y: Math.random() * H, //y-coordinate
                r: Math.random() * 4 + 1, //radius
                d: Math.random() * mp, //density
                color: colour[Math.floor((Math.random() * (4 - 1) + 1))]
            })
        }
        //animation loop
        setInterval(scope.draw, 33);
    };

//Lets draw the flakes
    scope.draw = function() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            ctx.beginPath();
            ctx.fillStyle = p.color;
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fill();
        }
        scope.update();
    };

//Function to move the snowflakes
//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
    var angle = 0;

    scope.update = function() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            //Updating X and Y coordinates
            //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
            //Every particle has its own density which can be used to make the downward movement different for each flake
            //Lets make it more random by adding in the radius
            p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(angle) * 2;

            //Sending flakes back from the top when it exits
            //Lets make it a bit more organic and let flakes enter from the left and right also.
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) //66.67% of the flakes
                {
                    particles[i] = {x: Math.random() * W, y: -10, r: p.r, d: p.d, color: p.color};
                }
                else {
                    //If the flake is exitting from the right
                    if (Math.sin(angle) > 0) {
                        //Enter from the left
                        particles[i] = {x: -5, y: Math.random() * H, r: p.r, d: p.d, color: p.color};
                    }
                    else {
                        //Enter from the right
                        particles[i] = {x: W + 5, y: Math.random() * H, r: p.r, d: p.d, color: p.color};
                    }
                }
            }
        }
        // update canvas height for rolling effect
    }
}