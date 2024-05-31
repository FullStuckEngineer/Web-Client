import React from "react";

function UploadFile({ onChange }) {
  return (
    <div>
      <input
        className="block w-full p-[0.4rem] text-sm text-color-gray-900 border border-color-gray-300 rounded-lg cursor-pointer bg-color-gray-100"
        id="multiple_files"
        type="file"
        onChange={onChange}
        multiple
      />
    </div>
  );
}

export default UploadFile;
