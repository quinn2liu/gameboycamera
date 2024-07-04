import { useState } from 'react'
import { pixelateImage } from './ImageConversion.tsx'

export default function App() {

  const demoFilePath = '/gameboy.jpg';

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
    })
    

  }

  const handleButton = async () => {
    try {
      const originalImage = new Image();
      originalImage.src = demoFilePath;
      const editedImage = await cropImage(originalImage, 600, 337, 675);
      const displayElement = document.getElementById('editedImage');
      if (displayElement) {
        displayElement.src = editedImage.src;
      }
    } catch (error) {
      console.error(error);
    }
  }

  

  return (
    <>
      <button onClick={handleButton}>Do Something</button>
      <img src={demoFilePath} alt='' />
      <img id='editedImage' src=''/>
    </>

  )
}
