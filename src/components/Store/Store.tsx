import React, {memo, useMemo} from 'react';
import Navbar from "../Navbar/Navbar";
import StoreItem from "../StoreItem/StoreItem";
import storeItems from '../../data/items.json';

import styles from './Store.module.scss';

const Store = memo(() => {

    return (
        <>
            <Navbar />
            <div className={styles.storeContainer}>
                {storeItems.map(el =>
                    <StoreItem
                        key={el.id}
                        id={el.id}
                        price={el.price}
                        name={el.name}
                        imgUrl={el.imgUrl}
                    />
                )}
            </div>
        </>
    );
});

export default Store;