const headerAnimations = container => {
    if (document.getElementById('header_images_sm')) {
      // console.log('headerAnimations.js loaded')
      var images_sm = gsap.utils.toArray('#header_images_sm > div');
      images_sm.forEach((item, i) => {
        var number = Math.floor(Math.random() * 5) + 4;
        var rotate = Math.floor(Math.random() * 4) + 1;
        if (i % 2 === 0) {
          number = number * -1;
          rotate = rotate * -1;
        }
        // var start = { y: number * (i + 1), x: number * (i + 1), rotate: rotate, duration: 1, ease: "power1.inOut", transformOrigin: "center" };
        var start1 = { y: 0, x: 0, rotate: 0, duration: 1, ease: "power1.inOut", transformOrigin: "center" };
        var end = { y: number * -1 * (i + 1), x: number * -1 * (i + 1), rotate: rotate * -1, duration: 1, ease: "power1.inOut", transformOrigin: "center" };
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        tl
          .fromTo(item, 3, start1, end)
          .to(item, { y: 0, x: 0, rotate: 0, duration: 2, ease: "power1.inOut", transformOrigin: "center" }, "+=1")
      });
    }
  }
  export default headerAnimations;