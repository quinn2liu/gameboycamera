/**
 * Description placeholder
 *
 * @param {string} originalImage
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} edgeLength
 */
function pixelateImage(originalImage: HTMLImageElement, centerX: number, centerY: number, edgeLength: number) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        throw new Error('Failed to get 2d context');
    }

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    // cropping the original image by drawing it with new dimensions onto the canvas
    context.drawImage(originalImage, centerX - (edgeLength / 2), centerY - (edgeLength / 2), edgeLength, edgeLength, 0, 0, edgeLength, edgeLength);

    // getImageData returns an ImageData object representing pixel data of the selected canvas. the .data attribute returns an Uint8ClampedArray of pixels
    const originalImageData = context.getImageData(0, 0, edgeLength, edgeLength).data;

    const pixelationFactor = Math.floor(edgeLength / 128);

    // each iteration represents drawing of each of the 128 pixels 
    for (let x = 0; x < 128; x += 1) {
        for (let y = 0; y < 128; y += 1) {
            
            // calculates the index in the originalImageData array that represents the current pixel: ((x * pixelationFactor) + (y * pixelationFactor * edgeLength)) * 4;
            const pixelIndex = 4 * pixelationFactor * (x + y * edgeLength);

            // context.fillStyle sets the color for the context. assigned to the currently-iterated pixel
            context.fillStyle = `rgba(
                ${originalImageData[pixelIndex]},
                ${originalImageData[pixelIndex + 1]},
                ${originalImageData[pixelIndex + 2]},
                ${originalImageData[pixelIndex + 3]},
            )`;
            // fillRect(x, y, width, height)
            context.fillRect(x, y, pixelationFactor, pixelationFactor);
        }
    }

    originalImage.src = canvas.toDataURL();
  }

/**
 * Description placeholder
 */
function getCropCoord() {
    // TO DO 
    // (gets coordinates for where to crop the image)
}

export { pixelateImage };