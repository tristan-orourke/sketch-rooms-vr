AFRAME.registerComponent('teleport-on-click', {
  schema: {
    from: { type: 'selector' },
    to: { type: 'selector' }
  },
  events: {
    click: function () {
      const from = this.data.from;
      const to = this.data.to;

      // Deactivate clickable elements in the object disappearing.
      const oldClickableElements = from.querySelectorAll('.clickable');
      for (var i = 0; i < oldClickableElements.length; i++) {
        oldClickableElements[i].classList.remove("active");
      }

      // Activate clickable elements in the object appearing
      const newClickableElements = to.querySelectorAll('.clickable');
      for (var i = 0; i < newClickableElements.length; i++) {
        newClickableElements[i].classList.add("active");
      }

      // Start the fade-out
      document.querySelector("#cursor").emit("teleport", this.data, true);
      
      // Replace objects when curtain is up
      setTimeout(function switchObjs() {
        from.object3D.visible = false;
        to.object3D.visible = true;
      }, 500);
    }
  }
});