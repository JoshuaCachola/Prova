const polyline = require('@mapbox/polyline');
const urlencode = require('urlencode');

// In [lat, lng] order, which matches the polyline library. If your data is in the opposite order, use the swapLngLat function from coordsUtils.
const decToHex = (dec) => (dec < 16 ? '0' : '') + dec.toString(16);
const rgbToHexString = (rgb) => decToHex(rgb[0]) + decToHex(rgb[1]) + decToHex(rgb[2]);
const swapLngLat = (coords) => coords.map(c => [c[1], c[0]]);
// sRGB: starting RGB color, like [255, 0, 0]
// eRGB: ending RGB color, like [122, 122, 122]
// numSteps: number of steps in the gradient
function createSpectrum(sRGB, eRGB, numSteps) {

  const colors = [];
  for (let i = 0; i < numSteps; i++) {
    const r = Math.round(((eRGB[0] - sRGB[0]) * i / numSteps)) + sRGB[0];
    const g = Math.round(((eRGB[1] - sRGB[1]) * i / numSteps)) + sRGB[1];
    const b = Math.round(((eRGB[2] - sRGB[2]) * i / numSteps)) + sRGB[2];
    colors.push(rgbToHexString([r, g, b]));
  }
  return colors;
}

export default function createPolylineStr(coords) {
  const newCoords = swapLngLat([...coords]);
  const startColor = '#FF512F';
  const endColor = '#F09819';
  const strokeWidth = 4;

  const hexToDec = (hex) => parseInt(hex, 16);
  const hexStringToRGB = (hexString) => {
    const s = hexString.replace('#', '');
    return [hexToDec(s.substr(0, 2)), hexToDec(s.substr(2, 2)), hexToDec(s.substr(4, 2))];
  }

  const colorA = hexStringToRGB(startColor);
  const colorB = hexStringToRGB(endColor);
  const spectrumColors = createSpectrum(colorA, colorB, coords.length - 1);

  const firstCoord = newCoords[0];
  const lastCoord = newCoords[newCoords.length - 1];
  const startMarker = `pin-s-a+${rgbToHexString(colorA)}(${firstCoord[1]},${firstCoord[0]})`;
  const endMarker = `pin-s-b+${rgbToHexString(colorB)}(${lastCoord[1]},${lastCoord[0]})`;
  const pathStrings = [];

  for (let i = 0; i < newCoords.length - 1; i++) {
    const path = polyline.encode([newCoords[i], newCoords[i + 1]]);
    pathStrings.push(`path-${strokeWidth}+${spectrumColors[i]}(${path})`); // format from https://docs.mapbox.com/api/maps/#path
  }

  const pathWithGradient = pathStrings.join(',') + ',' + startMarker + ',' + endMarker;
  return urlencode(pathWithGradient);
}
