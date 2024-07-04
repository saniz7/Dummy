const LabProfile = ({
  labName,
  labAddress,
  labContact,
  profileImage,
  editMode,
  setLabName,
  setLabAddress,
  setLabContact,
  handleUpdateDataChange,
  textPrompt,
  createdAt,
  labId,
}) => {
  return (
    <div className="flex-auto px-4 lg:px-10 pb-10 text-2xl mt-5 mx-5 md:mx-48">
      <div className="text-center mb-3 font-bold uppercase">
        <small>Update Lab Profile</small>
      </div>
      <div className="relative w-full mb-3 mt-7">
        <div className="text-red-500 text-center text-base my-5">
          {textPrompt}
        </div>
        <div className="grid gap-1 grid-cols-1 mb-3">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Lab Email
            </label>
            <input
              type="name"
              className="border-0 px-3 py-3 placeholder-gray-400 
                  text-gray-700 bg-white rounded text-sm shadow 
                  focus:outline-none focus:ring w-full"
              placeholder="Lab Email"
              style={{ transition: "all 0.15s ease 0s" }}
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
              disabled={!editMode} // Disable when not in edit mode
              required
            />
          </div>
        </div>
        <div className="grid gap-1 grid-cols-2 mb-2">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Address
            </label>
            <input
              type="text"
              className="border-0 px-3 mt-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Complete Address"
              style={{ transition: "all 0.15s ease 0s" }}
              value={labAddress}
              onChange={(e) => setLabAddress(e.target.value)}
              disabled={!editMode} // Disable when not in edit mode
              required
            />
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Phone Number
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              placeholder="Phone Number"
              style={{ transition: "all 0.15s ease 0s" }}
              value={labContact}
              onChange={(e) => setLabContact(e.target.value)}
              disabled={!editMode} // Disable when not in edit mode
              required
            />
          </div>
        </div>
        <div className="grid gap-1 grid-cols-2 mb-2">
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Lab ID
            </label>
            <input
              type="text"
              className="border-0 px-3 mt-2 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              value={labId}
              disabled // Always disabled
            />
          </div>
          <div>
            <label
              className="block uppercase text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Created At
            </label>
            <input
              type="text"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
              value={createdAt}
              disabled // Always disabled
            />
          </div>
        </div>
      </div>
      <div className="text-red-500 text-sm text-center">{textPrompt}</div>
    </div>
  );
};

export default LabProfile;
