import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useGetQuestionDetailQuery
} from "../../api/questions";
import Modal from "../reUsableCmponent/modal/Modal";
import { toast } from "sonner";

const QuestionDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const textareaRef = useRef(null);
  const questionId = location.pathname?.split("/")[2];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const { data, refetch } = useGetQuestionDetailQuery(questionId);
  const [deleteQuestion, { isLoading: isLoadingDelete }] =
    useDeleteQuestionMutation();
  const [editQuestion, { isLoading: isLoadingEdit }] =
    useEditQuestionMutation();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    // Automatically resize the textarea based on the content when the component mounts
    if (textareaRef.current) {
      autoResize(textareaRef.current);
    }
  }, [data?.question]);

  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    const formData = new FormData(event.target); // Make sure event.target is the form
    const question = formData.get("question"); // Get email input value
    const answer = formData.get("answer");
    try {
      const body = {
        id: questionId,
        question,
        answer
      };
      const res = await editQuestion?.(body);
      if (res?.data?.success) {
        refetch();
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
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDelete = async () => {
    try {
      const body = {
        questionId: questionId
      };
      const deleteres = await deleteQuestion?.(body);
      if (deleteres?.data?.success) {
        setShowDeletePopup(false);
        navigate("/questions");
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

  const handleDeleteModalClose = () => {
    setShowDeletePopup(false);
  };

  function autoResize(textarea) {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = textarea?.scrollHeight + "px"; // Set new height based on content
  }

  return (
    <>
      <div className="m-4 mx-auto p-6 mt-6">
        <svg
          onClick={() => navigate("/questions")}
          className="cursor-pointer mb-4"
          width="13"
          height="22"
          viewBox="0 0 13 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.505997 9.77797L10.284 0L12.728 2.44406L4.17209 11L12.728 19.5559L10.284 22L0.505997 12.222C0.181958 11.8979 -7.72476e-05 11.4583 -7.72476e-05 11C-7.72476e-05 10.5417 0.181958 10.1021 0.505997 9.77797Z"
            fill="black"
          />
        </svg>
        {/* Question ID */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-700">
            <span className="text-lg font-semibold">Question ID</span> :{" "}
            {data?.question?.questionId}
          </div>
          <div className="space-x-4">
            <button
              onClick={() => setIsModalVisible(true)}
              className="bg-[#808080] text-white px-4 py-1 rounded-md hover:bg-[#1ae69b]">
              Edit
            </button>
            <button
              onClick={() => setShowDeletePopup(true)}
              className="bg-[#808080] text-white px-4 py-1 rounded-md hover:bg-[#1ae69b]">
              Delete
            </button>
          </div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Question</h3>
          <div className="border text-lg bg-white border-gray-300 p-4 rounded-md mt-2"
           dir={/[\u0600-\u06FF]/.test(data?.question?.question) ? 'rtl' : 'ltr'}>
            {data?.question?.question}
          </div>
        </div>

        {/* Answer */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Answer</h3>
          <div className="border border-gray-300 p-4 rounded-md mt-2 bg-gray-50">
            <p  dir={/[\u0600-\u06FF]/.test(data?.question?.question) ? 'rtl' : 'ltr'} className="text-gray-600">{data?.question?.answer}</p>
          </div>
        </div>
      </div>
      <Modal
        isVisible={isModalVisible}
        onClose={toggleModal}
        modalHeader={"Edit Qs and Ans"}
        isScrollable={true}>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="q&a"
                className="block text-sm font-medium text-gray-700">
                Question
              </label>
              <textarea
                onClick={(e) => autoResize(e.target)}
                //  onInput={(e) => autoResize(e.target)}
                type="text"
                name="question"
                id="question"
                ref={textareaRef}
                dir="auto"
                className="  text-area-1 p-2 mt-1 block w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={data?.question?.question}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                htmlFor="q&a"
                className="  text-area-1block text-sm font-medium text-gray-700">
                Answer
              </label>
              <textarea
                onClick={(e) => autoResize(e.target)}
                dir="auto"
                type="text"
                ref={textareaRef}
                name="answer"
                id="answer"
                className="p-2 mt-1 block h-24 w-full border-2 border-gray-400 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue={data?.question?.answer}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              disabled={isLoadingEdit}
              type="submit"
              className="bg-[#808080] hover:bg-blue-[#1ae69b] text-white font-bold py-2 px-4 rounded">
              Update
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
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-2 px-8 rounded-2xl">
            YES
          </button>
        </div>
      </Modal>
    </>
  );
};

export default QuestionDetails;
