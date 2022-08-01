"use strict";
// $(window).on("load", function () {

// });
$(document).ready(function () {
  if (localStorage.getItem("popState") != "shown") {
    const tl = gsap.timeline();
    tl.fromTo(
      ".start-overlay",
      {
        y: "0",
        top: 0,
        opacity: 1,
      },
      {
        y: "-60",
        duration: 0.3,
        stagger: 0.25,
        delay: 0.3,
      }
    );
    tl.to(".start-overlay", {
      y: "-100%",
      duration: 1,
      opacity: 0,
      delay: 0.1,
      ease: "Expo.easeInOut",
    });
    localStorage.setItem("popState", "shown");
  } else {
    // DELETE THIS ELSE ON PRODUCTION
    $(".start-overlay").hide();
  }
});

// var hasPlayed = sessionStorage.getItem("hasMyAnimationPlayed");

// if (!hasPlayed) {
//   TweenMax.to(foo, 1, {
//     x: 100,
//     onComplete: function () {
//       sessionStorage.setItem("hasMyAnimationPlayed", true);
//     },
//   });
// }

let pageTransition = () => {
  var timeline = gsap.timeline();

  timeline.to("header", {
    zIndex: 1,
  });

  timeline.to(".page-transition", {
    duration: 0.3,
    height: "100%",
    top: "0%",
  });

  timeline.to(".page-transition", {
    duration: 0.8,
    height: "100%",
    top: "100%",
    delay: 0.3,
  });

  timeline.set(".page-transition", {
    top: "-100%",
  });
};
let mainAnimation = () => {
  var timeline = gsap.timeline();

  timeline.from(" .navbar-brand, .navbar-nav li, .header-btn", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    delay: 0.8,
  });
};

let delay = (n) => {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
};

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1000);
        done();
      },

      async enter(data) {
        mainAnimation();
      },

      async once(data) {
        mainAnimation();
      },
    },
  ],
});

AOS.init();

// jquery class toggle
$(window).scroll(function () {
  if ($(this).scrollTop() > 50) {
    $("nav").addClass("header-nav-activate");
  } else {
    $("nav").removeClass("header-nav-activate");
  }
});

// dropzone started
//to enable full window
var lastTarget = null;

window.addEventListener("dragenter", function (e) {
  // drag start
  // unhide our red overlay
  showWrapper();
  lastTarget = e.target; // cache the last target here
});

window.addEventListener("dragleave", function (e) {
  // user canceled

  if (e.target === lastTarget || e.target === document) {
    hideWrapper();
  }
});

window.addEventListener("dragover", function (e) {
  //to stop default browser act
  e.preventDefault();
});

window.addEventListener("drop", function (e) {
  e.preventDefault();
  hideWrapper();

  // if drop, we pass object file to dropzone
  var myDropzone = Dropzone.forElement(".dropzone");
  myDropzone.handleFiles(e.dataTransfer.files);
});

function hideWrapper() {
  document.querySelector(".wrapper").style.visibility = "hidden";
  document.querySelector(".wrapper").style.opacity = 0;
}

function showWrapper() {
  document.querySelector(".wrapper").style.visibility = "";
  document.querySelector(".wrapper").style.opacity = 0.5;
}

// var myModal = new bootstrap.Modal(document.getElementById("aboutUsModal"));
// myModal.show();
