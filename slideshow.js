/*eslint-env browser*/


/* In Lab 21 you created a slide show of Zak’s Life. The slides changed from one slide to another and the speed at which each slide rotated was hardcoded as the second parameter in the setInterval() method.

In this part of the assignment you will create functionality that allows the user to set the speed at which the slideshow plays. Here are some things to consider when building out this functionality within the application:


You’ll need to start by adding a set speed button to the web page. It should appear to the right of the Pause button.

When the user clicks the button, a prompt should appear that has the current speed shown and allows the user to change it to a different speed.

Change up the application so that you now have a private variable called speed and the default speed of 2000 should be set for it.

Create 2 new public methods within your createSlideshow() method. One should set the speed variable and the other should get the speed variable. You’ll need to figure out what to do within these methods to get the application to work correctly. 
The second parameter of the setInterval() method will now be set by the speed variable.

*/




/*eslint-env browser*/

var createSlideshow = function () {
    "use strict";
    // PRIVATE VARIABLES AND FUNCTIONS
    var timer, play = true,
        nodes, img, stopSlideShow, displayNextImage, setPlayText, speed = 2000;

    nodes = {
        image: null,
        caption: null
    };
    img = {
        cache: [],
        counter: 0
    };

    stopSlideShow = function () {
        clearInterval(timer);
    };
    displayNextImage = function () {
        if (img.counter === img.cache.length) {
            img.counter = 0;
        } else {
            img.counter += 1;
        }
        var image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.caption.innerHTML = image.title;
    };
    setPlayText = function (btn) {
        if (play) {
            btn.value = "Resume";
        } else {
            btn.value = "Pause";
        }
    };
    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        loadImages: function (slides) {
            var image, i;
            for (i = 0; i < slides.length; i += 1) {
                image = new Image();
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            return this;
        },
        setSpeed: function () {
            stopSlideShow();
            return function () {
                var aux;
                aux = parseInt(window.prompt("Actual speed :" + speed + ". Enter new speed"), 10);
                if (aux > 0) {
                    speed = aux;
                }
            };
        },
        getSpeed: function () {
            return speed;
        },
        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            timer = setInterval(displayNextImage, speed);
            return this;
        },
        createToggleHandler: function () {
            var me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY 'FLAG'
                play = !play;
            };
        }
    };
};

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

// CREATE THE SLIDESHOW OBJECT
var slideshow = createSlideshow();

window.addEventListener("load", function () {
    "use strict";
    var slides = [
        {
            href: "images/backpack.jpg",
            title: "He backpacks in the Sierras often"
        },
        {
            href: "images/boat.jpg",
            title: "He loves his boat"
        },
        {
            href: "images/camaro.jpg",
            title: "He loves his Camaro more"
        },
        {
            href: "images/punk.jpg",
            title: "He used to be in a punk band"
        },
        {
            href: "images/race.jpg",
            title: "He's active "
        }
    ];
    // START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($("image"), $("caption"));
    // PAUSE THE SLIDESHOW
    $("play_pause").onclick = slideshow.createToggleHandler();
    $("speed").onclick = slideshow.setSpeed();
});
