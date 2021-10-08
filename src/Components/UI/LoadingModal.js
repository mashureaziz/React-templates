import React from 'react';

const LoadingModal = (props) => {
    return (
        <div className = "loading-modal">
            <div className = "modal-wrapper">
                {props.children}
            </div>
        </div>
    )
}
export default LoadingModal;