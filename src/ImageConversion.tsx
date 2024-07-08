/**
 * Description placeholder
 *
 * @param {HTMLImageElement} originalImage
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} edgeLength
 * @returns {Promise<HTMLImageElement>}
 */
const cropImage = (originalImage: HTMLImageElement, centerX: number, centerY: number, edgeLength: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = edgeLength;
      canvas.height = edgeLength;
      const context = canvas.getContext('2d');

      if (!context) {
          throw new Error('Failed to get 2d context');
      }
      const croppedImageElement = new Image();

      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      // cropping the original image by drawing it with new dimensions onto the canvas
      originalImage.onload = () => {
        try {
          context.drawImage(originalImage, centerX - Math.floor((edgeLength / 2)), centerY - Math.floor((edgeLength / 2)), edgeLength, edgeLength, 0, 0, edgeLength, edgeLength);
          const croppedImageUrl = canvas.toDataURL();
          croppedImageElement.src = croppedImageUrl;
          resolve(croppedImageElement);
        } catch (error) {
          reject(error);
        }
      };
    });
  }

/**
 * Description placeholder
 *
 * @param {string} originalImage
 * @param {number} centerX
 * @param {number} centerY
 * @param {number} edgeLength
 */
// originalImage, centerX = 600, centerY = 337, edgeLength = 675
const pixelateImage = (croppedImage: HTMLImageElement, edgeLength: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = edgeLength;
        canvas.height = edgeLength;
        const context = canvas.getContext('2d');
        const pixelatedImageElement = new Image();

        if (!context) {
            throw new Error('Failed to get 2d context');
        }
        croppedImage.onload = () => {
            try {
                // redrawing the croppedImage on a canvas to extract data
                context.drawImage(croppedImage, 0, 0);
                const croppedImageData = context.getImageData(0, 0, edgeLength, edgeLength).data;
                const pixelationFactor = Math.ceil(edgeLength / 128);

                const colors = [
                    {r: 255, g: 255, b: 255}, // white
                    {r: 169, g: 169, b: 169}, // light gray
                    {r: 84, g: 84, b: 84}, // dark grey
                    {r: 0, g: 0, b: 0} // black
                ]

                // each iteration represents drawing of each of the 128 pixels 
                for (let y = 0; y < 128; y += 1) {
                    for (let x = 0; x < 128; x += 1) {
                        
                        // calculates the index in the originalImageData array that represents the current pixel: ((x * pixelationFactor) + (y * pixelationFactor * edgeLength)) * 4;

                        const pixelIndex = 4 * pixelationFactor * (x + y * edgeLength);

                        const colorIndex = quantizeColor(croppedImageData[pixelIndex], croppedImageData[pixelIndex + 1], croppedImageData[pixelIndex + 2])

                        // context.fillStyle sets the color for the context. assigned to the currently-iterated pixel
                        context.fillStyle = `rgba(
                            ${colors[colorIndex].r},
                            ${colors[colorIndex].g},
                            ${colors[colorIndex].b},
                            ${croppedImageData[pixelIndex + 3] / 255}
                        )`;
                        // fillRect(x, y, width, height)
                        context.fillRect(x * pixelationFactor, y * pixelationFactor, pixelationFactor, pixelationFactor);
                    }
                }
                const pixelatedImageURL = canvas.toDataURL();
                pixelatedImageElement.src = pixelatedImageURL;
                resolve(pixelatedImageElement);
            } catch (error) {
                reject(error);
            }
        }
    });
}


const quantizeColor = (r: number, g: number, b: number): number => {
    const colors = [
        {r: 255, g: 255, b: 255}, // white
        {r: 169, g: 169, b: 169}, // light gray
        {r: 84, g: 84, b: 84}, // dark grey
        {r: 0, g: 0, b: 0} // black
    ]

    let closestColorIndex = 0;
    let smallestDistance = Number.MAX_VALUE;

    colors.forEach((color, index) => {
        const dist = Math.sqrt(
            Math.pow(color.r - r, 2) + 
            Math.pow(color.g - b, 2) + 
            Math.pow(color.b - b, 2)
        )
        if (dist < smallestDistance) {
            smallestDistance = dist;
            closestColorIndex = index;
        }

    });
    return closestColorIndex;
}

export { cropImage, pixelateImage };