import React, {FC, memo, useState} from 'react';
import {Button} from "antd";

import styles from './StoreItem.module.scss';
import Modal from "../Modal/Modal";
import {useStoreContext} from "../../context/StoreContext";
import {formatCurrency} from "../../utilities/formatCurrency";

interface StoreItemProps {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const StoreItem: FC <StoreItemProps> = memo(({id, price, name, imgUrl}) => {

    const {
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        onRemoveItem
    } = useStoreContext()

    const [modalVisibility, setModalVisibility] = useState<boolean>(false);

    const quantity = getItemQuantity(id);

    return (
        <>
            <div className={styles.product}>
                <img
                    src={imgUrl}
                    onClick={() => setModalVisibility(true)}
                />
                <div className={styles.productInfo}>
                    <div className={styles.productInfo_description}>
                        <span className={styles.name}>{name}</span>
                        <span className={styles.price}>{formatCurrency(price)}</span>
                    </div>
                    {quantity ?
                        <div className={styles.productInfo_add_remove}>
                            <div className={styles.quantityInfo}>
                                <Button
                                    type='primary'
                                    onClick={() => decreaseItemQuantity(id)}
                                >-
                                </Button>
                                <span><b>{quantity}</b>in cart</span>
                                <Button
                                    onClick={() => increaseItemQuantity(id)}
                                    type='primary'
                                >+
                                </Button>
                            </div>
                            <Button
                                type="primary" danger
                                onClick={() => onRemoveItem(id)}
                            >Remove
                            </Button>
                        </div>
                        :
                        <Button onClick={() => increaseItemQuantity(id)} style={{width: '100%'}} type='primary'>+ Add to Cart</Button>
                    }
                    {modalVisibility ?
                        <Modal setModalVisibility={setModalVisibility}>
                            <img src={imgUrl} />
                        </Modal>
                        :
                        null
                    }
                </div>
            </div>
        </>

    );
});

export default StoreItem;