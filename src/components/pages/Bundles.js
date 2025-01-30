import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Select from "react-select";

import Modal from "../reUsableCmponent/modal/Modal";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination";
import { IoIosClose } from "react-icons/io";

import {
  useAddBundleMutation,
  useDeleteBundleMutation,
  useEditBundleMutation,
  useGetBundlesQuery,
} from "../../api/bundle";
import { useGetQuestionsListQuery } from "../../api/common";
import { toast } from "sonner";
import { getTextDirection } from "../../common/utils";
const Bundles = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editPopupData, setEditPopupData] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState(null);
  const { data: questionList, refetch: refetchQuestions } =
    useGetQuestionsListQuery();
  const options = questionList?.questions?.map((question) => {
    return {
      value: question?._id,
      label: question?.question,
      question: question?.question,
      questionId: question?.questionId,
    };
  });

  const [questions, setQuestions] = useState([]);

  const limit = 10;
  const { data, refetch } = useGetBundlesQuery({
    limit,
    page: currentPage,
    search: searchValue,
  });
  const [addBundle, { isLoading: isLoadingMutation }] = useAddBundleMutation();
  const [deleteBundle, { isLoading: isLoadingDelete }] =
    useDeleteBundleMutation();
  const [editBundle, { isLoading: isLoadingEdit }] = useEditBundleMutation();

  useEffect(() => {
    refetchQuestions();
    refetch();
  }, []);

  // const [selectedDesignation, setSelectedDesignation] =
  //   useState("Total Project : 3");

  // const selectRole = () => {
  //   setSelectedDesignation("");
  // };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setQuestions([]);
    setEditPopupData(null);
  };
  // const selectProfession = (event) => {
  //   setSelectedDesignation(event.target.value);
  // };

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const title = formData.get("title");
    // const questions = formData.get("question"); // Get email input value
    const selectedQuestions = questions?.map((option) => option?.value); // Get email input value

    try {
      if (editPopupData) {
        const body = {
          id: editPopupData?._id,
          questions: selectedQuestions,
          title,
        };
        if(selectedQuestions.length <= 0){
          toast.error("Please select minimum one question", {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
          });
          return
        }
        const res = await editBundle?.(body);
        if (res?.data?.success) {
          refetch({ limit, page: currentPage, search: searchValue });
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
        const body = {
          questions: selectedQuestions,
          title,
        };
        if(selectedQuestions.length <= 0){
          toast.error("Please select minimum one question", {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
          });
          return
        }
        const res = await addBundle?.(body);
        if (res?.data?.success) {
          refetch({ limit, page: currentPage, search: searchValue });
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

  const handleEditClick = (bundle) => {
    toggleModal();
    setEditPopupData(bundle);
    const selectedQuestions = bundle?.questions?.map((question) => {
      return {
        value: question?._id,
        label: question?.question,
      };
    });
    setQuestions(selectedQuestions);
  };
  const handleChange = (selectedOptions) => {
    setQuestions(selectedOptions || []);
  };

  const handleRemoveQuestion = (questionToRemove) => {
    setQuestions(
      questions.filter((question) => question.value !== questionToRemove.value)
    );
  };

  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedBundleId(id);
  };
  const handleDelete = async () => {
    try {
      const body = {
        bundleId: selectedBundleId,
      };
      const deleteres = await deleteBundle?.(body);
      if (deleteres?.data?.success) {
        refetch();
        setSelectedBundleId(null);
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

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  const customFilterOption = (option, inputValue) => {
    const { question, questionId } = option.data;
    if (!inputValue) return true;
    // Match input value with question or questionId
    return (
      question?.toLowerCase()?.includes(inputValue?.toLowerCase()) ||
      questionId?.toLowerCase()?.includes(inputValue?.toLowerCase())
    );
  };
  function autoResize(textarea) {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = textarea?.scrollHeight + "px"; // Set new height based on content
  }

  return (
    <>
      <div className="flex rounded-lg p-4">
        <h2 className="text-2xl font-semibold text-[#212529]">Bundles</h2>
        <div className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            <span
              className="bg-[#0EB599] hover:bg-[#068A55] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
              onClick={toggleModal}
            >
              Add Bundle
            </span>
          </span>
        </div>
      </div>
      <div className="ml-auto lg:mr-4 flex items-center space-x-4 justify-end pt-3">
        {/* <span className="flex items-center">
          <select
            value={selectedDesignation}
            onChange={selectProfession}
            className="rounded p-2 lg:w-[150px] w-full appearance-none bg-white border border-gray-400 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-no-repeat bg-right"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 14 14' fill='none' stroke='%23000000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1' d='M12 5l-5 5-5-5' /%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
              paddingRight: "40px",
            }}
          >
            <option value="" disabled className="text-gray-500 font-bold">
              All
            </option>
            <option value="All">All</option>
            <option value="Web Designer">Web Designer</option>
            <option value="Web Developer">Web Developer</option>
            <option value="FrontEnd Developer">FrontEnd Developer</option>
            <option value="FrontEnd Developer">BackEnd Developer</option>
          </select>
        </span> */}
        <span className="flex items-center justify-center">
          <input
            className="p-2 lg:w-[250px] w-full appearance-none bg-white border border-gray-400 rounded-3xl"
            placeholder="Bundle ID"
            onChange={(e) => {
              const value = e.target.value;
              const containsArabic = /[\u0600-\u06FF]/.test(value); // Detects any Arabic character

              // Set direction based on presence of Arabic characters
              e.target.dir = containsArabic ? "rtl" : "ltr";

              handleSearchChange(value);
            }}
          />
        </span>
        <span className="flex items-center">
          <span className="cursor-pointer bg-[#0EB599] hover:bg-[#068A55] text-white p-2 lg:w-[100px] text-center rounded-3xl">
            Search
          </span>
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto mt-6">
          <thead className="bg-white border-gray-400 border-t-[2px] border-l-[2px] border-r-[2px] border-b-[2px] ">
            <tr className="">
              <th className="px-4 py-2 border-r border-gray-400 text-left font-medium">
                No
              </th>
              <th className="px-4 py-2 border-r border-gray-400 text-center font-medium">
                Title
              </th>
              <th className="px-4 py-2 border-r border-gray-400 text-center font-medium">
                No of Questions
              </th>
              <th className="px-4 py-2 border-r border-gray-400 text-left font-medium">
                Bundle Id
              </th>
              <th className="px-4 py-2 border-r border-gray-400 font-medium text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="border-[2px] border-opacity-50 border-[#969696]">
            {data?.bundles?.map((bundle, index) => (
              <tr
                className="odd:bg-teal-100 even:bg-grey border-[2px] border-opacity-50 border-[#9e9696]"
                key={index}
              >
                <td
                  onClick={() => navigate(`/bundles/${bundle?._id}`)}
                  className="px-4 py-2 border-r border-gray-400"
                >
                  {index + 1}
                </td>
                <td
                  onClick={() => navigate(`/bundles/${bundle?._id}`)}
                  className="px-4 py-2 border-r border-gray-400 "
                >
                  <div className="underline"
                    style={{ cursor: "pointer" }}
                    onMouseOver={({ target }) => (target.style.color = "blue")}
                    onMouseOut={({ target }) => (target.style.color = "black")}
                    dir={getTextDirection(bundle?.title)}
                  >
                    {" "}
                    {bundle?.title}
                  </div>
                </td>
                <td
                  onClick={() => navigate(`/bundles/${bundle?._id}`)}
                  className="px-4 py-2 border-r border-gray-400 text-center"
                >
                  {bundle?.questions?.length}
                </td>
                <td
                  onClick={() => navigate(`/bundles/${bundle?._id}`)}
                  className="px-4 py-2 border-r border-gray-400 "
                >
                  {bundle?.bundleId}
                </td>
                <td className="px-4 py-2 border-r border-gray-400 text-center">
                  <button onClick={() => handleEditClick(bundle)}>
                    <img
                      alt="pics"
                      src="/icons/edit.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                  <button onClick={() => handleDeleteClick(bundle?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-6 h-6 rounded-full mr-2 fill-red-500"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full flex justify-end">
          <Pagination
            itemsPerPage={limit}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalPages={data?.totalPages}
          />
        </div>
      </div>

      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        modalHeader={editPopupData ? "Edit Bundle" : "Add Bundle"}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="q&a"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={editPopupData?.title ? editPopupData?.title : ""}
                dir="auto" // Set to auto initially
                onChange={(e) => {
                  const value = e.target.value;

                  // Check if the input consists mostly of Arabic characters or spaces
                  const isMostlyArabic = /^[\u0600-\u06FF\s]+$/.test(value);

                  // Set input direction based on the content
                  e.target.dir = isMostlyArabic ? "rtl" : "ltr";

                  // Resize the textarea (if you're using the autoResize function)
                  autoResize(e.target);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="q&a"
                className="block text-sm font-medium text-gray-700"
              >
                Question
              </label>
              <Select
                className="border-2  border-gray-400"
                options={options}
                onChange={handleChange}
                value={questions}
                isMulti
                hideSelectedOptions
                closeMenuOnSelect={false} // Keep the dropdown open for multiple selections
                placeholder="Select Questions"
                components={{ MultiValue: () => null }} // Hide selected options in input
                filterOption={customFilterOption}
              />
              <div className="pt-2">
                {questions.length > 0 && (
                  <ul className="flex flex-wrap gap-1">
                    {questions.map((question) => (
                      <li
                        key={question.value}
                        className="bg-[#1DB290] flex items-center justify-between text-white rounded-full py-0.5 px-2 text-xs font-light"
                      >
                        <span>{question.label}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(question)}
                          className="ml-2"
                        >
                          <IoIosClose className="text-lg" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              disabled={isLoadingEdit || isLoadingMutation}
              type="submit"
              className="bg-[#0EB599] hover:bg-[#068A55] text-white font-bold py-2 px-6 rounded-3xl"
            >
              Submit
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
            className="border border-green-500 text-green-600 hover:bg-green-700 hover:text-white font-bold  py-2 m-2 px-8 rounded-2xl"
          >
            No
          </button>
          <button
            disabled={isLoadingDelete}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl"
          >
            YES
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Bundles;
