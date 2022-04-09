import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ImageList, ImageListItem } from "@mui/material";
import { getRequest } from "../httpService/axiosVerbs";
import { UpdateCategoryButton } from "../components/UpdateCategoryButton";
import { DeleteCategoryButton } from "../components/DeleteCategoryButton";

export const CategoryCrudTable = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data },
      } = await getRequest("categories");
      setRows(data);
    };
    fetchData();
  }, []);

  const rowsToMap = rows.map((category) => {
    return {
      id: category._id,
      categoryName: category.categoryName,
    };
  });
  const principalCols = ["Product ID", "Category Name", "Actions"];

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
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.categoryName}</TableCell>
              <TableCell>
                <UpdateCategoryButton category={row} setRows={setRows} />
                <DeleteCategoryButton category={row} setRows={setRows} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
