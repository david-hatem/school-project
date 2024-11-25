import React from "react";

const ConfirmationDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  message = "Are you sure?",
}) => {
  if (!isOpen) return null; // Do not render if dialog is not open

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <h2>Confirmation</h2>
        <p>{message}</p>
        <div style={styles.buttonGroup}>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },
  // cancelButton: {
  //   padding: "10px 20px",
  //   backgroundColor: "#ccc",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  // },
  // confirmButton: {
  //   padding: "10px 20px",
  //   backgroundColor: "#e53e53",
  //   color: "white",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  // },
};

export default ConfirmationDialog;
