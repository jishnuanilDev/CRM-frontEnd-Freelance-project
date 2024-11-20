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
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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

export default function EditMaterialAssignmentForm ({
  setUpdate,
  materialAssignmentData,
  materials,
  finishedGoods
}) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const navigate = useNavigate();
  const handleClose = () => setOpen(false)
  const [formData, setFormData] = useState({
    authPassword: '',
    materialAssignmentId: materialAssignmentData.materialAssignmentId,
    assignmentNumber: materialAssignmentData.assignmentNumber,
    batchNumber: materialAssignmentData.batchNumber,
    processOrderNumber: materialAssignmentData.processOrderNumber,
    materialName: materialAssignmentData.materialName,
    assignedQuantity: materialAssignmentData.assignedQuantity,
    assignedTo: materialAssignmentData.assignedTo
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.authPassword)
      newErrors.authPassword = 'Authorization Password is required'
    if (!formData.batchNumber)
      newErrors.batchNumber = 'Batch Number is required'
    if (!formData.processOrderNumber)
      newErrors.processOrderNumber = 'Process Order Number is required'
    if (!formData.assignmentNumber)
      newErrors.assignMentNumber = 'Assignment Number is required'
    if (!formData.materialName)
      newErrors.materialName = 'Material Name is required'
    if (!formData.assignedQuantity)
      newErrors.assignedQuantity = 'Assigned Quantity is required'
    if (!formData.assignedTo) newErrors.assignedTo = 'AssignedTo is required'

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
      const result = await axiosInstance
        .put('/editMaterialAssignment', formData)
        .then(result => {
          toast.success(result.data.message)
          handleClose()
          setFormData({
            authPassword: '',
            materialAssignmentId: '',
            assignmentNumber: '',
            batchNumber: '',
            processOrderNumber: '',
            materialName: '',
            assignedQuantity: '',
            assignedTo: ''
          })
          setUpdate(prev => !prev)
        })
        .catch(err => {
          toast.error(err.response.data.message)
          console.error(
            'Error occured in editing material assignment in client side',
            err.message
          )
        })
    } catch (err) {
      console.error(
        'Error occured in editing material assignment in client side',
        err.message
      )
    }
  }
  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
      <MenuItem onClick={handleOpen}>
        <Iconify icon='solar:pen-bold' />
        Edit
      </MenuItem>
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
                Edit Assignment Material Details
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Assignment Material Management
              </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Authorization Password'
                    type='password'
                    name='authPassword'
                    value={formData.authPassword}
                    onChange={handleChange}
                    error={!!errors.authPassword}
                    helperText={errors.authPassword}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Assignment Number'
                    name='assignmentNumber'
                    value={formData.assignmentNumber}
                    onChange={handleChange}
                    error={!!errors.assignmentNumber}
                    helperText={errors.assignmentNumber}
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
                    label='Process Order Number'
                    name='processOrderNumber'
                    value={formData.processOrderNumber}
                    onChange={handleChange}
                    error={!!errors.processOrderNumber}
                    helperText={errors.processOrderNumber}
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
                      <MenuItem key={`product-${index}`} value={material.materialName}>
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
                    label='Assigned Quantity'
                    name='assignedQuantity'
                    value={formData.assignedQuantity}
                    onChange={handleChange}
                    error={!!errors.assignedQuantity}
                    helperText={errors.assignedQuantity}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Assigned To'
                    name='assignedTo'
                    value={formData.assignedTo}
                    onChange={handleChange}
                    error={!!errors.assignedTo}
                    helperText={errors.assignedTo}
                    variant='outlined'
                    InputProps={{ style: { borderRadius: 8 } }}
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