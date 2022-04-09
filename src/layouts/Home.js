import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { getRequest } from "../httpService/axiosVerbs";
import CardProduct from "../components/CardProduct";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { data },
      } = await getRequest("products");
      setProducts(data);
    };
    fetchData();
  }, []);

  const productsMapped = products.map((product) => {
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

  return (
    <div className="cards-container">
      {productsMapped.map((product) => (
        <CardProduct product={product} />
      ))}
    </div>
  );
};
export default Home;
