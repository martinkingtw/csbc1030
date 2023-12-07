const calculateArea = (length, width) => {
  return length * width;
};

const calculateVolume = (length, width, height) => {
  return length * width * height;
};

const calculateSquare = (length) => {
  return length * length;
};

module.exports = { calculateArea, calculateVolume, calculateSquare };