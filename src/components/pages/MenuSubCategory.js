import React, { useState } from "react";
import copy from "copy-to-clipboard";
import { useDebouncedCallback } from "use-debounce";
import { LuCopyCheck } from "react-icons/lu";
import { IoMdCopy } from "react-icons/io";
import Modal from "../reUsableCmponent/modal/Modal";
import {
  useAddZoneMutation,
  useDeleteZoneMutation,
  useEditZoneMutation,
  useGetZonesQuery
} from "../../api/zones";
import Pagination from "../Pagination";
import { PUBLIC_USER_FRONTEND_URL } from "../../common/utils";
import { toast } from "sonner";
import { MenuCategoryData, vendorData } from "../../constants/tableData";
import { BiSolidDownArrow } from "react-icons/bi";

const MenuSubCategory = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const isLoading = false;
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const handleBlockModalClose = () => {
    setShowBlockPopup(false);
  };
  // const { data, isLoading, refetch } = useGetZonesQuery({
  //   limit,
  //   page: currentPage,
  //   search: searchValue,
  // });
  const [addZone, { isLoading: isLoadingMutation }] = useAddZoneMutation();
  const [copied, setCopied] = useState("");

  const [deleteZone, { isLoading: isLoadingDelete }] = useDeleteZoneMutation();
  const [EditZone, { isLoading: isLoadingEdit }] = useEditZoneMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const name = formData.get("name"); // Get email input value
    const description = formData.get("description");
    const body = {
      name,
      description
    };
    try {
      if (editPopupData) {
        formData.append("zoneId", editPopupData?._id);
        const editBody = {
          ...body,
          zoneId: editPopupData?._id
        };
        const res = await EditZone?.(editBody);
        if (res?.data?.success) {
          // refetch({ page: 1 });
          toggleModal();
          setEditPopupData(null);
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF" // Text color
            },
            dismissible: true
          });
        }
      } else {
        const res = await addZone?.(body);
        if (res?.data?.success) {
          // refetch();
          toggleModal();
        } else {
          toast.error(res.data.message, {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF" // Text color
            },
            dismissible: true
          });
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditClick = (zone) => {
    toggleModal();
    setEditPopupData(zone);
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedZoneId(id);
  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async () => {
    try {
      const body = {
        zoneId: selectedZoneId
      };
      const deleteres = await deleteZone?.(body);
      if (deleteres?.data?.success) {
        toast.success(deleteres?.data?.msg, {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "green", // Custom green color for success
            color: "#FFFFFF" // Text color
          },
          dismissible: true
        });
        // refetch();
        setSelectedZoneId(null);
        setShowDeletePopup(false);
      } else {
        toast.error(deleteres.data.message, {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "#fb0909", // Custom green color for success
            color: "#FFFFFF" // Text color
          },
          dismissible: true
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleModalClose = () => {
    toggleModal();
    setEditPopupData(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };
  const handleSearchChange = useDebouncedCallback(
    // function
    (value) => {
      setSearchValue(value ?? "");
    },
    500
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCopy = async (value, mainJudge) => {
    if (mainJudge) {
      setCopied(value);
      copy(PUBLIC_USER_FRONTEND_URL + "/participant/" + value);
      setTimeout(() => {
        setCopied("");
      }, 2000);
    } else {
      toast.error("Please add at least one main judge in this zone.", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#fb0909", // Custom green color for success
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
    }
  };
  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Sub Category</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            <span
              className="bg-[#E88B13] hover:bg-[#E88B13] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
              onClick={toggleModal}>
              Add sub Category
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={
                editPopupData ? "Edit sub Category" : "Add sub Category"
              }>
              <div
                style={{
                  maxHeight: "80vh",
                  overflowY: "auto",
                  padding: "24px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  position: "relative"
                }}>
                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleModalClose}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontSize: "20px",
                    color: "#666",
                    background: "none",
                    border: "none",
                    cursor: "pointer"
                  }}>
                  ×
                </button>

                <form
                  onSubmit={handleModalClose}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                  {/* Zone Name */}
                  <div>
                    <label
                      htmlFor="name"
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333"
                      }}>
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      defaultValue={editPopupData ? editPopupData?.name : ""}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        fontSize: "14px"
                      }}
                    />
                  </div>

                  {/* Menu ID */}
                  <div>
                    <label
                      htmlFor="menuId"
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333"
                      }}>
                      Menu ID
                    </label>
                    <input
                      type="text"
                      name="menuId"
                      id="menuId"
                      required
                      defaultValue={editPopupData ? editPopupData?.id : ""}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        fontSize: "14px"
                      }}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333"
                      }}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      required
                      defaultValue={
                        editPopupData ? editPopupData?.description : ""
                      }
                      style={{
                        width: "100%",
                        height: "80px",
                        padding: "10px",
                        marginTop: "6px",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        fontSize: "14px",
                        resize: "none"
                      }}
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label
                      htmlFor="image"
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#333"
                      }}>
                      Upload Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "6px",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        fontSize: "14px"
                      }}
                    />
                    {/* Image Preview */}
                    {(imagePreview || editPopupData) && (
                      <div style={{ marginTop: "8px" }}>
                        <img
                          src={imagePreview ?? "/constants/category.png"}
                          alt="Preview"
                          style={{
                            width: "100%",
                            height: "80px",
                            objectFit: "cover",
                            borderRadius: "8px"
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div style={{ textAlign: "center" }}>
                    <button
                      disabled={isLoadingMutation || isLoadingEdit}
                     onClick={handleModalClose}
                      style={{
                        backgroundColor: "#E88B13",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "12px 24px",
                        borderRadius: "24px",
                        border: "none",
                        cursor: "pointer",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                      }}>
                      {isLoadingMutation || isLoadingEdit
                        ? "loading..."
                        : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
            <Modal isVisible={showBlockPopup} onClose={handleBlockModalClose}>
              <h3 className="flex self-center text-lg font-bold">
                Are you sure want to Block/Unblock?
              </h3>
              <div className="flex justify-center p-6">
                <button
                  onClick={handleBlockModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl">
                  No
                </button>
                <button
                  onClick={handleBlockModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
                  YES
                </button>
              </div>
            </Modal>

            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
              <h3 className="flex justify-center self-center text-md font-bold">
                Are you sure want to Delete?
              </h3>
              <div className="flex justify-center p-6">
                <button
                  onClick={handleDeleteModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl">
                  No
                </button>
                <button
                  disabled={isLoadingDelete}
                  onClick={handleDeleteModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
                  YES
                </button>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
        {/* Parent div for span elements */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
            placeholder="Search by name"
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
          />
        </span>
        <span className="flex items-center ">
          <span className="cursor-pointer bg-[#E88B13] hover:bg-[#E88B13] text-white p-2 lg:w-[100px] text-center rounded-3xl">
            Search
          </span>
        </span>
      </div>

      <table className="min-w-full table-auto mt-6 border-collapse">
        <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
          <tr>
            <th className="px-2 py-2 text-left border-r border-gray-400">
              Sl No
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Name
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">Id</th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Description
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Status
            </th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-70 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            MenuCategoryData?.map((zone, index) => (
              <tr
                className="odd:bg-[#FCD199] even:bg-white border-[2px] border-opacity-50 border-[#9e9696]"
                key={index}>
                <td className="px-4 py-2 border-r border-gray-400">
                  {index + 1}
                </td>
                <td
                  style={{ cursor: "pointer" }}
                  className="px-4 py-2 border-r border-gray-400">
                  <u
                    style={{ cursor: "pointer", textDecoration: "none" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <img
                        alt="pics"
                        src={zone?.image}
                        className="w-10 h-10 rounded-full mr-2"
                      />
                      {zone?.name}{" "}
                    </div>
                  </u>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {zone?.id}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <div className="flex -space-x-3">{zone?.description}</div>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    onClick={() => setShowBlockPopup(true)}
                    className={`py-2 px-5 flex space-x-2 items-center ${
                      zone?.status
                        ? " text-[#FF0404] border-[#FF0404]"
                        : "  border-[#15d057] text-[#15d057]"
                    } rounded-full  border `}>
                    {" "}
                    <span>{zone?.status ? "Blocked" : "Unblocked"}</span>
                    <BiSolidDownArrow className="text-black" />
                  </button>
                </td>

                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    // disabled={isLoadingBlock}
                    onClick={() => handleEditClick(zone)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(zone?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-6 h-6 rounded-full mr-2 fill-red-500"
                    />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="m-auto flex justify-end">
        <Pagination
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={vendorData?.length}
        />
      </div>
    </>
  );
};

export default MenuSubCategory;
