import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, TextField } from "@mui/material";
import {
  getRequest,
  patchJsonRequest,
  patchRequest,
} from "../httpService/axiosVerbs";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& .MuiTextField-root": { m: 1, width: "25ch" },
};

export const UpdateCategoryButton = ({ category, setRows }) => {
  const [open, setOpen] = useState(false);
  const categoryNameRef = useRef("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      categoryName: categoryNameRef.current.value,
    };
    console.log(payload);

    const { status } = await patchJsonRequest(
      `categories/${category.id}`,
      payload
    );
    if (status === 204) {
      const {
        data: { data },
      } = await getRequest("categories");
      setRows(data);
    }
    console.log(status);
  };
  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "green" }}>
        Update
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form">
          <TextField
            id="name"
            label="Category Name"
            inputRef={categoryNameRef}
          ></TextField>

          <Divider />
          <Button onClick={handleUpdate}>Confirm Update</Button>
        </Box>
      </Modal>
    </div>
  );
};
