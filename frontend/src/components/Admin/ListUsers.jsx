import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import toast from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import { useGetAdminUsersQuery } from "../../redux/api/userApi";
const ListUsers = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetAdminUsersQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    // if (deleteError) {
    //   toast.error(deleteError?.data?.message);
    // }
    // if (isDeleteSuccess) {
    //   toast.success("Deleted user");
    //   navigate("/admin/users");
    // }
  }, [error]);

  // const deleteuserHandler = async (id) => {
  //   await deleteuser(id);
  // };
  if (isLoading) return <Loader />;

  const setUsers = () => {
    const users = {
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
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
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

    data?.users?.forEach((user) => {
      users.rows.push({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        actions: (
          <>
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-outline-success ms-2">
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return users;
  };
  return (
    <>
      <MetaData title={"All user"} />
      <AdminLayout>
        <h1 className="my-5"> {data?.users?.length} Users</h1>
        <MDBDataTable
          data={setUsers()}
          className="px-3"
          bordered
          striped
          hover
        />
      </AdminLayout>
    </>
  );
};

export default ListUsers;
