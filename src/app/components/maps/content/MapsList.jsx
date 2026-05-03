import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

//전역 데이터 받아오기
import { MapsContext, useContext, useState } from ".."

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default ({isModalListOpen, setIsModalListOpen}) => {
  const {data} = useContext(MapsContext)
  return (
    <>
    <CustomModal isOpen={isModalListOpen} closeModal={() => {setIsModalListOpen(false);}}>
       <TableContainer >
      <Table  sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow >
            <TableCell >id</TableCell>
            <TableCell >title</TableCell>
            <TableCell >content</TableCell>
            <TableCell >lat</TableCell>
            <TableCell >lng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item,index) =>(
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={item.id}>
              <TableCell > {index }  </TableCell> 
              <TableCell > {item.title}  </TableCell> 
              <TableCell > {item.content }  </TableCell> 
              <TableCell > {Number(item.lat).toFixed(2)}  </TableCell> 
              <TableCell > {Number(item.lng).toFixed(2)}  </TableCell> 
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>

  </CustomModal>

    </>
  )
}

//전역 데이터 받아오기
import { Modal, Paper } from "..";

export  function CustomModal ({ isOpen, closeModal, children }) {
    // const {Modal, Paper} = useContext(MapsContext)
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "relative",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '45em',
          // height: '100%',
          overflowY: "auto",
          padding: "calc(3 * 8px)",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}