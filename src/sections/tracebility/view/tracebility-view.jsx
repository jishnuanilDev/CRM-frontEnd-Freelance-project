import { useState, useCallback, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import SearchBoxWithDropdown from '../../../layouts/components/searchDropdown'
import { _users } from 'src/_mock'
import { DashboardContent } from 'src/layouts/dashboard'
import { Collapse, TableCell, TableHead, TableRow } from '@mui/material'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { TracebilityHead } from '../tracebility-table-head'
import { TracebilityBar } from '../tracebility-table-toolbar'
import { TracebilityRow } from '../tracebility-table-row'
import { TableNoData } from '../table-no-data'

import { TracebilityProductionRow } from '../production-tracebility-row'
import { TableEmptyRows } from '../table-empty-rows'
import { emptyRows, applyFilter, getComparator } from '../utils'
import VendorManagementForm from '../../../layouts/modals/addVendorManagement'
import axiosInstance from 'src/configs/axiosInstance'
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress'
import { varAlpha } from 'src/theme/styles'

// ----------------------------------------------------------------------

export function TracebilityView () {
  const table = useTable()
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [vendors, setVendors] = useState([])
  const [materialData, setMaterialData] = useState([])
  const [finishedGoodsData, setFinishedGoodsData] = useState([])
  const [isTableVisible, setIsTableVisible] = useState(false)
  const [isTableVisible2, setIsTableVisible2] = useState(false)
  const [isTableVisible3, setIsTableVisible3] = useState(false)

  const [production, setProduction] = useState([])
  const handleSearchMaterialsResults = (results) => {
  
    setMaterialData(results);
    setIsTableVisible(true);
  };

  const handleProductionResults = (results) => {
    setProduction(results);
    setIsTableVisible(false);
    setIsTableVisible2(true)
   
  };



  const handleToggle = () => {
    setIsTableVisible(prev => !prev)
  }
  const handleToggle2 = () => {
    setIsTableVisible2(prev => !prev)
  }
  const handleToggle3 = () => {
    setIsTableVisible3(prev => !prev)
  }
  const fetchVendorManagement = async () => {
    try {
      setLoading(true)
      const result = await axiosInstance.get('/vendorManagement')
      if (result.data.data) {
        setVendors(result.data.data)
        setLoading(false)
      }
    } catch (err) {
      console.error(
        'Error occured in fetching vendors inc client side',
        err.message
      )
    }
  }
  const [filterName, setFilterName] = useState('')
  useEffect(() => {
    fetchVendorManagement()
  }, [update])

  const dataFiltered = applyFilter({
    inputData: materialData,
    comparator: getComparator(table.order, table.orderBy),
    filterName
  })

  const dataFilteredProduction = applyFilter({
    inputData: production,
    comparator: getComparator(table.order, table.orderBy),
    filterName
  })


  // const dataFilteredFinishedGoo = applyFilter({
  //   inputData: materialData,
  //   comparator: getComparator(table.order, table.orderBy),
  //   filterName
  // })

  const notFound = !dataFiltered.length && !!filterName

  const renderFallback = (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      flex='1 1 auto'
    >
      <LinearProgress
        sx={{
          width: 1150,
          bgcolor: theme =>
            varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
          [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' }
        }}
      />
    </Box>
  )
  return (
    <DashboardContent>
      <Box display='flex' alignItems='center' mb={5}>
        <Typography variant='h4' flexGrow={1}>
          Tracebility
        </Typography>
        {/* <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          New user
        </Button> */}


      </Box>
      <Box mb={2}>
        <SearchBoxWithDropdown onSearchMaterials={handleSearchMaterialsResults}/>
      </Box>
      <Card
        sx={{
          p: 2,
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          height: 'auto',
          maxHeight: '500px',
          overflow: 'auto'
        }}
      >
      
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography
            variant='h8'
            sx={{
              ml: 2,
              backgroundColor: '#d1aa3d', // Blue background
              padding: '4px 15px', // Padding inside the Typography
              borderRadius: '10px', // More curved edges
              color: 'white', // White text for contrast
            }}
          >
            Raw Materials
          </Typography>
          <Button
              color="inherit"
            variant='contained'
            onClick={handleToggle}
            sx={{
              textTransform: 'none'
            }}
          >
            {isTableVisible ? 'Hide ' : 'Show'}
          </Button>
        </Box>
     
        <Collapse in={isTableVisible}>
        {loading && renderFallback}
          <TracebilityBar
            sort={table.onSort}
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={event => {
              setFilterName(event.target.value)
              table.onResetPage()
            }}
          />
 
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <TracebilityHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={materialData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     _users.map((user) => user.id)
                  //   )
                  // }
                  headLabel={[
                    { id: 'materialCode', label: 'Material Code' },
                    { id: 'materiaLName', label: 'Material Name' },
                    { id: 'batchNumber', label: 'Batch Number' },
                    { id: 'quantity', label: 'Quantity In Kg' },
                    { id: 'price', label: 'Price' },
                    { id: 'storageLocation', label: 'Storage Location'},
                    { id: 'vendorName', label: 'Vendor Name' },
                    { id: 'dateRecieved', label: 'Date Recieved' },
                    { id: 'expiryDate', label: 'Expiry' },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <TracebilityRow
                      setProduction={handleProductionResults}
                        setUpdate={setUpdate}
                        key={index}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      materialData.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
                page={table.page}
                count={materialData.length}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              />
            </TableContainer>
          </Scrollbar>
        </Collapse>
      </Card>

      <Card
        sx={{
          p: 2,
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          mt: 2
        }}
      >
   
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography
            variant='h8'
            sx={{
              ml: 2,
              backgroundColor: '#0aa155', // Blue background
              padding: '4px 15px', // Padding inside the Typography
              borderRadius: '8px', // More curved edges
              color: 'white', // White text for contrast
            }}
          >
            Production
          </Typography>
          <Button
              color="inherit"
            variant='contained'
            onClick={handleToggle2}
            sx={{
              textTransform: 'none'
            }}
          >
            {isTableVisible2 ? 'Hide ' : 'Show '}
          </Button>
        </Box>
        <Collapse in={isTableVisible2}>
        {loading && renderFallback}
          <TracebilityBar
            sort={table.onSort}
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={event => {
              setFilterName(event.target.value)
              table.onResetPage()
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <TracebilityHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={vendors.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     _users.map((user) => user.id)
                  //   )
                  // }
                  headLabel={[
                    { id: 'dateofProduction ', label: 'Date of Production ' },
                    { id: 'processOrderNumber', label: 'Process Order Number' },
                    { id: 'plant', label: 'Plant' },
                    { id: 'rawMaterialList', label: 'Raw Material List' },
                    {
                      id: 'yieldQuantity ',
                      label: 'Yield Quantity '
                    },
                    { id: 'operator', label: 'Operator' },
             
                  ]}
                />
                <TableBody>
                  {dataFilteredProduction
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <TracebilityProductionRow
                        setUpdate={setUpdate}
                        key={index}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      vendors.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
                page={table.page}
                count={vendors.length}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              />
            </TableContainer>
          </Scrollbar>
        </Collapse>
      </Card>

      <Card
        sx={{
          p: 2,
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          height: 'auto',
          maxHeight: '500px',
          overflow: 'auto'
        }}
      >
      
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography
            variant='h8'
            sx={{
              ml: 2,
              backgroundColor: '#027aba', // Blue background
              padding: '4px 15px', // Padding inside the Typography
              borderRadius: '10px', // More curved edges
              color: 'white', // White text for contrast
            }}
          >
            Packing and Shipping
          </Typography>
          <Button
              color="inherit"
            variant='contained'
            onClick={handleToggle3}
            sx={{
              textTransform: 'none'
            }}
          >
            {isTableVisible3 ? 'Hide ' : 'Show'}
          </Button>
        </Box>
     
        <Collapse in={isTableVisible3}>
        {loading && renderFallback}
          <TracebilityBar
            sort={table.onSort}
            numSelected={table.selected.length}
            filterName={filterName}
            onFilterName={event => {
              setFilterName(event.target.value)
              table.onResetPage()
            }}
          />
 
          <Scrollbar>
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <TracebilityHead
                  order={table.order}
                  orderBy={table.orderBy}
                  rowCount={vendors.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     _users.map((user) => user.id)
                  //   )
                  // }
                  headLabel={[
                    { id: 'invoiceNumber', label: 'Invoice Number' },
                    { id: 'invoiceDate', label: 'Invoice Date' },
                    { id: 'customerName', label: 'Customer Name' },
                    { id: 'quantityForDispatch', label: 'Quantity for dispatch' },
                    { id: 'storage', label: 'Storage' },
                    { id: 'FgReceived', label: 'FG received'},
                    { id: 'balanceQuantity', label: 'Balance Quantity' },
                    { id: 'dateOfFgInward', label: 'Date of FG Inward' },
                 
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <TracebilityRow
                        setUpdate={setUpdate}
                        key={index}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={68}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      vendors.length
                    )}
                  />

                  {notFound && <TableNoData searchQuery={filterName} />}
                </TableBody>
              </Table>
              <TablePagination
                component='div'
                page={table.page}
                count={vendors.length}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={table.onChangeRowsPerPage}
              />
            </TableContainer>
          </Scrollbar>
        </Collapse>
      </Card>
    </DashboardContent>
  )
}

// ----------------------------------------------------------------------

export function useTable () {
  const [page, setPage] = useState(0)
  const [orderBy, setOrderBy] = useState('name')
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selected, setSelected] = useState([]) // Ensure this is an array
  const [order, setOrder] = useState('asc')

  const onSort = useCallback(
    id => {
      const isAsc = orderBy === id && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(id)
    },
    [order, orderBy]
  )

  const onSelectAllRows = useCallback((checked, newSelecteds) => {
    if (checked) {
      setSelected(newSelecteds)
    } else {
      setSelected([])
    }
  }, [])

  const onSelectRow = useCallback(inputValue => {
    setSelected(prevSelected => {
      if (prevSelected.includes(inputValue)) {
        return prevSelected.filter(value => value !== inputValue)
      } else {
        return [...prevSelected, inputValue]
      }
    })
  }, [])

  const onResetPage = useCallback(() => {
    setPage(0)
  }, [])

  const onChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [])

  const onChangeRowsPerPage = useCallback(
    event => {
      setRowsPerPage(parseInt(event.target.value, 10))
      onResetPage()
    },
    [onResetPage]
  )

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage
  }
}