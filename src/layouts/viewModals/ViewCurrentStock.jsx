import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Input } from '@nextui-org/react'
import Modal from '@mui/material/Modal'
import { Iconify } from 'src/components/iconify'
import axiosInstance from 'src/configs/axiosInstance'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { parse, isValid } from 'date-fns'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material'
import '../../global.css'
import { TextField, Container, MenuItem, Grid, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function ViewCurrentStock ({
  materials,
  setUpdate,
  currentStockData
}) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [grnNumberType, setGrnNumberType] = useState('')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const formattedDate = currentStockData.dateRecieved
    ? new Date(currentStockData.dateRecieved).toISOString().split('T')[0]
    : ''
  const formattedExpDate = currentStockData.expiryDate
    ? new Date(currentStockData.expiryDate).toISOString().split('T')[0]
    : ''


  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      <MenuItem onClick={handleOpen}>
         <Iconify icon='solar:eye-bold' />
        View
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >

        <Container maxWidth='xl' sx={{ mt: 8 }}>
          <Paper
            elevation={4}
            sx={{ p: 5, backgroundColor: '#f9f9f9', borderRadius: 1 }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                component='h1'
                variant='h5'
                fontWeight='bold'
                color='primary'
                gutterBottom
              >
                View current Stock Details
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Current Stock Management
              </Typography>
            </Box>
            <Box component='form' >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Material Name'
                    name='materialName'
                    value={currentStockData.materialName}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                  >
                
    
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Material Code'
                    name='materialCode'
                    value={currentStockData.materialCode}
              
                    variant='outlined'
                    InputProps={{
                      style: { borderRadius: 8 },readOnly:true
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='GRN'
                    name='grn'
                    value={currentStockData.grn}
               
                    variant='outlined'
                    InputProps={{
                      style: { borderRadius: 8 },
                      readOnly:true,
                      placeholder: 'Auto-Generate'
                    }}
          
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Quantity In Unit'
                    name='quantity'
                    value={currentStockData.quantity}
               
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Price/Unit'
                    name='price'
                    value={currentStockData.price}
                 
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Storage Location'
                    name='storageLocation'
                    value={currentStockData.storageLocation}
                
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Vendor Name'
                    name='vendorName'
                    value={currentStockData.vendorName}
                 
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Date Recieved'
                    name='dateRecieved'
                    type='text'
                    value={formattedDate}
               
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                    InputLabelProps={{
                      shrink: true // Keeps the label above the field to avoid overlap
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Expiry'
                    name='expiryDate'
                    type='text'
                    value={formattedExpDate}
              
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 },readOnly:true }}
                    InputLabelProps={{
                      shrink: true // Keeps the label above the field to avoid overlap
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Modal>
    </div>
  )
}
