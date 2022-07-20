import React, {FC, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import {Button} from "antd";

type Modal = {
    children: ReactNode,
    setModalVisibility: (b:boolean) => void
}

const Modal:FC <Modal> = ({children, setModalVisibility}) => {

    return ReactDOM.createPortal (
        <>
            <div
                className={styles.overlay}
                onClick={() => setModalVisibility(false)}
            >
                <Button
                    type='primary'
                    danger
                    onClick={() => setModalVisibility(false)}
                >
                    &times;
                </Button>
            </div>
            <div className={styles.modal}>
                {children}
            </div>
        </>, document.getElementById('portal')!
    )};

export default Modal;