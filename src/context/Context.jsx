import React, { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export default function ContextProduct({ children }) {
  //favorite icons
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const savedFavorites = localStorage.getItem("favoriteItems");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const addToFavorite = (item) => {
    const existingFavoriteItem = favoriteItems.some(
      (favoriteItem) => favoriteItem.id === item.id,
    );
    if (!existingFavoriteItem) {
      setFavoriteItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    } else {
      setFavoriteItems((prevItems) => [
        ...prevItems.filter((favoriteItem) => favoriteItem.id !== item.id),
      ]);
    }
  };

  const handleRemoveFavorite = (itemId) => {
    setFavoriteItems((prevItems) =>
      prevItems.filter((favoriteItem) => favoriteItem.id !== itemId),
    );
  };
   useEffect(() => {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const IncreaseQuantity = (itemId) => {
    setCartItems((prevItem) =>
      prevItem.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    );
  };
  const DecreaseQuantity = (itemId) => {
    setCartItems((prevItem) =>
      prevItem.map((cartItem) =>
        cartItem.id === itemId && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      ),
    );
  };
  const handleRemoveCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((CartItem) => CartItem.id !== itemId),
    );
  };

  const addToCart = (item) => {
    const existingCartItem = cartItems.some(
      (cartItem) => cartItem.id === item.id,
    );
    if (!existingCartItem) {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    } else {
      setCartItems((prevItems) => [
        ...prevItems.filter((cartItem) => cartItem.id === item.id),
      ]);
    }
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        cartItems,
        addToFavorite,
        favoriteItems,
        DecreaseQuantity,
        IncreaseQuantity,
        handleRemoveCart,
        handleRemoveFavorite
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
