import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../Admin/Dashboard";
import ListProducts from "../Admin/ListProducts";
import UpdateProduct from "../Admin/UpdateProducts";
import NewProduct from "../Admin/NewProduct";
import UploadImages from "../Admin/UploadImages";
import ListOrder from "../Admin/ListOrders";
import ProcessOrder from "../Admin/ProcessOrder";
import ListUsers from "../Admin/ListUsers";
import UpdateUser from "../Admin/UpdateUser";

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/admin/product/new"
        element={
          <ProtectedRoute admin={true}>
            <NewProduct />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id/upload_images"
        element={
          <ProtectedRoute admin={true}>
            <UploadImages />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <ListOrder />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <ListUsers />
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
