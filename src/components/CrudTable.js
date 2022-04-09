import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ImageList, ImageListItem } from "@mui/material";
import { getRequest } from "../httpService/axiosVerbs";
import { UpdateProductButton } from "./UpdateProductButton";
import { DeleteProductButton } from "./DeleteProductButton";

export const CrudTable = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data },
      } = await getRequest("products");
      setRows(data);
    };
    fetchData();
  }, []);

  const rowsToMap = rows.map((product) => {
    return {
      id: product._id,
      productImage: product.productImage,
      productName: product.productName,
      price: product.price,
      stock: product.stock,
      description: product.description,
      category: product.category,
    };
  });
  const principalCols = [
    "Product ID",
    "Product Image",
    "Product Name",
    "Price",
    "Stock",
    "Description",
    "Category",
    "Actions",
  ];

  return (
    <div className="crud-container">
      <Table sx={{ width: 1 / 2, margin: "auto" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {principalCols.map((col, i) => (
              <TableCell key={i}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsToMap.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="left">
                <ImageList
                  sx={{
                    width: 150,
                    height: 150,
                    display: "grid",
                    alignItems: "center",
                  }}
                >
                  <ImageListItem sx={{ left: "50%" }}>
                    <img src={row.productImage} alt={row.productName}></img>
                  </ImageListItem>
                </ImageList>
              </TableCell>
              <TableCell align="center">{row.productName}</TableCell>
              <TableCell align="center"> $ {row.price}</TableCell>
              <TableCell align="center">{row.stock}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.category.categoryName}</TableCell>
              <TableCell>
                <UpdateProductButton product={row} setRows={setRows} />
                <DeleteProductButton product={row} setRows={setRows} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
