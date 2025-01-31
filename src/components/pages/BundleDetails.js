import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditBundleMutation,
  useGetBundleDetailQuery,
} from "../../api/bundle";
import Modal from "../reUsableCmponent/modal/Modal";
import { useState } from "react";
import Select from "react-select";

import { useGetQuestionsListQuery } from "../../api/common";
import { IoIosClose } from "react-icons/io";
import { toast } from "sonner";
import { getTextDirection } from "../../common/utils";

const BundleDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bundleId = location.pathname?.split("/")[2];
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editPopupData, setEditPopupData] = useState(null);
  const { data, refetch } = useGetBundleDetailQuery(bundleId);
  const { data: questionList, refetch: refetchQuestions } =
    useGetQuestionsListQuery();
  const tempQuestions = questionList?.questions?.map((question) => {
    return {
      value: question?._id,
      label: question?.question,
      question: question?.question,
      questionId: question?.questionId,
    };
  });
  const options = tempQuestions?.filter(
    (item1) =>
      !data?.bundle?.questions.some((item2) => item2._id === item1.value)
  );

  const [questions, setQuestions] = useState([]);
  const [newQuestions, setNewQuestions] = useState([]);
  const [editBundle, { isLoading: isLoadingEdit }] = useEditBundleMutation();

  const handleDeleteClick = (id) => {
    setEditPopupData(id);
    setShowDeletePopup(true);
  };

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setQuestions([]);
    setNewQuestions([]);
    setEditPopupData(null);
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

  const customFilterOption = (option, inputValue) => {
    const { question, questionId } = option.data;
    if (!inputValue) return true;
    // Match input value with question or questionId
    return (
      question?.toLowerCase()?.includes(inputValue?.toLowerCase()) ||
      questionId?.toLowerCase()?.includes(inputValue?.toLowerCase())
    );
  };
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const selectedQuestions = questions?.map((option) => option?.value); // Get email input value

    try {
      if (editPopupData) {
        const body = {
          id: editPopupData?._id,
          questions: selectedQuestions,
        };
        if (selectedQuestions.length <= 0) {
          toast.error("Please select minimum one question", {
            position: "top-right",
            duration: 2000,
            style: {
              backgroundColor: "#fb0909", // Custom green color for success
              color: "#FFFFFF", // Text color
            },
            dismissible: true,
          });
          return;
        }
        const res = await editBundle?.(body);
        if (res?.data?.success) {
          refetch();
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
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleChange = (selectedOptions) => {
    setQuestions([...questions, ...selectedOptions]);
    setNewQuestions(selectedOptions);
  };

  const handleDelete = async () => {
    if (data?.bundle?.questions?.length <= 1) {
      toast.error("Cannot delete last remaining question", {
        position: "top-right",
        duration: 2000,
        style: {
          backgroundColor: "#fb0909", // Custom green color for success
          color: "#FFFFFF", // Text color
        },
        dismissible: true,
      });
      return;
    }
    const remainingQuestions = data?.bundle?.questions
      ?.filter((option) => option?._id !== editPopupData)
      .map((option) => option?._id);

    const body = {
      id: data?.bundle?._id,
      questions: remainingQuestions,
    };
    const res = await editBundle?.(body);
    if (res?.data?.success) {
      refetch();
      handleDeleteModalClose();
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
  };

  const handleRemoveQuestion = (questionToRemove) => {
    setQuestions(
      questions.filter((question) => question.value !== questionToRemove.value)
    );
    setNewQuestions(
      newQuestions?.filter(
        (question) => question.value !== questionToRemove.value
      )
    );
  };
  return (
    <>
      <svg
        onClick={() => navigate("/bundles")}
        className="cursor-pointer mb-4"
        width="13"
        height="22"
        viewBox="0 0 13 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.505997 9.77797L10.284 0L12.728 2.44406L4.17209 11L12.728 19.5559L10.284 22L0.505997 12.222C0.181958 11.8979 -7.72476e-05 11.4583 -7.72476e-05 11C-7.72476e-05 10.5417 0.181958 10.1021 0.505997 9.77797Z"
          fill="black"
        />
      </svg>
      <div className="m-4 mx-auto bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200">
        <div className="flex items-center justify-between space-x-4 ">
          <div className="flex">
            <div className="w-40 h-40 rounded-[15px] overflow-hidden border-2 border-gray-300">
              <img
                src="/bundle.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 mt-6 space-y-2">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.bundle?.title}
              </h2>
              <div>
                <span className="font-semibold text-gray-600">Bundle Id: </span>
                <span className="text-green-500 ml-6">
                  {data?.bundle?.bundleId}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  No Of Questions:
                </span>
                <span className="text-green-500 ml-6">
                  {data?.bundle?.questions?.length}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleEditClick(data?.bundle)}
            className="bg-[#0EB599] hover:bg-[#068A55] text-white rounded-3xl pt-2 pb-2 pl-4 pr-4 cursor-pointer"
          >
            Insert new Question
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-white ">
            <tr className="">
              <th className="px-4 py-2 text-left font-medium">Qs ID</th>
              <th className="px-4 py-2 text-center font-medium">Question</th>
              <th className="px-4 py-2 text-left font-medium">Answers</th>
              <th className="px-4 py-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="border-[2px] border-opacity-50 border-[#969696]">
            {data?.bundle?.questions?.map((question, index) => (
              <tr
                className="font-light odd:bg-teal-100 even:bg-white border-[2px] border-opacity-50 border-[#969696]"
                key={index}
              >
                <td className="w-6 px-4 py-2">{question?.questionId}</td>
                <td
                  className="px-4 py-2 "
                  dir={getTextDirection(question?.question)}
                >
                  {question?.question}
                </td>
                <td
                  className="px-4 py-2 "
                  dir={getTextDirection(question?.answer)}
                >
                  {question?.answer}
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => handleDeleteClick(question?._id)}>
                    <img
                      alt="pics"
                      src="/icons/delete.svg"
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
            disabled={isLoadingEdit}
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl"
          >
            YES
          </button>
        </div>
      </Modal>
      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        modalHeader={"Add Question"}
      >
        <form onSubmit={onSubmit} className="space-y-4">
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
                value={newQuestions}
                isMulti
                hideSelectedOptions
                closeMenuOnSelect={true} // Keep the dropdown open for multiple selections
                placeholder="Select Questions"
                components={{ MultiValue: () => null }} // Hide selected options in input
                filterOption={customFilterOption}
              />
              {
                <div className="pt-2">
                  {newQuestions.length > 0 && (
                    <ul className="flex flex-wrap gap-1">
                      {newQuestions.map((question) => (
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
              }
            </div>
          </div>

          <div className="flex justify-center">
            <button
              disabled={isLoadingEdit}
              type="submit"
              className="bg-[#0EB599] hover:bg-[#068A55] text-white font-bold py-2 px-6 rounded-3xl"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default BundleDetails;
