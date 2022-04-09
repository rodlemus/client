import React from "react";
import Home from "./layouts/Home";
import { Route, Routes } from "react-router-dom";
import { AdminPanel } from "./layouts/AdminPanel";
import { Signin } from "./layouts/Signin";
import Nav from "./components/Nav";
import { Categories, CategoryCrudTable } from "./layouts/Categories";
import { Logout } from "./layouts/Logout";
import { AuthProvider } from "./components/Auth";
import { RequiredAuth } from "./components/RequiredAuth";
import { CreateProduct } from "./layouts/CreateProduct";
import { CreateCategory } from "./layouts/CreateCategory";

function App() {
  return (
    <div>
      <AuthProvider>
        <Nav></Nav>
        <Routes>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/" element={<Home />}></Route>

          <Route
            path="/admin"
            element={
              <RequiredAuth>
                <AdminPanel />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/createProduct"
            element={
              <RequiredAuth>
                <CreateProduct />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/categories"
            element={
              <RequiredAuth>
                <CategoryCrudTable />
              </RequiredAuth>
            }
          ></Route>
          <Route
            path="/createCategory"
            element={
              <RequiredAuth>
                <CreateCategory />
              </RequiredAuth>
            }
          ></Route>
          <Route path="/products" element={<Home />}></Route>
          <Route
            path="/logout"
            element={
              <RequiredAuth>
                <Logout />
              </RequiredAuth>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
