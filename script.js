function locoScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locoScroll();



function cursorEffects() {
    var page1Content = document.querySelector("#page1-content")
    var cursor = document.querySelector("#cursor")

    page1Content.addEventListener("mousemove" , function(dets){
        gsap.to(cursor, {
            x:dets.x,
            y:dets.y   
        })

    })

    page1Content.addEventListener("mouseenter" , function(){
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })  

    })

    page1Content.addEventListener("mouseleave" , function(){
        gsap.to(cursor,{
            scale: 0,
            opacity: 0
        })
    })
    
}
cursorEffects()

function page2Animation(){
    gsap.from(".elem h1",{
        y:120,
        stagger:0.25,
        duration: 1,
        scrollTrigger:{
            trigger:"#page2",
            scroller:"#main",
            start:"top 40%",
            end:"top 37%",
            // markers:true,
            scrub: 2
        }
    })
}
page2Animation();

function page4TopAnim(){
  gsap.from(".page4 .page4-top .top-text h3", {
    y: 60,
    scrollTrigger:{
      scroller:"#main",
      trigger:".page4 .page4-top .top-text h3",
      start:"top 100%",
      end:"top 95%",
      duration:.8,
      scrub:1
    }
  })
  gsap.to(".page4-top-border", {
    width: 94+"vw",
    scrollTrigger:{
      scroller:"#main",
      trigger:".page4-top-border",
      start:"top 85%",
      end:"top 80%",
      duration:5,
      scrub:1
    }
  });
  gsap.from(".page4 .page4-bottom .btm-text h2 .up span",{
    y:200,
    scrollTrigger:{
      scroller:"#main",
      trigger:".page4 .page4-bottom .btm-text h2 .up span",
      start:"top 100%",
      end:"top 99%",
      scrub:2,
      stagger:.1,
    }
})
}
page4TopAnim();


function swiper(){
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 10,
    loop: true,
    autoplay: {
      delay: 600,
      disableOnInteraction: false,
    },
  });
}
swiper();
