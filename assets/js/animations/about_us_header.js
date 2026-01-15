const about_us_header = container => {

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about_us_header",
      start: 'top 60%',
      // end: 'bottom 0%',
      // markers: true,
      toggleActions: "restart none none reverse",
      // scrub: true,
      // pin: true
    },
    onComplete: () => { }
  });

  var start = { y: 100, x: 0, opacity: 0, scale: .8, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.1 };
  // var header_images = gsap.utils.toArray('.about_us_header img');
  tl.from(".about_us_header img", start)
  // header_images.forEach((item, i) => {
  //   console.log(item, i, 'header_images')

  //   tl
  //     .from(item, start)
  //     .to(item, { y: 0, x: 0, rotate: 0, duration: 2, ease: "power1.inOut", transformOrigin: "center" }, "+=1")
  // });
};
export default about_us_header;