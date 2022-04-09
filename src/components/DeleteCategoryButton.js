import React, { useState } from "react";
import Button from "@mui/material/Button";
import {
  deleteRequest,
  getRequest,
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

export const DeleteCategoryButton = ({ category, setRows }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    const { status } = await deleteRequest(`categories/${category.id}`);
    if (status === 204) {
      const {
        data: { data },
      } = await getRequest("categories");
      setRows(data);
    }
  };
  return (
    <div>
      <Button onClick={handleDelete} style={{ color: "red" }}>
        Delete
      </Button>
    </div>
  );
};
