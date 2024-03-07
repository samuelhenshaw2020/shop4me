
import { FormEvent, LegacyRef, useRef } from 'react'
import './App.css'

function App() {

  const name = useRef<string>(null!);
  const file = useRef<File>(null);

  const inputRef = useRef<HTMLInputElement>(null!);
  const imgRef = useRef<HTMLImageElement>(null!);
  
  

  const Submit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(file.current)
  }

  const Preview = (e: FormEvent<HTMLInputElement>) => {
    const reader = new FileReader();
   
    if(e.currentTarget.files.length > 0){
      reader.readAsDataURL(e.currentTarget.files[0]);
    }

    reader.onload = ()=> {
       ResizeImage(reader.result as string)
    }
  }

  const ResizeImage = (base64Image: string) => {
     const canvas = document.createElement("canvas");
     const context = canvas.getContext("2d");
     
     const image = new Image()
     image.src = base64Image;
     
     image.onload = () => {

      canvas.width = image.width;
      canvas.height = image.height

      context?.drawImage(image, 0, 0)
 
      canvas.toBlob(async (blob) => {
        file.current = blob;
        imgRef.current.src = URL.createObjectURL(blob as Blob)
      }, "image/jpeg", 0.8)
  
     }
  }

  return (
    <main className='p-5'>
        <form onSubmit={(e)=> Submit(e)} className='40% p-5'>
          <div className='text-center'>
               <img ref={imgRef} id='imgRef' src="" style={{width: "300px", height: "300px"}} alt="Preview" />
          </div>
          <br />

          <div className='form-group text-start'>
                <button onClick={()=> inputRef.current?.click()} className='btn btn-light border py-3 px-5'>Select from computer</button>
                <input ref={inputRef} type="file" hidden className='form-control' onChange={Preview} />
          </div>

          <div className='form-group py-2 text-start'>
              <label htmlFor="">Name</label>
              <input  type="text" className='form-control' onChange={(e) => name.current = e.currentTarget.value} />
          </div>

          <div className='text-start mt-3'>
             <button>Upload</button>
          </div>
        </form>
    </main>
  )
}

export default App
