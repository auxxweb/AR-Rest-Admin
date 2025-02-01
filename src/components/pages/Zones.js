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
import { vendorData } from "../../constants/tableData";
import { BiSolidDownArrow } from "react-icons/bi";
import { newOrdersTableData } from "../../constants/orderTableData";

const Zones = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const isLoading = false;
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
        <h2 className="text-2xl font-semibold text-gray-700">New Orders</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            {/* <span
              className="bg-[#808080] hover:bg-[#F8BF40] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
              onClick={toggleModal}>
              Add Order
            </span> */}

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={"Move to kitchen"}>
                  <h3 className="flex justify-center self-center text-md font-bold">
                Move to Kitchen
              </h3>
             
              <div className="flex justify-center p-6">
                <button
                  onClick={handleModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl">
                  Cancel
                </button>
                <button
                  disabled={isLoadingDelete}
                  onClick={handleModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
                  Confirm
                </button>
              </div>
            </Modal>
            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
              <h3 className="flex justify-center self-center text-md font-bold">
                Are you sure want to Reject?
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
          <span className="cursor-pointer bg-[#808080] hover:bg-[#F8BF40] text-white p-2 lg:w-[100px] text-center rounded-3xl">
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
              Order ID
            </th>
            {/* <th className="px-4 py-4 text-left border-r border-gray-400">Id</th> */}
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Order Time
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Table No
            </th>
            <th className="px-4 py-4 text-left">Items</th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-70 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            newOrdersTableData?.map((zone, index) => (
              <tr
                className="odd:bg-[#FCD199] even:bg-white border-[2px] border-opacity-50 border-[#9e9696]"
                key={index}>
                <td className="px-4 py-2 border-r border-gray-400">
                  {index + 1}
                </td>
                {/* <td
                  style={{ cursor: "pointer",textDecoration:"none" }}
                  className="px-4 py-2 border-r border-gray-400">
                  <u
                    style={{ cursor: "pointer" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}>
                   <div style={{display:"flex",gap:"1rem"}}> */}
                    {/* <img
                      alt="pics"
                      src={zone?.orderId}
                      className="w-10 h-10 rounded-full mr-2"
                    /> */}
                     {/* {zone?.name}{" "} */}
                     {/* </div> */}
                  {/* </u> */}
                {/* </td> */}
                <td className="px-4 py-2 border-r border-gray-400">
                  {zone?.orderId}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                {zone?.orderTime}
                </td>
                  <td className="px-4 py-2 border-r border-gray-400">
                               
                  {zone?.tableNo}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {zone?.menu1}{" x  "}{zone?.quantity}{" "}{zone?.specialInstructions} <br /> {zone?.menu2}{"  x  "}{zone?.quantity}{"  "}{zone?.specialInstructions}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    onClick={() => handleEditClick(zone)}
                    className="text-[#808080] hover:text-[#F8BF40]">
                    <img
                      alt="pics"
                      src="/icons/cook.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(zone?._id)}>
                    <img
                      alt="pics"
                      src="/icons/cancel.svg"
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

export default Zones;
