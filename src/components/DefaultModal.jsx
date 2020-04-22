import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";

export default function DefaultModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            onShow={props.onShow}
            dialogClassName={props.modalClassNames}
            className="setting-modal"
            backdrop="static"
        >
            <Modal.Header className="popup-header">
                <span aria-hidden="true" className={props.icon} />
                <h5 className="modal-title popup-title">{props.title}</h5>
                <button type="button" className="close" aria-label="Close" onClick={props.onHide}>
                    <span
                        aria-hidden="true"
                        className="icon-close"
                        data-dismiss="modal"
                    />
                </button>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}
