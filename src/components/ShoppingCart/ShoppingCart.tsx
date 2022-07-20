import React, {FC, memo} from 'react';
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons/lib";

import styles from './ShoppingCart.module.scss';
import {useStoreContext} from "../../context/StoreContext";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import {formatCurrency} from "../../utilities/formatCurrency";
import storeItems from '../../data/items.json';


interface ShoppingCartProps {
    isCartOpen: boolean
}

const ShoppingCart:FC <ShoppingCartProps> = memo(({isCartOpen}) => {

    const {onCloseCart, cartItems} = useStoreContext();

    const {cart, screenCover, cartContent, active} = styles;

    const totalPrice = cartItems.reduce((total, currItem) => {
        const item = storeItems.find(item => item.id === currItem.id);
        return total + (item?.price || 0) * currItem.quantity
    }, 0)

    return (
        <>
            <aside className={isCartOpen ? [cart, active].join(' ') : cart}>
                <div
                    className={isCartOpen ? [screenCover, active].join(' ') : screenCover}
                    onClick={onCloseCart}
                />
                <div className={isCartOpen ? [cartContent, active].join(' ') : cartContent}>
                    <header>
                        <h1>Cart</h1>
                        <Button
                            type='text'
                            icon={<CloseOutlined style={{fontSize: '2rem'}}/>}
                            onClick={onCloseCart}
                        />
                    </header>
                    <ul>
                        {cartItems.map(item =>
                            <ShoppingCartItem key={item.id} {...item} />
                        )}
                    </ul>
                    <span className={styles.total}>Total: {formatCurrency(totalPrice)}</span>
                </div>
            </aside>
        </>

    );
});

export default ShoppingCart;