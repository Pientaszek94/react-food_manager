import React, { useState, useRef } from 'react'
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
  } from "react-image-crop";
import setCanvasPreview from '../setCanvasPreview';
import { useUpdateUserMutation } from '../app/services/auth/authService';
import Spinner from './Spinner';
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;


function CropImage({handleChange, setError, error, dialogRef}) {


    const imgRef = useRef(null);
    const inputRef=useRef()
    const previewCanvasRef = useRef(null);
    const [file, setFile]=useState();
    const [crop, setCrop] = useState();
    const [{isLoading}]=useUpdateUserMutation();

    const closeModal=()=>{
        dialogRef.current.close()
        setFile("") 
    }

    const resetInput=()=>{
        inputRef.current.value=null
    }

    const handleSelectImage=(e)=>{
        setFile(URL.createObjectURL(e.target.files[0]))
    }

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        if (width<150||height<150)
            {
                setFile(null)
                setError("Image must be at least 150x150 pixels")
                return
            }
        else setError('')
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        
        const crop = makeAspectCrop(
        {
            unit: "%",
            width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const croppAndUpdate=(e)=>{
        setCanvasPreview(
            imgRef.current, // HTMLImageElement
            previewCanvasRef.current, // HTMLCanvasElement
            convertToPixelCrop(
              crop,
              imgRef.current.width,
              imgRef.current.height
            )
          );
        const dataUrl = previewCanvasRef.current.toDataURL();
        
        handleChange({image:dataUrl})
        .then(()=> {setFile("")
                    closeModal()
                        })
        .catch((error)=> {
            console.log("NBRRRO")
            setError("Something went wrong!  Please try again another time.")
            setFile("")})

        resetInput()

    }


  return (
    <div className='image-console'>
        <input ref={inputRef} className='input-file' id="input-file" type="file" accept='image/*' onChange={handleSelectImage} />
        {/* {error && (<h4>{error}</h4>)} */}
        {
            file ?(
                <div>
                    <ReactCrop
                        crop={crop}
                        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                        circularCrop
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                        >
                            <img ref={imgRef} src={file} alt="Upload" onLoad={onImageLoad} style={{width:"100%"}} />

                    </ReactCrop>
                    <button className='orange long' onClick={croppAndUpdate}>{isLoading?<Spinner/>:"Set as a profile image"}</button>
                </div>
            )
            :!error?(  
                <div>
                    <h4>Please select your image</h4>
                </div>
            )
            :(
                <div>
                    {error}
                </div>
            )}

        {crop && (
        <canvas
            ref={previewCanvasRef}
            style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
        )}
        
    </div>
  )
}

export default CropImage