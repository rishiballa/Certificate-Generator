import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useRef, useState, type ChangeEvent } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



// Define types
interface CertData {
  name: string;
  years: string;
  date: string;
}

const CapgeminiCert: React.FC = () => {

  const [Data,setData]=useState<CertData>({
    name:'Rishi Balla',
    years:'1 Year',
    date:'July 23, 2026'
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({...Data, [e.target.name]:e.target.value});
  }
  const Certificateref=useRef<HTMLDivElement>(null);

  const downloadPDF= async () => {
    const element= Certificateref.current;
    if(!element) return;

    const canvas= await html2canvas(element,{ scale:2, useCORS:true });
    const imgData= canvas.toDataURL('image/png');

    const pdf= new jsPDF({
      orientation:'landscape',
      unit:'pt',
      format:[canvas.width, canvas.height]
    })
    pdf.addImage(imgData,'PNG',0,0,canvas.width,canvas.height);
    pdf.save(`${Data.name}_Certificate.pdf`);
  }




  return <>
  <Box sx={{backgroundImage: 'url("./bg.jpg")', 
  
  // 2. Ensure it covers the whole screen perfectly
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed', // Keeps the image still when you scroll
  imageRendering: 'high-quality',
  minHeight: '100vh', 
  width: '100%', 
  py: 4 
    }}>
  <Box sx={{p:4, display:'flex', flexDirection:'column',alignItems:'center', gap:4}}>
    <Paper sx={{elivation:3, p:4, width:'100%', maxWidth:'600px'}}>
      <Typography variant='h6' sx={{mb:2}}>Edit Certificate Details</Typography>
      <Stack spacing={2}>
        <TextField required label="Employee Name" name="name" value={Data.name} onChange={handleChange} fullWidth />
        <TextField required label='Years of Service' name='years' value={Data.years} onChange={handleChange} fullWidth />
        <TextField required label='Presentation Date' name='date' value={Data.date} onChange={handleChange} fullWidth />  
        <Button disabled={Data.name.trim().length===0 || Data.date.trim().length===0 || Data.years.trim().length===0} variant="contained" onClick={downloadPDF} sx={{mt: 2, bgcolor: '#0070ad', '&:hover': { bgcolor: '#005a8c' }}}>Download Certificate as PDF
          </Button> 
        </Stack>
    </Paper>
  </Box>
  <Box ref={Certificateref} sx={{ maxWidth: '800px', margin: '0 auto', padding: '20px' ,position:'relative',bgcolor:'#ffffff', boxShadow:3}}>

    <img src='./certfinal.png' alt="Certificate Preview" style={{ width: '100%', height: 'auto', zIndex:'-1', display:'block' }} />
    <Box sx={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%' }}>
    <Typography variant="h4" align="center" sx={{ mt: '300px', textDecoration:'Underline', fontWeight:'Bold' }}  gutterBottom>
      {Data.name}
    </Typography>
    <Typography variant="h5" align="center"  gutterBottom>
      In Recognition of your <span style={{ color: '#00b1eb', fontWeight: 'Bold', textDecoration:'Underline' }}>
        {Data.years}
        </span> of valuable service at Capgemini.
    </Typography>
    <Typography variant="body1" align="center"  gutterBottom>
      Presented on: {} <Box component='span' sx={{ color: '#00b1eb', fontWeight: 'Bold', textDecoration:'Underline'}}>{Data.date}</Box>
    </Typography>

    
      </Box>
    </Box>
    <Typography
  variant="caption"
  component="a"
  href=''
  sx={{
    
    position: 'fixed',
    bottom: 10,
    right: 15,
    color: 'rgba(255, 255, 255, 0.6)', 
    fontWeight: 'bold',
    fontStyle: 'italic',
    zIndex: 1000,
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
  }}
>
  Done by Rishi Balla
</Typography>
    </Box>
  
    
    

 

  </>
  
};

export default CapgeminiCert;