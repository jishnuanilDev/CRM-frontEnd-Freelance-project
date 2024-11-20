import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Input} from "@nextui-org/react";
import Modal from '@mui/material/Modal';
import { Iconify } from 'src/components/iconify';
import axiosInstance from 'src/configs/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import '../../global.css'
import { TextField, Container,MenuItem, Grid, Paper } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function GateEntryForm({setUpdate,firmNames}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
     vehicleNumber: '', 
     vendorName: '', 
     date: '', 
    });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicleNumber) newErrors.vehicleNumber = 'Vehicle Number is required';
    if (!formData.vendorName) newErrors.vendorName = 'Vendor Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if there are no errors
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
   
    if (!validateForm()) {
       return;
      }
try{
    const result = await axiosInstance.post('/newGateEntry',formData);
    if(result){
        toast.success(result.data.message);
        handleClose();
        setFormData({
            vehicleNumber: '', 
            vendorName: '', 
            date: '', 
           })
           setUpdate(prev=>!prev);
    }
   

}catch(err){
    toast.success(err.response.data.message);
    console.error('Error occured in adding vendor management client side');
}
    
   
  };
  return (
    <div>
  <Toaster
  position="top-center"
  reverseOrder={false}
/>
            <Button
            onClick={handleOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
         New Gate Entry
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}

<Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 5, backgroundColor: '#f9f9f9', borderRadius: 3 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography component="h1" variant="h5" fontWeight="bold" color="primary" gutterBottom>
           Add New Gate Entry
          </Typography>
          <Typography variant="body2" color="textSecondary">
          Gate Entry Management
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Vehicle Number"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
              />
            </Grid>
            <Grid item xs={6}>
            <TextField
                    fullWidth
                    select
                    label='Vendor Name'
                    name='vendorName'
                    value={formData.vendorName}
                    onChange={handleChange}
                    error={!!errors.vendorName}
                    helperText={errors.vendorName}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  >
                    {firmNames.map((firm, index) => (
                      <MenuItem key={index} value= {firm}>
                   {firm}
                      </MenuItem>
                    ))}

                    {/* This item only triggers navigation, not a form selection */}
                    <MenuItem
                      onClick={() => navigate('/vendor-management')}
                      sx={{ fontStyle: 'italic' }} // Optional styling
                    >
                      Add New Firm +
                    </MenuItem>
                  </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type='date'
                value={formData.date}
                onChange={handleChange}
                error={!!errors.date}
                helperText={errors.date}
                variant="outlined"
                InputProps={{ style: { borderRadius: 8 } }}
                InputLabelProps={{
                    shrink: true, 
                  }}
              />
            </Grid>
         
          </Grid>
          <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    mt: 4,
    py: 1.5,
    fontWeight: 'bold',
    borderRadius: 8,
    background: 'linear-gradient(90deg, #4a90e2, #3b5998)',
    color: 'white',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(90deg, #3b5998, #4a90e2)',
    },
  }}
>
 Submit
</Button>

        </Box>
      </Paper>
    </Container>
      </Modal>
    </div>
  );
}