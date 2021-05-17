/* Function executes upon loading the document...*/
$(document).ready(() => {


    $('.pagelink').click(function () {
        var anchor = $(this).attr('dest');
        $('html, body').animate(
            {
                scrollTop: $('#' + anchor).offset().top
            },
            400
        );
    });

    const scrollElements = document.querySelectorAll(".js-scroll");

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
    
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };
    
    const elementOutofView = (el) => {
      const elementTop = el.getBoundingClientRect().top;
    
      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };
    
    const displayScrollElement = (element) => {
      element.classList.add("scrolled");
    };
    
    const hideScrollElement = (element) => {
      element.classList.remove("scrolled");
    };
    
    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else if (elementOutofView(el)) {
          hideScrollElement(el)
        }
      })
    }
    
    window.addEventListener("scroll", () => { 
      handleScrollAnimation();
    });


    /*
    * - Contact me AJAX 
    * - Taken from formspree.io
    */
    var form = document.getElementById("contact-form");
    async function handleSubmit(event) {
        event.preventDefault();
        var status = document.getElementById("contact-form-status");
        var data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            status.innerHTML = "Thanks for your submission!";
            form.reset()
        }).catch(error => {
            status.innerHTML = "Oops! There was a problem submitting your form"
        });
    }
    form.addEventListener("submit", handleSubmit)

    $(".iconify")[0].style = "";
    var partJson = 
    {
      "particles": {
        "number": {
          "value": 15,
          "density": {
            "enable": true,
            "value_area": 500,
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#FF0000"
          },

        },
        "opacity": {
          "value": 0.5,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 8,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 3,
            "size_min": 1,
            "sync": true
          }
        },
        "line_linked":{
          "enable":false
        },
        "move": {
          "enable": true,
          "bounce":true,
          "speed": 1,
          "direction": "top",
          "random": false,
          "straight": false,
          "out_mode": "none",
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity":{
        "events":{
            "onhover":{
                "enable":false
            }
        }
      },
      
      "retina_detect": false,
      "config_demo": {
        "hide_card": false,
        "background_color": "#b61924",
        "background_image": "",
        "background_position": "150% 150%",
        "background_repeat": "no-repeat",
        "background_size": "cover"
      }
    };
  


    var jsonUri = "data:text/plain;base64,"+window.btoa(JSON.stringify(partJson));

    particlesJS.load("particles-js", jsonUri);
});

/*
* - Code for enabling/disabling scrolling when the mobile menu is open
* - Taken from: https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily/4770059
*/

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { supportsPassive = true; }
    }));
} catch (e) { }

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}