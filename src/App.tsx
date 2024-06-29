import { useState } from 'react'
import { pixelateImage } from './ImageConversion.tsx'

export default function App() {
  
  const testImagePath = '../public/gamboy.png'

  pixelateImage(testImagePath, 960, 960, 1080);

  return (
    <>
      <div className=' text-lg font-bold'>GameBoy Camera Converter</div>
    </>
  )
}
