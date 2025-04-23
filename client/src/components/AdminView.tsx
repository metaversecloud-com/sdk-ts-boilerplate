import { useState } from "react";

// components
import { PageFooter, ConfirmationModal } from "@/components";

export const AdminView = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  function handleToggleShowConfirmationModal() {
    setShowConfirmationModal(!showConfirmationModal);
  }

  return (
    <div style={{ position: "relative" }}>
      <PageFooter>
        <button className="btn btn-danger" onClick={() => handleToggleShowConfirmationModal()}>
          Reset
        </button>
      </PageFooter>

      {showConfirmationModal && (
        <ConfirmationModal
          title="Reset"
          message="Are you sure you want to reset? This action cannot be undone."
          handleOnConfirm={() => console.log("Confirmed!")}
          handleToggleShowConfirmationModal={handleToggleShowConfirmationModal}
        />
      )}
    </div>
  );
};

export default AdminView;
