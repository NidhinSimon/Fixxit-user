import React from "react";

const mm = () => {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">hello your profiel is yet to be verified</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default mm;
