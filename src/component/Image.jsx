import React, { useEffect, useRef, useState } from 'react'
import * as fabric from 'fabric';
import '../../src/component/Image.css'

export default function Image() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  //   useEffect(() => {
  //   if(canvasRef.current) {
  //       const initCanvas = new fabric.Canvas(canvasRef.current);
  //       initCanvas.backgroundColor = '#d1d5db'
  //       initCanvas.renderAll();
  //       setCanvas(initCanvas);

  //       return () => {
  //           initCanvas.dispose();
  //       }
  //   }
  // }, [])

  const exportFrame = () => {
    if (canvas) {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1,
        });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas-export.png';
        link.click();
    }
};

const handleAddImage = (e) => {
  const canvas = new fabric.Canvas(canvasRef.current);
  const imgObj = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(imgObj);
  reader.onload = function (e) {
      const imgUrl = e.target.result;
      const imageElement = document.createElement('img');
      imageElement.src = imgUrl;
      imageElement.onload = function () {
          const image = new fabric.FabricImage(imageElement, {
              angle: 0,
              width: imageElement.width,
              height: imageElement.height,
              scaleX: 0.5,
              scaleY: 0.5,
          });
          canvas.add(image);
          canvas.centerObject(image);
          canvas.setActiveObject(image)
      };
  };
  setCanvas(canvas);
}

  return (
    <div className='flex'>
       <div 
       className="w-1/2" >
        <div className='background-div'>
        <canvas style={{
          position: 'absolute',
          top: 10,
          left: 10,
        }} height={500} width={400} ref={canvasRef}></canvas>
        </div>
       
      </div>
      <div className='w-1/2 flex items-center justify-center'>
       <div className="w-1/2 flex flex-col items-center justify-center space-y-4">
        
        <input
          type="file"
          accept="image/*"
          className="border p-2"
          onChange={handleAddImage}
        />
      <button onClick={exportFrame} className='px-4 py-2 rounded-md bg-gray-300'>Save</button>
      </div>
      </div>
    </div>

  )
}
