import { useState, useCallback } from 'react';
import moment from "moment";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import EditGateEntryForm from '../../layouts/editModals/editGateEntry';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import Swal from 'sweetalert2'
import axiosInstance from 'src/configs/axiosInstance';
import toast, { Toaster } from 'react-hot-toast'
import ViewGateEntry from '../../layouts/viewModals/viewGateEntry';
// ----------------------------------------------------------------------



export function GateEntryTableRow({firmNames,setUpdate, row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const gateEntryData= {
    gateEntryId:row._id,
    entryTime:row.entryTime,
    vendorName:row.vendorName,
    vehicleNumber:row.vehicleNumber,
    date:row.date,
    docNumber:row.docNumber,
    materials:row.materials
  
  }
  const handleOpenPopover = useCallback((event) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);
  const handleDelete = async()=>{
    try {

      const gateEntryId = row._id;
      const result = await axiosInstance.delete(`/removeGateEntry?gateEntryId=${gateEntryId}`);
      if (result) {
        toast.success(result.data.message)
        setUpdate(prev => !prev)
      }
    } catch (err) {
      toast.success(err.response.data.message)
      console.error(
        'Error occured in removing gate entry in client side',
        err.message
      )
    }
  }

  const confirmDelete = ()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      backdrop: false
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  }
  const formatTo12Hour = (time24) => moment(time24, "HH:mm").format("h:mm A");
  const formattedTime = formatTo12Hour(row.entryTime);
  const handleMenuCloseAndConfirmDelete = () => {
    handleClosePopover(); // Close the popover or menu first
    setTimeout(() => {
      confirmDelete();
    }, 0); // Optional delay to ensure the popover is fully closed
  };
  return (
    <>
      <TableRow>
      {/* <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell> */}
        {/* <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.nameOfTheFirm}  />
          
          </Box>
        </TableCell> */}
           <TableCell>{row.vendorName}</TableCell>
           <TableCell>  {row.vehicleNumber}</TableCell>
              <TableCell
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {row.materials?.map((material, index) => (
                  <div
                    key={index}
                    style={{ marginRight: '10px' }}
                  >
                    <strong>{material.materialName}</strong>:{' '}
                    {`${material.quantity} KG`}
                  </div>
                  
                ))}
              </TableCell>
      
              <TableCell>
                {row.materials.map((material, index) => (
                  <div key={index}>{`${material.quantity} KG`}</div>
                ))}
              </TableCell>
           <TableCell>  {row.docNumber}</TableCell>
           <TableCell>{new Date(row.date).toLocaleDateString()}</TableCell>
        <TableCell>  {formattedTime}</TableCell>
     
     
   

   


        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
   <EditGateEntryForm firmNames={firmNames} setUpdate={setUpdate} gateEntryData={gateEntryData}/>
   <ViewGateEntry  gateEntryData={gateEntryData}/>
          <MenuItem onClick={handleMenuCloseAndConfirmDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete 
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
