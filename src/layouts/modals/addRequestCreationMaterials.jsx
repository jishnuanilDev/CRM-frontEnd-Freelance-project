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
import { useNavigate } from 'react-router-dom'
import '../../global.css'
import { TextField, Container, MenuItem, Grid, Paper } from '@mui/material'
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

export default function RequestCreationForMaterialsForm ({
  setUpdate,
  materials,
  finishedGoods
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    requestNumber: '',
    batchNumber: '',
    materialName: '',
    quantity: '',
    requiredDate: ''
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.requestNumber)
      newErrors.requestNumber = 'Request Number is required'
    if (!formData.batchNumber)
      newErrors.batchNumber = 'Batch Number is required'
    if (!formData.materialName)
      newErrors.materialName = 'Material Name is required'
    if (!formData.quantity) newErrors.quantity = 'Quantity is required'
    if (!formData.requiredDate)
      newErrors.requiredDate = 'Required Date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Returns true if there are no errors
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMaterialChange = event => {
    const selectedMaterialName = event.target.value

    const selectedMaterial = materials.find(
      material => material.materialName === selectedMaterialName
    )

    setFormData({
      ...formData,
      materialName: selectedMaterialName,
      batchNumber: selectedMaterial?.batchNumber || '' 
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }
    try {
      const result = await axiosInstance.post(
        '/newRequestCreationForMaterials',
        formData
      )
      if (result) {
        toast.success(result.data.message)
        handleClose()
        setFormData({
          requestNumber: '',
          batchNumber: '',
          materialName: '',
          quantity: '',
          requiredDate: ''
        })
        setUpdate(prev => !prev)
      }
    } catch (err) {
      toast.success(err.response.data.message)
      console.error(
        'Error occured in adding newRequestCreationForMaterials in client side',
        err.message
      )
    }
  }
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      <Button
        onClick={handleOpen}
        variant='contained'
        color='inherit'
        startIcon={<Iconify icon='mingcute:add-line' />}
      >
        New Request Creation For Materials
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}

        <Container maxWidth='sm' sx={{ mt: 8 }}>
          <Paper
            elevation={4}
            sx={{ p: 5, backgroundColor: '#f9f9f9', borderRadius: 3 }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                component='h1'
                variant='h5'
                fontWeight='bold'
                color='primary'
                gutterBottom
              >
                Add New Request For Creation Materials
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Request Creation For Materials Management
              </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Request Number'
                    name='requestNumber'
                    value={formData.requestNumber}
                    onChange={handleChange}
                    error={!!errors.requestNumber}
                    helperText={errors.requestNumber}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Batch Number'
                    name='batchNumber'
                    value={formData.batchNumber}
                    onChange={handleChange}
                    error={!!errors.batchNumber}
                    helperText={errors.batchNumber}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    label='Material Name'
                    name='materialName'
                    value={formData.materialName}
                    onChange={handleMaterialChange}
                    error={!!errors.materialName}
                    helperText={errors.materialName}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  >
                    {/* Heading for Products */}
                    <MenuItem
                      disabled
                      sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
                    >
                      Materials
                    </MenuItem>
                    {materials.map((material, index) => (
                      <MenuItem
                        key={`product-${index}`}
                        value={material.materialName}
                      >
                        {material.materialName}
                      </MenuItem>
                    ))}
                    <MenuItem
                      onClick={() => navigate('/vendor-management')}
                      sx={{ fontStyle: 'italic' }}
                    >
                      Add New Material +
                    </MenuItem>

                    <MenuItem
                      disabled
                      sx={{ fontWeight: 'bold', fontStyle: 'italic' }}
                    >
                      Finished Goods
                    </MenuItem>
                    {finishedGoods.map((item, index) => (
                      <MenuItem key={`finished-${index}`} value={item}>
                        {item}
                      </MenuItem>
                    ))}

                    <MenuItem
                      onClick={() => navigate('/finished-goods')}
                      sx={{ fontStyle: 'italic' }}
                    >
                      Add New Finished Goods +
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Quantity'
                    name='quantity'
                    value={formData.quantity}
                    onChange={handleChange}
                    error={!!errors.quantity}
                    helperText={errors.quantity}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Required Date'
                    name='requiredDate'
                    type='date'
                    value={formData.requiredDate}
                    onChange={handleChange}
                    error={!!errors.requiredDate}
                    helperText={errors.requiredDate}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
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
                    background: 'linear-gradient(90deg, #3b5998, #4a90e2)'
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </Paper>
        </Container>
      </Modal>
    </div>
  )
}