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
  useGetJudgesQuery,
} from "../../api/judges";
import { useGetZonesListQuery } from "../../api/common";
import { IoIosClose, IoMdCopy } from "react-icons/io";
import FilterPopup from "../reUsableCmponent/filterPopup";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import copy from "copy-to-clipboard";
import { LuCopyCheck } from "react-icons/lu";
import JudgeAvatar from "../../assets/images/person-placeholder.png";
import { toast } from "sonner";
import { PaymentTableData, PlansTableData } from "../../constants/tableData";

const Payments = () => {
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
  const isLoading=false

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
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
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
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
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
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
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
        judgeId: selectedJudgeId,
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
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
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
        judgeId: selectedJudgeId,
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
            color: "#FFFFFF", // Text color
          },
          dismissible: true,
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
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
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
      <div className="flex rounded-lg p-4 pb-0">
        <h2 className="text-2xl font-semibold text-gray-700">Payments</h2>
       
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
              <span className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl">
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
              Payment ID
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Vender Details
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Date & Time
            </th>

            <th className="px-4 py-4 text-left border-r border-gray-400">
              Status
            </th>
            <th className="px-4 py-4 text-left border-r border-gray-400">
              Plan
            </th>
            {/* <th className="px-4 py-4 text-left">Action</th> */}
          </tr>
        </thead>
        <tbody className="border-[2px] border-opacity-50 border-[#969696]">
          {isLoading ? (
            <>Loading...</>
          ) : (
                    PaymentTableData?.map((judge, index) => (
              <tr
                className="odd:bg-teal-100 even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                key={index}
              >
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2 border-r border-gray-400"
                >
                  {index + 1}
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2 border-r border-gray-400"
                >
                  <u
                    style={{ cursor: "pointer" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}
                  >
                    {judge?.id}
                  </u>
                </td>
                <td
                  onClick={() => navigate(`/judges/${judge?._id}`)}
                  className="px-4 py-2 border-r border-gray-400"
                >
                  {judge?.vendor}
                </td>
              
                
                <td className="px-4 py-2 border-r border-gray-400">
                  <ul className="list-disc pl-5 space-y-1">
                   {judge?.dateAndTime}
                  </ul>
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
                  {judge?.status}
                </td>
                <td className="px-4 py-2 border-r border-gray-400">
              {judge?.plan}
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

export default Payments;
 