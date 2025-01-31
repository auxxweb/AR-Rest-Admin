import React, { useEffect, useState } from "react";
// import RichTextEditor from "../RichTextEditor";
// import useBusiness from "../../Hooks/business/useBusiness";
import RichTextEditor from "../RichTextEditor";

const TermsAndConditions = () => {
//   const { createTerms, terms, getTerms, updateTerms,loading } = useBusiness();
  const [data, setData] = useState({});

  const handleCreate = async (tData) => {
//     await createTerms({ data: tData });
  };

  const handleUpdate = async (tData) => {
//     await updateTerms({data:tData});
  };

//   useEffect(() => {
//     setData(terms?.data);
//   }, [terms?.data]);

  useEffect(() => {
    const fetchTerms = async () => {
//       await getTerms();
    };
    fetchTerms();
  }, []);

  return (
    <div>
      <RichTextEditor
        data={data}
        handleCreate={handleCreate}
        setData={setData}
        handleUpdate={handleUpdate}
        loading={false}
      />
    </div>
  );
};

export default TermsAndConditions;
