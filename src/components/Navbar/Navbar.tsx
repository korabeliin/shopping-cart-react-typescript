import React, {memo, useContext} from 'react';
import {ShoppingCartOutlined} from "@ant-design/icons/lib";
import { Button } from 'antd';

import styles from './Navbar.module.scss';
import {useStoreContext} from "../../context/StoreContext";

const Navbar = memo(() => {

    const {onOpenCart, totalQuantity} = useStoreContext();

    const totalCartQuantity = totalQuantity();

    return (
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarContainer_content}>
                <h1>Store</h1>
                <div
                    className={styles.navbarCart_button}
                    onClick={onOpenCart}
                >
                    <Button
                        type='primary'
                        shape="circle"
                        style={{height: '4rem', width: '4rem'}}
                        icon={<ShoppingCartOutlined style={{fontSize: '2rem'}}
                        />}
                    >
                        {totalCartQuantity ?
                            <span className={styles.navQuantity}>{totalCartQuantity}</span>
                            :
                            null
                        }
                    </Button>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;