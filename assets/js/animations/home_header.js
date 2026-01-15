let flipTweens = [];

function animateHeaderImgs(target) {
  gsap.registerPlugin(Flip);
  const item_imgs = document.querySelectorAll('[data-target="flip"]');
  if (!item_imgs) return;
  
  const target_elm = document.getElementById(target);
  if (!target_elm) return;

  item_imgs.forEach((item, i) => {
    if (flipTweens[i]) flipTweens[i].kill();
    
    const state = Flip.getState(item);
    target_elm.appendChild(item);
    
    // Store original classes
    const originalClasses = item.getAttribute('data-classes') || item.classList.toString();
    item.setAttribute('data-classes', originalClasses);
    
    item.classList = '';
    item.style = '';
    
    flipTweens[i] = Flip.from(state, {
      duration: 1.5,
      ease: "power2.inOut"
    });
  });
}

function animateHeaderImgsUp() {
  gsap.registerPlugin(Flip);
  const item_imgs = document.querySelectorAll("#header_imgs_target [data-target='flip']");
  if (!item_imgs) return;
  
  const target_elm = document.getElementById("header_images_sm");
  if (!target_elm) return;

  item_imgs.forEach((item, i) => {
    if (flipTweens[i]) flipTweens[i].kill();
    
    const state = Flip.getState(item);
    target_elm.appendChild(item);
    
    // Restore original classes
    const originalClasses = item.getAttribute('data-classes');
    if (originalClasses) {
      item.className = originalClasses;
    }
    
    flipTweens[i] = Flip.from(state, {
      duration: 1.5,
      ease: "power2.inOut"
    });
  });
}

const home_header = container => {
  // Kill any existing ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  
  if (document.querySelector('.clients_section')) {
    ScrollTrigger.create({
      trigger: ".clients_section",
      start: "top 80%",
      end: "bottom 0%",
      onEnter: () => animateHeaderImgs("header_imgs_target"),
      onLeaveBack: () => animateHeaderImgsUp(),
      onEnterBack: () => animateHeaderImgs("header_imgs_target"),
      onLeave: () => animateHeaderImgsUp(),
      // markers: true // Uncomment this to debug scroll positions
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".header",
      start: 'top 60%',
      toggleActions: "restart none none reverse"
    }
  });

  // Initial setup
  tl.set("#header_imgs_container", { opacity: 1 })
    .set("#header_img", { opacity: 0, scale: 0.3, y: 100 })
    .to("#header_img", {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 1,
      ease: "power2.out"
    })
    .from(".header_circle", {
      y: 100,
      opacity: 0,
      scale: 0.3,
      duration: 1,
      ease: "power2.out"
    }, "-=0.5")
    .from(".header_ui_blocks", {
      opacity: 0,
      scale: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2
    }, "-=0.5");

  if (window.innerWidth > 768) {
    tl.fromTo(".full_circle",
      { scale: 0, opacity: 1 },
      { 
        scale: 10,
        opacity: 0,
        duration: 5,
        ease: "power2.inOut",
        repeat: -1,
        stagger: 0.1
      }
    );
  }

  // Refresh ScrollTrigger
  ScrollTrigger.refresh();

  // Handle resize
  window.addEventListener('resize', ScrollTrigger.refresh);
};

export default home_header;