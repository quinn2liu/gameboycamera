import { cropImage, pixelateImage } from './ImageConversion.tsx'

export default function App() {

  const demoFilePath = '/gameboy.jpg';

  const handleButton = async () => {
    try {
      const originalImage = new Image();
      originalImage.src = demoFilePath;

      const croppedImageElement = await cropImage(originalImage, 600, 337, 675);
      // const croppedTag = document.getElementById('croppedTag');
      // if (croppedTag) {
      //   croppedTag.src = croppedImageElement.src;
      // }

      const pixelatedImageElement = await pixelateImage(croppedImageElement, 675);
      const pixelatedTag = document.getElementById('pixelatedTag');
      if (pixelatedTag) {
        pixelatedTag.src = pixelatedImageElement.src;
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <>
      <button onClick={handleButton}>Do Something</button>
      <img src={demoFilePath} alt='' />
      <img id='pixelatedTag' src='' />
    </>

  )
}
