import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useEditMarkMutation,
  useGetResultDetailQuery
} from "../../api/responseAndResult";
import {
  dateFormater,
  getTextDirection,
  timeFormater
} from "../../common/utils";

import placeholder from "../../assets/images/person-placeholder.png";
import { toast } from "sonner";
import { LuCheck, LuX } from "react-icons/lu";

function ResultDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEdit, setShowEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [edittedMark, setEdittedMark] = useState(null);
  const resultId = location.pathname?.split("/")[2];
  const [EditMark, { isLoading: isLoadingEdit }] = useEditMarkMutation();
  const { data, refetch } = useGetResultDetailQuery(resultId);

  const handleEdit = async () => {
    const body = {
      answerId: selectedId,
      score: edittedMark
    };
    try {
      const res = await EditMark?.(body);
      if (res?.data?.success) {
        refetch();

        setShowEdit(false);
        setSelectedId(null);
        toast.success(res.data.msg ?? "Mark updated successfully", {
          position: "top-right",
          duration: 2000,
          style: {
            backgroundColor: "green", // Custom green color for success
            color: "#FFFFFF" // Text color
          },
          dismissible: true
        });
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

  const getTimeDifference = (date2, date1) => {
    const startDate = new Date(date2);
    const endDate = new Date(date1);

    // Calculate the difference in milliseconds
    const diffInMs = endDate - startDate;

    // Convert milliseconds to total seconds
    const totalSeconds = Math.floor(diffInMs / 1000);

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}.${seconds}s`;
  };

  const handleEditclick = (id) => {
    setSelectedId(id);
    setShowEdit(true);
  };

  const handleChange = (e) => {
    setEdittedMark(e?.target?.value);
  };

  return (
    <>
      <svg
        onClick={() => navigate("/result")}
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
      <div className="m-6 bg-white shadow-md rounded-lg p-6 mt-6 border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start w-full">
          {/* Left Section: Profile Image & User Info */}
          <div className="flex lg:w-1/2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={data?.result?.participant_id?.image ?? placeholder}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.result?.participant_id?.name}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center">
                {data?.result?.zone?.name}
              </p>
              <p className="text-green-500 mt-1 flex items-center">
                {data?.result?.participant_id?.phone}
              </p>
              <p className="text-green-500 mt-1 flex items-center">
                {data?.result?.participant_id?.email}
              </p>
              <p className="text-gray-500 mt-1 flex items-center">
                {data?.result?.participant_id?.address}
              </p>
            </div>
          </div>
          <table className="table-auto border-separate border-spacing-4">
            <tbody>
              <tr>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  Date
                </td>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  {dateFormater(data?.result?.startTime)}
                </td>
              </tr>
              <tr>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  Quiz Time
                </td>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  {timeFormater(data?.result?.startTime)} -{" "}
                  {timeFormater(data?.result?.endTime)}
                </td>
              </tr>
              <tr>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  TotalScore
                </td>
                <td className="text-2xl font-semibold mt-2 text-gray-600">
                  {data?.totalScore}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="items-center m-6 justify-center">
        {/* Main Container */}
        {data?.questions?.map((question, index) => (
          <div className="bg-white  align-center shadow-md rounded-lg mb-6  w-full">
            <div className="border-b rounded-t-lg p-3 bg-white">
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Question {index + 1}</h1>
                <div className="text-lg text-black">
                  <span className="font-bold">
                    {" "}
                    Time Taken:{" "}
                    {getTimeDifference(
                      question?.startTime,
                      question?.endTime
                    )}{" "}
                  </span>
                  <span className="text-[#939393]">
                    | {timeFormater(question?.startTime)} -{" "}
                    {timeFormater(question?.endTime)}{" "}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="bg-[#E9FFFB]  p-4 rounded-md">
                <p
                 dir="auto"
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  // dir={getTextDirection(question?.answer)}
                  className="text-lg font-semibold">
                  {question?.question}
                </p>
                <p
                  dir={getTextDirection(question?.answer)}
                  className="mt-2 text-sm text-black">
                  Answer: {question?.answer}
                </p>
              </div>

              {/* Participant Response Section */}
              <div>
                <div className="flex justify-between bg-white shadow-md rounded-lg p-3 mb-3 w-full">
                  <h2 className="font-bold text-lg mb-2">
                    Participant Response
                  </h2>
                  <h2 className="font-bold text-lg mb-2 mr-2">
                    Total Score: {question?.totalScore}
                  </h2>
                </div>

                {/* Participant Response Card */}
                {question?.answers?.map((answer) => (
                  <div className="bg-white border border-gray-200 mt-6 p-4 rounded-lg shadow-md mb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div>
                          <p className="font-semibold text-[#373B3E]">
                            Judge:{" "}
                          </p>
                        </div>
                        <img
                          src={answer?.judge?.image ?? placeholder}
                          alt="Judge"
                          className="ml-3 w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-bold text-[#373B3E]">
                            {answer?.judge?.name}
                          </p>
                        </div>
                        <div className="flex text-lg font-bold ml-10 text-[#373B3E]">
                          <p>Score Given:</p>
                          {showEdit && selectedId === answer?._id ? (
                            <input
                              type="text"
                              name="mark"
                              id="mark"
                              className="mt-1 block w-full border-2 p-1 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              required
                              onChange={(e) => handleChange(e)}
                              defaultValue={
                                answer?.score ? answer?.score : null
                              }
                            />
                          ) : (
                            <p className="font-bold text-2xl ml-6">
                              {answer?.score ?? "00"}
                            </p>
                          )}
                          {showEdit && selectedId === answer?._id ? (
                            <>
                              <button
                                className="w-10 mt-3 h-10 mr-2 ml-4"
                                onClick={() => setShowEdit(false)}>
                                <LuX />
                              </button>
                              <button
                                className="w-10 mt-3 h-10 mr-2 ml-4"
                                onClick={() => handleEdit()}>
                                <LuCheck />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEditclick(answer?._id)}>
                              <img
                                alt="pics"
                                src="/icons/edit.svg"
                                className="w-6 h-6 rounded-full mr-2 ml-4"
                              />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="text-black mt-3">Answer: {answer?.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ResultDetails;
