import "./css/Checkout.css";
import { Button } from "primereact/button";
import { ProductService } from "./service/ProductService";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import ShoppingCart from "./ShoppingCart";
import LoadingScreen from "./LoadingScreen";
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

function Checkout({ shoppingCart, setShoppingCart }) {
  const [loading, setLoading] = useState(true);
  const [totalCost, setTotalCost] = useState();

  const calcSummary = (products) => {
    let sum = 0;
    products.forEach((product) => {
      sum = sum + product.price * product.count;
    });
    setTotalCost(sum);
  };

  useEffect(() => {
    calcSummary(shoppingCart);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const itemTemplate = (product, index) => {
    return (
      <div className="cart-wrap" key={product.id}>
        <img
          className="cart-prod-img"
          src={`./public/${product.image}`}
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
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div id="container">
        <h1>KASSE</h1>
        {console.log(shoppingCart)}
        <div className="checkoutContainer">
          <div className="checkoutInnerContainer">
            <div className="shipping">
              <h1>Kontaktdaten:</h1>
              <div className="credentials">
                <h2>Vorname:</h2>
                <input type="text" placeholder="First Name" />
                <h2>Nachname:</h2>
                <input type="text" placeholder="Last Name" />
                <h2>E-Mail:</h2>
                <input type="text" placeholder="E-Mail" />
              </div>
              <h1>Bestelldetails:</h1>
              <div className="deliveryDetails">
                <h2>Stadt:</h2>
                <input type="text" placeholder="City" />
                <h2>PLZ:</h2>
                <input type="text" placeholder="Zip Code" />
                <h2>Straße:</h2>
                <input type="text" placeholder="Street" />
                <h2>Hausnummer:</h2>
                <input type="text" placeholder="House Number" />
              </div>
            </div>

            <div className="summary">
              <div className="summaryText">
                <h1>Zusammenfassung:</h1>
                {shoppingCart.map((product, index) =>
                  itemTemplate(product, index),
                )}
                <h2 className="total">GESAMT: {totalCost} €</h2>
              </div>
              <Button
                icon="pi pi-shopping-cart"
                label="Place Order"
                className="order-button"
                disabled
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
