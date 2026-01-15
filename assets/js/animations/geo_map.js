const geo_map = container => {
    if (window.innerWidth > 768) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".geo_map",
          start: 'top 30%',
          // end: 'bottom 0%',
          // markers: true,
          toggleActions: "restart none none reverse",
          // scrub: true,
          // pin: true
        },
        onComplete: () => { }
      });
      var geo_map = document.querySelector(".geo_map");
      return tl
        .from(geo_map.querySelector("#map_bg"), { opacity: 0, scale: .8, transformOrigin: "center center", duration: 1, ease: "power3.inOut" })
        .from(geo_map.querySelectorAll("#pins >  *"), { duration: .3, autoAlpha: 0, scale: 3, transformOrigin: 'center center', ease: 'power3.easeOut', stagger: .04 })
        .fromTo(geo_map.querySelectorAll("#pins >   *"), 1, { scale: 1 }, { scale: 1.3, duration: .5, ease: "power1.inOut", transformOrigin: "center", repeat: -1, yoyo: true, stagger: .08 })
    }
  };
  export default geo_map;