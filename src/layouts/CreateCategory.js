import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, TextField } from "@mui/material";
import { postRequest } from "../httpService/axiosVerbs";
import { CategoriesSelect } from "../components/CategorySelect";
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

export const CreateCategory = () => {
  const [open, setOpen] = useState(false);
  const categoryNameRef = useRef("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostCategory = async (e) => {
    e.preventDefault();

    const payload = {
      categoryName: categoryNameRef.current.value,
    };

    const { status } = await postRequest("categories/", payload);
    if (status === 204) {
      console.log("category created");
    }
  };
  return (
    <div>
      <Box sx={style} component="form">
        <TextField
          id="name"
          label="Category Name"
          inputRef={categoryNameRef}
        ></TextField>

        <Divider />
        <Button onClick={handlePostCategory}>Save Product</Button>
      </Box>
    </div>
  );
};
