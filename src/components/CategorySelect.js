import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getRequest } from "../httpService/axiosVerbs";

export const CategoriesSelect = ({ setCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data },
      } = await getRequest("categories");
      setCategories(data);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    setCategory({
      id: event.target.value._id || "",
      categoryName: event.target.value.categoryName || "",
    });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="select-category-id"
          id="select-category"
          label="Categories"
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category._id} value={category}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
