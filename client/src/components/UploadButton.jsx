import React, { useState } from 'react';

const UploadButton = ({ onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [fileData, setFileData] = useState(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  
  const handleUpload = (event) => {
    event.preventDefault();
    const isValid = localStorage.getItem("status");

    if(fileData === null){
      return alert("Please upload a file");
    }
    if(!isValid){
      return alert("Please enter a wallet address!");
    }

    if (fileData.length > 0) {
      localStorage.removeItem("status");
      const reader = new FileReader();
      reader.onload = function(fileEvent) {
        const f = fileEvent.target.result;
        setFileData(f);
        axios.post("http://localhost:5000/share", { fileData : f})
        .then(async (res) => {
          const cid = res.data.cid;
          const data = await addFileToIPFS({ args: [sender,recieverAddress,cid] });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
      };
      reader.readAsDataURL(fileData[0]);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-4 right-20 rounded-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-bold focus:outline-none shadow-md hover:bg-orange-500 z-50" // Added z-index: 50
        onClick={handleOpen}
      >
        Upload
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-500/50 dark:bg-black/50 backdrop-blur-sm flex justify-center items-center z-50" // Added z-index: 60
        >
          <div className="bg-zinc-800 w-[38rem]  rounded-lg shadow-md px-10 py-8">
            <h3 className="text-xl font-medium mb-4 z-50 text-center">Upload Files</h3>
            <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-300 dark:border-white rounded-lg p-4">
              <svg
                className="w-12 h-12 text-gray-400 dark:text-white"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zM8 14v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V14a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              <p className="mt-2 text-zinc-700 dark:text-white">Drag & Drop files here</p>
              <br />
              <p className="text-sm text-gray-500 dark:text-gray-300">or</p>
              <button
                className="mt-4 bg-transparent hover:bg-white text-orange-500 font-bold py-2 px-4 rounded focus:outline-none"
                onClick={() => document.getElementById('fileInput').click()}
              >
                Browse Files
              </button>
              <input
                type="file"
                id="fileInput"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
            </div>
            <button
              className="mt-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadButton;
