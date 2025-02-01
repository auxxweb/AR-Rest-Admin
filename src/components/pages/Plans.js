import { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import Modal from "../reUsableCmponent/modal/Modal";
import Pagination from "../Pagination";
import { BiSolidDownArrow } from "react-icons/bi";

import {
  useAddJudgeMutation,
  useBlockJudgeMutation,
  useDeleteJudgeMutation,
  useEditJudgeMutation,
  useGetJudgesQuery
} from "../../api/judges";
import { useGetZonesListQuery } from "../../api/common";
import { IoIosClose, IoMdCopy } from "react-icons/io";
import FilterPopup from "../reUsableCmponent/filterPopup";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import copy from "copy-to-clipboard";
import { LuCopyCheck } from "react-icons/lu";
import JudgeAvatar from "../../assets/images/person-placeholder.png";
import { toast } from "sonner";
import { PlansTableData } from "../../constants/tableData";

const Plans = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [selectedJudgeId, setSelectedJudgeId] = useState(null);
  const [zonesList, setZonesList] = useState({});
  const [filterZonesList, setFilterZonesList] = useState([]);
  const [selectedZones, setSelectedZones] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [copied, setCopied] = useState("");
  const limit = 10;
  const isLoading = false;

  //   const { data, isLoading, refetch } = useGetJudgesQuery({
  //     limit,
  //     page: currentPage,
  //     search: searchValue,
  //     zones: selectedZones,
  //   });
  // const { data: zoneList, refetch: ZoneListsRefetch } = useGetZonesListQuery();
  const [addJudge, { isLoading: isLoadingMutation }] = useAddJudgeMutation({});
  const [deleteJudge, { isLoading: isLoadingDelete }] =
    useDeleteJudgeMutation();
  const [EditJudge, { isLoading: isLoadingEdit }] = useEditJudgeMutation();
  const [blockJudge, { isLoading: isLoadingBlock }] = useBlockJudgeMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // useEffect(() => {
  //   ZoneListsRefetch();
  // }, []);

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target);
    const isMain = !!formData?.get("isMain");

    if (!zonesList || !zonesList.value) {
      toast.warning("Please select a zone", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e9c70b", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
      return; // Stop the form from submitting if no zone is selected
    }

    formData?.append("zone", zonesList?.value);
    formData?.set("isMain", isMain);

    try {
      if (editPopupData) {
        formData?.append("judgeId", editPopupData?._id);
        const res = await EditJudge?.(formData);
        if (res?.data?.success) {
          //  refetch();
          // ZoneListsRefetch();
          setZonesList({});
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
        const res = await addJudge?.(formData);
        if (res?.data?.success) {
          //  refetch();
          // ZoneListsRefetch();
          setZonesList({});
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

  const handleEditClick = (judge) => {
    toggleModal();
    setEditPopupData(judge);
    setZonesList({ value: judge?.zone?._id, label: judge?.zone?.name });
    setImageUrl(judge?.image);
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedJudgeId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        judgeId: selectedJudgeId
      };
      const deleteres = await deleteJudge?.(body);
      if (deleteres?.data?.success) {
        //  refetch();
        setSelectedJudgeId(null);
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

  const handleChange = (selectedOptions) => {
    setZonesList(selectedOptions || {});
  };
  const handleFilterChange = (selectedOptions) => {
    setFilterZonesList(selectedOptions || {});
  };

  const handleShowBlockJudgePopup = (id) => {
    setSelectedJudgeId(id);
    setShowBlockPopup(true);
  };

  const handleBlockJudge = async () => {
    try {
      const body = {
        judgeId: selectedJudgeId
      };
      const deleteres = await blockJudge?.(body);
      if (deleteres?.data?.success) {
        //  refetch();
        setShowBlockPopup(false);
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
    setImageUrl(null);
    setZonesList({});
    toggleModal();
    setEditPopupData(null);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };
  const handleBlockModalClose = () => {
    setShowBlockPopup(false);
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

  const handlePreviewImage = (e) => {
    // Handle image upload if the image file is selected
    const imageFile = e.target.files[0]; // Access the selected image file
    if (imageFile && imageFile.size <= 5 * 1024 * 1024) {
      // Check if it's valid
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    } else {
      // Optionally, you could show an error toast here
      toast.warning("Please select a valid image file (less than 5 MB).", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#e5cc0e", // Custom red color for error
          color: "#FFFFFF" // Text color
        },
        dismissible: true
      });
      return; // Exit the function if there's no valid image
    }
  };

  // const selectOption = zoneList?.zones?.map((zone) => {
  //   return { value: zone?._id, label: zone?.name };
  // });

  const toggleFilterPopup = () => {
    setIsFilterPopupOpen(!isFilterPopupOpen);
  };
  const handleRemoveZone = (zonesToRemove) => {
    setFilterZonesList(
      filterZonesList.filter((zone) => zone.value !== zonesToRemove.value)
    );
  };

  const handleFilterClick = () => {
    setSelectedZones(filterZonesList?.map((zone) => zone?.value));
    toggleFilterPopup();
  };

  const handleShowPassword = (id) => {
    if (showPassword?.includes(id)) {
      setShowPassword(showPassword?.filter((filterId) => filterId !== id));
    } else {
      setShowPassword([...showPassword, id]);
    }
  };

  const handleCopy = async (value) => {
    setCopied(value);
    copy(value);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-gray-700">Offers</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            <span
              className="bg-[#E88B13] hover:bg-[#E88B13] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
              onClick={toggleModal}>
              Add Offers
            </span>

            <Modal
              isVisible={isModalVisible}
              onClose={handleModalClose}
              modalHeader={editPopupData ? "Edit Offer" : "Add Offer"}>
              <form className="space-y-4">
                {/* Modal Content Wrapper with Scroll */}
                <div
                  style={{
                    maxHeight: "400px", // Adjust as needed
                    overflowY: "auto", // Enable vertical scrolling
                    scrollbarWidth: "none" // Hide scrollbar in Firefox
                  }}>
                  {/* Offer Title & Offer ID */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="offerTitle"
                        className="block text-sm font-medium text-gray-700">
                        Offer Title
                      </label>
                      <input
                        type="text"
                        name="offerTitle"
                        id="offerTitle"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Offer Title"
                        required
                        defaultValue={editPopupData?.name || ""}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="offerId"
                        className="block text-sm font-medium text-gray-700">
                        Offer ID
                      </label>
                      <input
                        type="text"
                        name="offerId"
                        id="offerId"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm sm:text-sm bg-gray-100"
                        placeholder="Offer ID"
                        defaultValue={editPopupData?.id || ""}
                        readOnly
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={handlePreviewImage}
                    />
                    
                    {/* {editPopupData?.image} */}
                  </div>
                  {(imageUrl || editPopupData) && (
                      <img
                        className="mt-2 w-20 h-auto"
                        src={imageUrl ?? editPopupData?.image}
                        alt="Preview"
                      />
                    )}

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      className="mt-1 h-28 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Description"
                      required
                      defaultValue={editPopupData?.description || ""}
                    />
                  </div>

                  {/* Validity & Actual Price */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="validity"
                        className="block text-sm font-medium text-gray-700">
                        Validity
                      </label>
                      <input
                        type="text"
                        name="validity"
                        id="validity"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Validity"
                        required
                        defaultValue={editPopupData?.validity || ""}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="actualPrice"
                        className="block text-sm font-medium text-gray-700">
                        Actual Price
                      </label>
                      <input
                        type="number"
                        name="actualPrice"
                        id="actualPrice"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Actual Price"
                        required
                        defaultValue={editPopupData?.actualPrice || ""}
                      />
                    </div>
                  </div>

                  {/* Offer Price & Status */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="offerPrice"
                        className="block text-sm font-medium text-gray-700">
                        Offer Price
                      </label>
                      <input
                        type="number"
                        name="offerPrice"
                        id="offerPrice"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Offer Price"
                        required
                        defaultValue={editPopupData?.offerPrice || ""}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        name="status"
                        id="status"
                        className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        defaultValue={editPopupData?.status || "active"}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center p-6">
                  <button
                    onClick={handleModalClose}
                    disabled={isLoadingMutation || isLoadingEdit}
                    className="bg-[#808080] hover:bg-[#F8BF40] text-white font-bold py-2 px-6 rounded-3xl">
                    {isLoadingMutation || isLoadingEdit
                      ? "Loading..."
                      : "Submit"}
                  </button>
                </div>
              </form>
            </Modal>

            <Modal isVisible={showDeletePopup} onClose={handleDeleteModalClose}>
              <h3 className="flex self-center text-lg font-bold">
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
            <Modal isVisible={showBlockPopup} onClose={handleBlockModalClose}>
              <h3 className="flex self-center text-lg font-bold">
                Are you sure want to Block/Unblock?
              </h3>

              <div className="flex justify-center p-6">
                <button
                  disabled={isLoadingBlock}
                  onClick={handleBlockModalClose}
                  type="submit"
                  className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl">
                  No
                </button>
                <button
                  disabled={isLoadingBlock}
                  onClick={handleBlockModalClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
                  {isLoadingBlock ? "loading" : "YES"}
                </button>
              </div>
            </Modal>
          </span>
        </div>
      </div>
      <div>
        <div className="flex rounded-lg p-4 pr-0 pt-0">
          <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
            {/* Parent div for span elements */}
            <span className="flex items-center justify-center">
              <input
                onChange={(e) => {
                  handleSearchChange(e.target.value);
                }}
                className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
                placeholder="Search by name"
              />
            </span>
            <span className="flex items-center">
              <span className="cursor-pointer bg-[#E88B13] hover:bg-[#E88B13] text-white p-2 lg:w-[100px] text-center rounded-3xl">
                Search
              </span>
            </span>
          </div>
        </div>
      </div>

      <table className="min-w-full table-auto mt-6">
        <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px]">
          <tr>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Sl No
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Offer Title
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">Id</th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Image
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Description
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Validity
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Actual Price
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Offer Price
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Status
            </th>
            <th className="px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-50 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
            PlansTableData?.map((judge, index) => (
              <tr
                className="odd:bg-[#FCD199] even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                key={index}>
                <td className="px-4 py-2 border-r border-gray-400">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <u
                    style={{ cursor: "pointer" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}>
                    {judge?.name}
                  </u>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {judge?.id}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <img
                    alt="img"
                    src={judge?.image ?? JudgeAvatar}
                    className="w-14 h-14 rounded-full mr-2 mt-2"
                  />
                </td>

                <td className="px-4 py-2 border-r border-gray-400">
                  <ul className="list-disc pl-5 space-y-1">
                    {judge?.description?.split(",")?.map((desc, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {judge?.validity}
                  {judge?.validityType}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  ₹{judge?.actualPrice}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  ₹{judge?.offerPrice}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    onClick={() => handleShowBlockJudgePopup(judge?._id)}
                    className={`py-2 px-5 flex space-x-2 items-center ${
                      judge?.status
                        ? " text-[#FF0404] border-[#FF0404]"
                        : "  border-[#1ea524] text-[#1ea524]"
                    } rounded-full  border `}>
                    {" "}
                    <span>{judge?.status ? "Blocked" : "Unblocked"}</span>
                    <BiSolidDownArrow className="text-black" />
                  </button>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  <button
                    disabled={isLoadingBlock}
                    onClick={() => handleEditClick(judge)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(judge?._id)}>
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

      <div className="m-auto flex justify-end ">
        <Pagination
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={PlansTableData?.length}
        />
      </div>
    </>
  );
};

export default Plans;
