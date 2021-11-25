/* global AFRAME */
AFRAME.registerComponent('regular-prism-panel', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    sides: {type: 'number', default: 4},
    index: {type: 'number', default: 0},
  },
  init: function() {
    const data = this.data;
    const el = this.el

    const apothem = calculateApothen(data.sides, data.width);

    el.geometry.width = data.width;
    el.geometry.height = data.height;
    el.object3D.rotation.set(0, 0, 0);
    el.object3D.position.set(0, data.height/2, apothem)
  }
  update: function (oldData) {
    const data = this.data;
    const el = this.el
    
    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }

    // Geometry or room properties changed - update position and rotation.
    if (data.width !== oldData.width ||
      data.height !== oldData.height ||
      data.sides !== oldData.sides || 
      data.index !== oldData.index) {
      const apothem = calculateApothen(data.sides, data.width);

      el.geometry.width = data.width;
      el.geometry.height = data.height;
      el.object3D.rotation.set(0, 0, 0);
      el.object3D.position.set(0, data.height/2, apothem)
    }

    // Geometry properties changed - update geometry.
    if (data.width !== oldData.width ||
      data.height !== oldData.height) {
      el.geometry.width = data.width;
      el.geometry.height = data.height;
    }
  }
});

function calculateApothen(numberOfSides, lengthOfSide) {
  return lengthOfSide / (2 * Math.tan(Math.PI / numberOfSides));
}

function calculateOuterRadius(numberOfSides, lengthOfSide) {
  return lengthOfSide / (2 * Math.sin(Math.PI / numberOfSides));
}