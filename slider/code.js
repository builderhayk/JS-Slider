

let isFree = true;
let gallary = document.getElementById("gallary");
let images = document.getElementsByClassName("imageS");

gallary.addEventListener("mousewheel", MouseWheelHandler, false);

function MouseWheelHandler(e)
{
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if (isFree) {
        if (delta == 1) {
            toLeft();
        } else {
            toRight();
        }
    }
}


var isDown = false;
var position = {
    X: 0, Y: 0
};

for(var i = 0; i < images.length; i++) {
    images[i].onmousedown = function (e) {
        isDown = true;

        position.X = e.clientX;
        position.Y = e.clientY;
    }
};


for(var i = 0; i < images.length; i++) {
    images[i].onmouseup = function () {
        isDown = false;
    }
};


for(var i = 0; i < images.length; i++) {
    images[i].onmousemove = function (e) {
        if (isDown) {
            if (position.X < e.clientX) {
                toRight();
            } else {
                toLeft();
            }
            isDown = false;
        }
    };
}



function starter(slideshow=false,interval="5000") {
    var gallary = document.getElementById("imageList");
    var images = gallary.children;

    for(var i = 0; i < images.length; i++) {
        images[i].style.display = "none";
    }
    images[0].style.display = "block";
    if(slideshow){
        setInterval(toRight,interval);
    }
}



function toRight(interval=".7s") {
    if(isFree) {
        isFree = false;
        var gallary = document.getElementById("imageList");
        var images = gallary.children;

        for (var i = 0; i < images.length; i++) {
            if (images[i].style.display == "block") {

                images[i].style.animation = "anmRightClose"+interval;

                images[i].addEventListener("animationend", function _doSmth1() {
                    images[i].style.display = "none";
                    images[i].removeEventListener("animationend", _doSmth1, true);
                    isFree = true;
                }, true);

                if (i < images.length - 1) {
                    images[i + 1].style.display = "block";
                    images[i + 1].style.animation = "anmRightOpen"+interval;
                } else {
                    images[0].style.display = "block";
                    images[0].style.animation = "anmRightOpen"+interval;
                }

                break;
            }
        }
    }
}



function toLeft(interval=".5s") {

    if(isFree) {
        isFree = false;
        var gallary = document.getElementById("imageList");
        var images = gallary.children;

        for (var i = 0; i < images.length; i++) {
            if (images[i].style.display == "block") {

                images[i].style.animation = "anmLeftClose"+interval;
                images[i].addEventListener("animationend", function _doSmth2() {
                    images[i].style.display = "none";
                    images[i].removeEventListener("animationend", _doSmth2, true);
                    isFree = true;
                }, true);

                if (i > 0) {
                    images[i - 1].style.display = "block";
                    images[i - 1].style.animation = "anmLeftOpen"+interval;
                } else {
                    images[images.length - 1].style.display = "block";
                    images[images.length - 1].style.animation = "anmLeftOpen"+interval;
                }

                break;
            }
        }
    }
}



