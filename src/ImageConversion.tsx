/**
 * Description placeholder
 *
 * @param {string} originalImage
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} edgeLength
 */
function pixelateImage(originalImage: string, centerX: number, centerY: number, edgeLength: number) {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    context.drawImage(originalImage, centerX - (edgeLength / 2), centerY - (edgeLength / 2), edgeLength, edgeLength, edgeLength, edgeLength)

    // getImageData returns an ImageData object representing pixel data of the selected canvas. the .data attribute returns an Uint8ClampedArray of pixels
    const originalImageData = context.getImageData(originalImage, 0, 0, edgeLength, edgeLength).data


    const pixelationFactor = edgeLength / 128

    // for loops increment by pixelationFactor, 
    for (let x = 0; x < edgeLength; x += pixelationFactor) {
        for (let y = 0; y < edgeLength; y += pixelationFactor) {
            
            // calculates the index in the originalImageData array that represents the current pixel
            const pixelIndex = (x + y * edgeLength) * 4;

            // context.fillStyle sets the color for the context. assigned to the currently-iterated pixel
            context.fillStyle(`rgba(
                ${originalImageData[pixelIndex]},
                ${originalImageData[pixelIndex + 1]},
                ${originalImageData[pixelIndex + 2]},
                ${originalImageData[pixelIndex + 3]},
            )`)
            // fillRect(x, y, width, height)
            context.fillRect(x, y, pixelationFactor, pixelationFactor)
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