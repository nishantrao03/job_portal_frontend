import React from 'react';
import './DeleteConfirmationModal.css'; // You can add custom styles for the modal

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Delete Application</h2>
                <p>
                    Are you sure you want to delete your application? 
                    You will not be able to apply for this job again after the deadline.
                    {/* You can apply to this job anytime before the deadline, but not after the deadline. */}
                </p>
                <div className="modal-actions">
                    <button className="action-button cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="action-button confirm" onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
