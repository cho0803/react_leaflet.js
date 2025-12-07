//전역 데이터 받아오기
import { MapsContext, useContext, Modal, Paper } from ".";

export default function CustomModal ({ isOpen, closeModal, children }) {
    // const {Modal, Paper} = useContext(MapsContext)
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <Paper
        elevation={2}
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '30em',
          maxWidth: "100%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        {children}
      </Paper>
    </Modal>
  );
}