// Function to handle image upload and conversion
function convertImageToText() {
  const input = document.getElementById('image-input');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL();
        performOCR(dataURL);
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}

// Function to perform OCR on the image
function performOCR(imageDataURL) {
  Tesseract.recognize(imageDataURL, 'eng', { logger: m => console.log(m) })
    .then(result => {
      const resultText = document.getElementById('result-text');
      resultText.value = result.text;
    })
    .catch(error => {
      console.error(error);
    });
}

// Event listener for the convert button
document.addEventListener('DOMContentLoaded', function () {
  const convertButton = document.getElementById('convert-button');
  convertButton.addEventListener('click', convertImageToText);
});
