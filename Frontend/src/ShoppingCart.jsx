import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import "./css/ShoppingCart.css";
import "primeicons/primeicons.css";

function ShoppingCart({ shoppingCart, setShoppingCart  }) {

  const updateCount = (id, method) => {
    setShoppingCart((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product;
        return {
          ...product,
          count: method === "add" ? product.count + 1 : product.count - 1,
        };
      }),
    );
  };

  const calcSummary = (products) => {
    let sum = 0;
    products.forEach((product) => {
      sum = sum + product.price * product.count;
    });
    return Math.round(sum * 100) / 100;
  };

  const [visibleCart, setVisibleCart] = useState(false);
  const [mounted, setMounted] = useState(true);
  /** delay to let css settle animations first */

  const deleteFromCart = (id) => {
    setShoppingCart((prev) => prev.filter((p) => p.id !== id));
  };

  const itemTemplate = (product, index) => {
    return (
      <div className="cart-wrap" key={product.id}>
        <img
          className="cart-prod-img"
          src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
          alt={product.name}
        />
        <div className="cart-prod-data-wrap">
          <div className="cart-prod-info">
            <div className="cart-prod-name">{product.name}</div>
            <span className="cart-prod-price">{product.price}€</span>
          </div>

          <div className="cart-prod-lesserinfo-wrap">
            <Button
              icon="pi pi-plus"
              className="cart-prod-add-button"
              onClick={() => updateCount(product.id, "add")}
            ></Button>
            <InputNumber
              className="prod-count"
              value={product.count}
              onValueChange={(e) =>
                setShoppingCart((prev) =>
                  prev.map((p) =>
                    p.id === product.id ? { ...p, count: e.value } : p,
                  ),
                )
              }
              min={1}
              max={99}
            />
            <Button
              icon="pi pi-minus"
              className="cart-prod-subtract-button"
              onClick={() => updateCount(product.id, "subtract")}
            ></Button>
            <Button
              icon="pi pi-trash"
              className="cart-prod-delete-button"
              onClick={() => deleteFromCart(product.id)}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const navigate = useNavigate();
  return (
    <div className="shopping-cart">
      <button
        className={`shopping-cart-btn ${visibleCart ? "active" : ""}`}
        onClick={
          () =>
            setVisibleCart(
              (prev) => !prev,
            ) /* toggle the cart visibility on ACTUAL current value*/
        }
      >
        <i
          className={`${visibleCart ? "pi pi-times" : "pi pi-shopping-cart"}`}
        ></i>
      </button>

      {mounted && (
        <div className={`cart-products ${visibleCart ? "active" : ""}`}>
          <span className="cart-headline">
            YOUR SHOPPING CART ({shoppingCart.length})
          </span>
          {shoppingCart.map((product, index) => itemTemplate(product, index))}
          <div className="cart-footer">
            <span className="cart-summary">
              SUMMARY: {calcSummary(shoppingCart)} €
            </span>
            <Button
              className="cart-checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
