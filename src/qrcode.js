import './qrcode.css'
import { useState } from 'react'
function Qrcode() {
    const [img,setImg]= useState("");
    const [loading,setLoading]= useState(false);
    const [qrdata,setQrdata]=useState("");
    const [qrsize,setQrsize]=useState("");
    
    async function generateqrCode(){
        setLoading(true);
        try{
            const url=`https://api.qrserver.com/v1/create-qr-code/?size={qrsize}*{qrsize}&data=${encodeURIComponent(qrdata)}`;
            setImg(url); 
        }catch(error){
            console.error(" Oops !Error Occured" ,error);
        }finally{
            setLoading(false);
        }
        
        
       
    }
    function downloadqr(){
        fetch(img)
        .then((response)=>response.blob())
        .then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }).catch((error)=>{
            console.log("Error in downloading QR code",error);
        })
    }
    return (
        <div class="appcontainer">
            <h1>QRCODE GENERATOR</h1>
            {loading && <p>Please wait ....</p>}
            {img &&<img src={img} class="qrcodeimage" alt=""></img>}
            <div>
                
                <label htmlFor="inputdata" class="inputdata"> Data for Qrcode </label>
                <input type="text"value={qrdata} id="datainput"placeholder="Enter data for QR code"onChange={(e)=>setQrdata(e.target.value)}></input>
                <label htmlFor="inputdata" class="inputdata"> Image Size (Ex,.150):</label>
                <input type="text" id="datainput" value={qrsize} placeholder="Enter size for QR code"onChange={(e)=>setQrsize(e.target.value)}></input>
                <button class="generate-btn" disabled={loading} onClick={generateqrCode}>Generate QR code</button>
                <button class="download-btn" onClick={downloadqr}>Download QR code</button>
          
            </div>
            </div>
    )
}

export default Qrcode
