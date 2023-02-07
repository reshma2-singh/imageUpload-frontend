import React,{useState,useEffect} from 'react'
import axios from 'axios'
function Dashboard() {
  const [singleFile, setSingleFile] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const[single,setSingle]=useState('')
  const [title, setTitle] =  useState('');
  const SingleFileChange = (e) => {
    setSingle(e.target.files[0]);
  
}
const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files);
    
}
const uploadSingleFile = async () => {
  
  console.log(singleFile,'s');
  const formData= new FormData()
  formData.append('file',single)
  console.log(singleFile)
  await axios.post(`http://localhost:8081/api/singleFile`,  formData )
  .then(res => {
  console.log(res);
  console.log(res.data.File);
  getSingleFiles()
  })
 
}
const getSingleFiles=async()=>{
  try{
const pic=await axios.get("http://localhost:8081/api/getallSingleFiles")
console.log(pic.data,'singlefile')
setSingleFile(pic.data)
  }catch(err){
    console.log(err)
  }}
useEffect(()=>{
 
  getSingleFiles()
},[])
const UploadMultipleFiles = async () => {
     console.log(multipleFiles)                   
  }
  
  return (
   <div className='container'>
  <h2 className='text-danger font-weight-bolder border-bottom text-center'>Single & Multiple file uploads</h2>
<div className='row mt-3'>
  <div className='col-6'>
    <div className='form-group'>
<label>Select Single File</label>
<input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
    </div>
<div className='row'>
<div className='col-10'>
<button type="button" className='btn btn-danger' onClick={()=>uploadSingleFile()}>Upload</button>
</div>
</div>
  </div>
  <div className='container-fluid mt-5'>
    <div className='row'>
      <div className='col-6'>
        <h4>Single File List</h4>
        <div className='row'>
          {
            singleFile.map((file,index)=>
            <div className='col-6'>
              <div className='card mb-2 border-0 p-0'>
                <img src={`http://localhost:8081/${file.filePath}`} height="200" className='card-img-top img-responsive' alt=""/>
                </div>
            </div>
            )

          }

        </div>

      </div>
    </div>

  </div>
<div className='col-6'>
  <div className='row'>
<div className='col-6'>
<label>Title</label>
<input type="text" onChange={(e) => setTitle(e.target.value) } placeholder="enter title for your gallery" className="form-control"/>
</div>
<div className='col-6'>
<div className='form-group'>
<label>Select Multiple File</label>
<input type="file" onChange={(e) => MultipleFileChange(e)} className="form-control" multiple />
</div>
</div>
  </div>

<div className='row'>
<div className='col-10'>
<button type="button" onClick={() => UploadMultipleFiles()}  className="btn btn-danger">Upload</button>
</div>
</div>
</div>
</div>
   </div>
  )
}

export default Dashboard