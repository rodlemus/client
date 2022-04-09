import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, TextField } from "@mui/material";
import { getRequest, patchRequest } from "../httpService/axiosVerbs";
import FormData from "form-data";
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

export const UpdateProductButton = ({ product, setRows }) => {
  const [open, setOpen] = useState(false);
  const productImageRef = useRef("");
  const producNameRef = useRef("");
  const productPriceRef = useRef("");
  const productStockRef = useRef("");
  const productDescriptionRef = useRef("");
  const productCategoryIdRef = useRef("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const payload = {
      productImage: productImageRef.current.files[0],
      productName: !producNameRef.current.value
        ? product.producName
        : producNameRef.current.value,
      price: !productPriceRef.current.value
        ? product.price
        : productPriceRef.current.value,
      description: !productDescriptionRef.current.value
        ? product.description
        : productDescriptionRef.current.value,
      stock: !productStockRef.current.value
        ? product.stock
        : productStockRef.current.value,
      category: !productCategoryIdRef.current.value
        ? product.category._id
        : productCategoryIdRef.current.value,
    };

    const form = new FormData();
    form.append("productImage", payload.productImage);
    form.append("productName", payload.productName);
    form.append("price", parseInt(payload.price));
    form.append("description", payload.description);
    form.append("stock", +payload.stock);
    form.append("category", payload.category);
    const { status } = await patchRequest(`products/${product.id}`, form);
    if (status === 204) {
      const {
        data: { data },
      } = await getRequest("products");
      setRows(data);
    }
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
          <div>
            <Typography>Product image: </Typography>
            <Button variant="contained" component="label">
              Upload File
              <input type="file" ref={productImageRef} />
            </Button>
          </div>
          <TextField
            id="name"
            label="Product Name"
            inputRef={producNameRef}
          ></TextField>
          <TextField
            id="price"
            label="Product Price"
            inputRef={productPriceRef}
          ></TextField>
          <TextField
            id="stock"
            label="Product Stock"
            inputRef={productStockRef}
          ></TextField>
          <TextField
            id="description"
            label="Product Description"
            inputRef={productDescriptionRef}
          ></TextField>
          <TextField
            id="category Id"
            label="Category Id"
            inputRef={productCategoryIdRef}
          ></TextField>
          <Divider />
          <Button onClick={handleUpdate}>Confirm Update</Button>
        </Box>
      </Modal>
    </div>
  );
};
