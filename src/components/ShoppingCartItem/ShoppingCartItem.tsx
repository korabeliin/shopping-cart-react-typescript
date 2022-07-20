import React, {FC, memo} from 'react';
import styles from './ShoppingCartItem.module.scss';
import {Button} from "antd";
import {formatCurrency} from "../../utilities/formatCurrency";
import {CartItem, useStoreContext} from "../../context/StoreContext";
import storeItems from '../../data/items.json';

const ShoppingCartItem: FC <CartItem> = memo(({id, quantity}) => {

    const {onRemoveItem} = useStoreContext();
    const item = storeItems.find(item => item.id === id);
    if(item == null) return null;

    return (
        <>
            <li className={styles.cartItem}>
                <div className={styles.cartItem_info}>
                    <img src={item.imgUrl}/>
                    <div className={styles.cartItem_info_text}>
                        <div>
                            <span className={styles.itemName}>{item.name}</span>
                            <span className={styles.itemPrice}>{formatCurrency(item.price)}</span>
                        </div>
                        {quantity > 1 &&
                            <span className={styles.multiple}>&times;{quantity}</span>
                        }
                    </div>
                </div>
                <div className={styles.priceAndRemove}>
                    <span className={styles.cartPrice}>{formatCurrency(item.price)}</span>
                    <Button
                        type='default'
                        danger
                        onClick={() => onRemoveItem(id)}
                    >&times;
                    </Button>
                </div>
            </li>

        </>
    );
});

export default ShoppingCartItem;