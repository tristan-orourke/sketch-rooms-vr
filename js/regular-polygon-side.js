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

    // If any properties changed (including initial run) - update position and rotation.
    if (data.width !== oldData?.width ||
      data.sides !== oldData?.sides || 
      data.index !== oldData?.index) {
      const apothem = this.calculateApothen(data.sides, data.width);
      const rotation = this.calculateRotation(data.sides - data.index, data.sides); // Use sides - index to go around clockwise instead of counter-clockwise.
      const position = this.calculatePosition(data.sides - data.index, data.sides, apothem);
      el.object3D.rotation.set(...rotation);
      el.object3D.position.set(...position);
    }
  },
  calculateApothen: function (numberOfSides, lengthOfSide) {
    return lengthOfSide / (2 * Math.tan(Math.PI / numberOfSides));
  },
  calculateOuterRadius: function (numberOfSides, lengthOfSide) {
    return lengthOfSide / (2 * Math.sin(Math.PI / numberOfSides));
  },
  calculateAngle: function (i, numberOfSides) {
    return (i * 2 * Math.PI / numberOfSides);
  },
  calculatePosition: function (i, numberOfSides, apothem) {
    const angle = this.calculateAngle(i, numberOfSides);
    return [Math.sin(angle)*apothem, 0, Math.cos(angle)*apothem];
  },
  calculateRotation: function (i, numberOfSides) {
    const angle = this.calculateAngle(i, numberOfSides) + Math.PI;
    return [0, angle, 0];
  }
});