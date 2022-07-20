import React, {createContext, FC, memo, ReactNode, useCallback, useContext, useMemo, useState} from "react";
import ShoppingCart from "../components/ShoppingCart/ShoppingCart";
import {useLocalStorage} from "../hooks/useLocalStorage";

interface StoreContextProviderProps {
    children: ReactNode
}

export type CartItem = {
    id: number,
    quantity: number
}

interface StoreContextProps {
    cartItems: CartItem[],
    increaseItemQuantity: (id: number) => void,
    decreaseItemQuantity: (id: number) => void,
    getItemQuantity: (id: number) => number,
    totalQuantity: () => number,
    onOpenCart: () => void,
    onCloseCart: () => void,
    onRemoveItem: (id: number) => void
}

export const StoreContext = createContext({} as StoreContextProps);

export const StoreContextProvider: FC <StoreContextProviderProps> = ({children}) => {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('', []);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

    const getItemQuantity =(id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    const increaseItemQuantity = useCallback((id: number) => {
        setCartItems(currState => {
            if(currState.find(item => item.id === id) == null) {
                return [{id, quantity: 1}, ...currState]
            } else {
                return currState.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    },[]);

    const decreaseItemQuantity = useCallback((id: number) => {
        setCartItems(currState => {
            if(currState.find(item => item.id === id)?.quantity === 1) {
                return currState.filter(item => item.id !== id);
            } else {
                return currState.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item;
                    }
                })
            }
        })
    },[]);

    const onRemoveItem = (id: number) => {
        setCartItems(currState => currState.filter(item => item.id !== id));
    }

    const totalQuantity = () => {
        return cartItems.reduce((total, currItem ) => total + currItem.quantity, 0)
    }

    const onOpenCart = () => setIsCartOpen(true);
    const onCloseCart = () => setIsCartOpen(false);

    return(
        <StoreContext.Provider value={{
            cartItems,
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            totalQuantity,
            onOpenCart,
            onCloseCart,
            onRemoveItem
        }}>
            {children}
            <ShoppingCart isCartOpen={isCartOpen} />
        </StoreContext.Provider>
    )
};

export const useStoreContext = () => useContext(StoreContext);