const clientLogosAnimation = () => {

  const logos = document.querySelectorAll(".client_logo");
  if (!logos.length) return;
  logos.forEach((logo, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: logo,
        start: 'top 70%',
        toggleActions: "restart pause resume reverse",
      }
    });
    const delay = (i % 6) * 0.1;
    tl.addLabel('start', 0)
      .set(logo, {
        opacity: 0,
        scale: 0,
        transformOrigin: "center"
      })
      .to(logo, {
        delay: delay,
        duration: 1,
        opacity: 1,
        scale: 1,
        transformOrigin: "center",
        ease: "power2.inOut",
        stagger: 0.1
      }, "start+=0");
  });
};


const initClientLogos = () => {

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Client logo animations disabled.');
    return;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', clientLogosAnimation);
  } else {
    clientLogosAnimation();
  }
};

export default initClientLogos;