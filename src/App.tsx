import { useState } from 'react'
import { pixelateImage } from './ImageConversion.tsx'

export default function App() {
  
  // const fileUpload = document.querySelector("#upload");
  const demoFilePath = '../public/gamboy.png'

  return (
    <>
      <div className=' text-lg font-bold'>GameBoy Camera Converter</div>
      <input id ='upload' type='file' accept='image/*' />
      <button onClick={pixelateImage(demoFilePath, 960, 960, 1080);}></button>
    </>
  )
}
