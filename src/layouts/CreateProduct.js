import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Divider, TextField } from "@mui/material";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../httpService/axiosVerbs";
import FormData from "form-data";
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

export const CreateProduct = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState({ id: "", categoryName: "" });
  const productImageRef = useRef("");
  const producNameRef = useRef("");
  const productPriceRef = useRef("");
  const productStockRef = useRef("");
  const productDescriptionRef = useRef("");
  const productCategoryIdRef = useRef("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePostProduct = async (e) => {
    e.preventDefault();

    const payload = {
      productImage: productImageRef.current.files[0],
      productName: producNameRef.current.value,
      price: productPriceRef.current.value,
      description: productDescriptionRef.current.value,
      stock: productStockRef.current.value,
      category: productCategoryIdRef.current.value,
    };

    const form = new FormData();
    form.append("productImage", payload.productImage);
    form.append("productName", payload.productName);
    form.append("price", parseInt(payload.price));
    form.append("description", payload.description);
    form.append("stock", +payload.stock);
    form.append("category", category.id);
    const { status } = await postRequest("products/", form);
    if (status === 204) {
      console.log("product created");
    }
  };
  return (
    <div>
      <Box sx={style} component="form">
        <div>
          <Typography>Product image: </Typography>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" ref={productImageRef} />
          </Button>
        </div>
        <br />
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

        <Divider />
        <CategoriesSelect setCategory={setCategory} />
        <Button onClick={handlePostProduct}>Save Product</Button>
      </Box>
    </div>
  );
};
