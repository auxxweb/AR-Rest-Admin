import { useLocation, useNavigate } from "react-router-dom";
import { useGetParticipantDetailQuery } from "../../api/participants";
import ParticipantAvatar from "../../assets/images/person-placeholder.png"


const ParticipantDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const participantId = location.pathname?.split("/")[2];
  const { data } = useGetParticipantDetailQuery(participantId);
  return (
    <>
      <svg
        onClick={() => navigate("/participants")}
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
        <div className="flex flex-col lg:flex-row items-start w-full">
          {/* Left Section: Profile Image & User Info */}
          <div className="flex lg:w-1/2">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={data?.participant?.image ?? ParticipantAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info */}
            <div className="ml-6 flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">
                {data?.participant?.name}
              </h2>
              <p className="text-gray-500 mt-1 flex items-center">
                <img
                  src="/icons/zoneIcon.svg"
                  alt="Profile"
                  className="w-6 h-6 mr-3 object-cover"
                />
                {data?.participant?.zone?.name}
              </p>
            </div>
          </div>

          {/* Right Section: Contact Details */}
          <div className="flex flex-col lg:w-1/2">
            <div className="mt-4 lg:mt-0">
              <table className="w-full">
                <tbody className="space-y-2">
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">Phone</td>
                    <td>
                      <span
                        className="text-green-500"
                      >
                        {data?.participant?.phone}
                      </span>
                    </td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">Email</td>
                    <td>
                      <span
                        className="text-green-500"
                      >
                        {data?.participant?.email}
                      </span>
                    </td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">Age</td>
                    <td>{data?.participant?.age}</td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">
                      Gender
                    </td>
                    <td>{data?.participant?.gender}</td>
                  </tr>
                  <tr className="mt-4">
                    <td className="font-semibold text-gray-600 w-1/4">
                      Address
                    </td>
                    <td>{data?.participant?.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParticipantDetails;
