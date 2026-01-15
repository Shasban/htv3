const inspection_animation = container => {
    function pulse(target) {
      gsap.to(target, { scale: 1.08, duration: .3, ease: "power1.inOut", transformOrigin: "center" })
      gsap.to(target, { scale: 1, duration: .2, ease: "power1.inOut", transformOrigin: "center" }, "+=.1")
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#fm_inspection",
        start: 'top 70%',
        toggleActions: "restart none none reverse",
      },
      repeat: -1,
      repeatDelay: 2.5,
      onStart: () => { },
      onRepeat: () => {
        let boxes = document.querySelectorAll('#inspection_boxes > g');
        boxes.forEach(box => {
          box.classList.remove('active')
        })
      },
      onComplete: () => { }
    });
    var inspection_boxes = { y: 10, x: 0, scale: .8, opacity: 0, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.1 };
    var fm_line1 = {
      y: 0, x: 0, strokeDashoffset: 100, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () { document.getElementById('pm_box').classList.add('active') },
      onComplete: function () {
        document.getElementById('relevant_inspector').classList.add('active');
        pulse("#relevant_inspector");
      }
    };
    var fm_line2 = {
      y: 0, x: 0, strokeDashoffset: 100, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('relevant_inspector').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('general_inspection').classList.add('active');
        pulse("#general_inspection");
      }
    };
    var fm_line3 = {
      y: 0, x: 0, strokeDashoffset: 120, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('general_inspection').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('start').classList.add('active');
        pulse("#start");
      }
    };
    var fm_line4 = {
      y: 0, x: 0, strokeDashoffset: 100, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('start').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('relevant_image').classList.add('active');
        pulse("#relevant_image");
      }
    };
    var fm_line5 = {
      y: 0, x: 0, strokeDashoffset: 100, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('relevant_image').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('end').classList.add('active');
        pulse("#end");
      }
    };
    var fm_line6 = {
      y: 0, x: 0, strokeDashoffset: -150, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('end').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('pm_box').classList.add('active');
        pulse("#pm_box");
      }
    };
    tl.set(["#assign_inspection", "#inspection_report"], { opacity: 0 })
    tl.from(["#inspection_boxes > g"], inspection_boxes)
    tl.from(["#app_heading", "#inspection_app_box"], { scale: .8, opacity: 0, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.1 })
    tl.from("#inspection_lines > #line-1", fm_line1)
    tl.to("#assign_inspection", { opacity: 1, duration: .5, ease: "power1.inOut" })
    tl.from("#inspection_lines > #line-2", fm_line2, "+=.5")
    tl.from("#inspection_lines > #line-3", fm_line3, "+=1")
    tl.from("#inspection_lines > #line-4", fm_line4, "+=1")
    // tl.to("#app_heading", { opacity: 1, duration: .5, ease: "power1.inOut" })
    tl.from("#inspection_lines > #line-5", fm_line5, "+=1")
    tl.from("#inspection_lines > #line-6", fm_line6, "+=1")
    tl.to("#inspection_report", { opacity: 1, duration: .5, ease: "power1.inOut" })
  };
  export default inspection_animation;