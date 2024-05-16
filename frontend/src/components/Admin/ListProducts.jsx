import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { useGetAdminProductsQuery } from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";
const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);
  if (isLoading) return <Loader />;

  const setProducts = () => {
    const products = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.products?.forEach((product) => {
      products.rows.push({
        id: product?._id,
        name: `${product?.name.substring(0, 20)}...`,
        price: product?.price,
        stock: product?.stock,
        actions: (
          <>
            <Link
              to={`/admin/products/${product?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <Link
              to={`/admin/product/${product?._id}/upload_images`}
              className="btn btn-outline-success ms-2"
            >
              <i className="fa fa-image"></i>
            </Link>
            <button className="btn btn-outline-success ms-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return products;
  };
  return (
    <>
      <MetaData title={"All Product"} />
      <AdminLayout>
        <h1 className="my-5"> {data?.products?.length} Products</h1>
        <MDBDataTable
          data={setProducts()}
          className="px-3"
          bordered
          striped
          hover
        />
      </AdminLayout>
    </>
  );
};

export default ListProducts;
