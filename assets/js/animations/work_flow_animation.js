const work_flow_animation = container => {
    function pulse(target) {
      gsap.to(target, { scale: 1.08, duration: .3, ease: "power1.inOut", transformOrigin: "center" })
      gsap.to(target, { scale: 1, duration: .2, ease: "power1.inOut", transformOrigin: "center" }, "+=.1")
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#fm_workflow",
        start: 'top 60%',
        toggleActions: "restart none none reverse",
      },
      repeat: -1,
      repeatDelay: 2.5,
      onStart: () => { },
      onRepeat: () => {
        let boxes = document.querySelectorAll('#fm_boxes > g');
        boxes.forEach(box => {
          box.classList.remove('active')
        })
      },
      onComplete: () => { }
    });
    var fm_boxes = { y: 10, x: 0, scale: .8, opacity: 0, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.1 };
    var fm_line1 = {
      y: 0, x: 0, strokeDashoffset: -275, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () { document.getElementById('tenant_box').classList.add('active') },
      onComplete: function () {
        document.getElementById('maintenance_box').classList.add('active');
        pulse("#maintenance_box");
      }
    };
    var fm_line2 = {
      y: 0, x: 0, strokeDashoffset: 100, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('maintenance_box').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('property_box').classList.add('active');
        pulse("#property_box");
      }
    };
    var fm_line5 = {
      y: 0, x: 0, strokeDashoffset: 100, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('property_box').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('work_order_box').classList.add('active');
        pulse("#work_order_box");
      }
    };
    var fm_line3 = {
      y: 0, x: 0, strokeDashoffset: 450, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('work_order_box').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('v2').classList.add('active');
        pulse("#v2");
      }
    };
    var fm_line4 = {
      y: 0, x: 0, strokeDashoffset: -275, rotate: 0, duration: .5, ease: "power1.inOut", transformOrigin: "center", stagger: 0.5,
      onStart: function () {
        document.getElementById('v2').classList.add('active')
      },
      onComplete: function () {
        document.getElementById('property_box').classList.add('active');
        pulse("#property_box");
      }
    };
    tl.set(["#approval", "#fm_request"], { opacity: 0 })
    tl.from("#fm_boxes > g", fm_boxes)
    tl.from("#fm_lines > #line_1", fm_line1)
    tl.from("#fm_lines > #line_2", fm_line2)
    tl.from("#fm_lines > #line_5", fm_line5)
    tl.to("#approval", { opacity: 1, duration: .5, ease: "power1.inOut" })
    tl.from("#fm_lines > #line_3", fm_line3, "+=.5")
      .addLabel("approval")
    tl.to("#v1", { scale: 0, duration: .7, ease: "power1.inOut", transformOrigin: "center" }, "approval");
    tl.to("#v3", { scale: 0, duration: .7, ease: "power1.inOut", transformOrigin: "center" }, "approval");
    tl.to("#fm_request", { opacity: 1, duration: .5, ease: "power1.inOut" }, "-=1.2")
    tl.from("#fm_lines > #line_4", fm_line4)
  };
  export default work_flow_animation;