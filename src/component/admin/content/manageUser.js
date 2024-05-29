import { useEffect } from "react";
import AddUser from "./adduser";
import { getUser, paginateUser } from "../../../services";
import { useState } from "react";
import DisplayUser from "./displayUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";
import "./manageUser.css";
import ViewUser from "./viewUser";
import ReactPaginate from "react-paginate";
const ManageUser = () => {
  const [data, setData] = useState("");
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [dataUser, setDataUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState("");
  const getUserMain = async () => {
    try {
      const res = await getUser();
      setData(res.DT);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnclickUpDate = (user) => {
    setShowUpdateUser(true);
    setDataUser(user);
  };
  const handleOnclickDelete = (user) => {
    setShowDeleteUser(true);
    setDataUser(user);
  };
  const handleOnclickView = (user) => {
    setShowViewUser(true);
    setDataUser(user);
  };
  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };
  const hanllePaginate = async () => {
    const response = await paginateUser(3, currentPage);
    setPageCount(response?.DT?.totalPages);
    setData(response?.DT?.users);
  };
  useEffect(() => {
    hanllePaginate();
  }, [currentPage]);
  return (
    <>
      <div className="adduser">
        <AddUser setCurrentPage={setCurrentPage} />
      </div>
      <div className="hr"></div>
      <div className="user-content">
        <DisplayUser
          handleOnclickUpDate={handleOnclickUpDate}
          handleOnclickDelete={handleOnclickDelete}
          handleOnclickView={handleOnclickView}
          getUserMain={getUserMain}
          data={data}
        />
      </div>
      <UpdateUser
        show={showUpdateUser}
        setShow={setShowUpdateUser}
        dataUser={dataUser}
        hanllePaginate={hanllePaginate}
      />
      <DeleteUser
        show={showDeleteUser}
        setShow={setShowDeleteUser}
        dataUser={dataUser}
        hanllePaginate={hanllePaginate}
        setCurrentPage={setCurrentPage}
      />
      <ViewUser
        show={showViewUser}
        setShow={setShowViewUser}
        dataUser={dataUser}
      />
      <div className="paginate">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};
export default ManageUser;
