import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import the default theme CSS
import "./terms.css";
// import Loader from "./Loader/Loader";

const RichTextEditor = ({
  setData,
  data,
  handleCreate,
  handleUpdate,
  loading
}) => {
  const [editorContent, setEditorContent] = useState(data);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  useEffect(() => {
    setEditorContent(data);
  }, [data]);

  const handleSubmit = (type) => {
    if (type === "update") {
      handleUpdate(editorContent);
    } else {
      handleCreate(editorContent);
    }
  };

  return (
    <div className="rich-text-editor">
      <h2>Terms and Conditions Editor</h2>
      {loading ? (
//         <Loader />
<></>
      ) : (
        <>
          <ReactQuill
            value={editorContent}
            onChange={handleChange}
            className="react-quill"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { header: "3" }],
                ["bold", "italic", "underline"],
                ["code-block"],
                //   [{ indent: "-1" }, { indent: "+1" }],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }]
              ]
            }}
          />

          <div className="sub-btn-div">
            <button
              className="submit-btn"
              onClick={() => {
                data ? handleSubmit("update") : handleSubmit("create");
              }}>
              {data ? "Update Terms" : "Create Terms"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
