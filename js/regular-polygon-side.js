/* global AFRAME */
AFRAME.registerComponent('regular-polygon-side', {
  schema: {
    width: {type: 'number', default: 1},
    sides: {type: 'number', default: 4},
    index: {type: 'number', default: 0},
  },
  update: function (oldData) {
    const data = this.data;
    const el = this.el;

    // Geometry or room properties changed - update position and rotation.
    if (data.width !== oldData?.width ||
      data.sides !== oldData?.sides || 
      data.index !== oldData?.index) {
      const apothem = this.calculateApothen(data.sides, data.width);
      el.object3D.rotation.set(0, 0, 0);
      el.object3D.position.x = 0;
      el.object3D.position.z = -apothem;
    }
  },
  calculateApothen: function (numberOfSides, lengthOfSide) {
    return lengthOfSide / (2 * Math.tan(Math.PI / numberOfSides));
  },
  calculateOuterRadius: function (numberOfSides, lengthOfSide) {
    return lengthOfSide / (2 * Math.sin(Math.PI / numberOfSides));
  }
});