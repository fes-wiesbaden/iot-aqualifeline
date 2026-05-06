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
    calcSummary(shoppingCart);
  };
  const calcSummary = (products) => {
    // calculate price sum of all products in cart
    let sum = 0;
    products.forEach((product) => {
      sum = sum + product.price * product.count;
    });
    setTotalCost(sum);
  };

  const deleteFromCart = (id) => {
    setShoppingCart((prev) => prev.filter((p) => p.id !== id));
    calcSummary(shoppingCart.filter((p) => p.id !== id));
  };

  useEffect(() => {
    // calculate price sum when initially loading
    calcSummary(shoppingCart);
  }, []);

  useEffect(() => {
    // fake loading timer to hide component rendering
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  const itemTemplate = (product, index) => {
    // generate item component for given product
    return (
      <div className="cart-wrap" key={product.id}>
        <img
          className="cart-prod-img"
          src={`/iot-aqualifeline/${product.image}`}
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
              onClick={() => updateCount(product.id, "add")} // add 1 to count for given product
            ></Button>
            <InputNumber
              className="prod-count"
              value={product.count}
              onValueChange={(e) =>
                setShoppingCart((prev) =>
                  prev.map(
                    (p) => (p.id === product.id ? { ...p, count: e.value } : p), // get chosen product and change its count manually
                  ),
                )
              }
              min={1}
              max={99}
            />
            <Button
              icon="pi pi-minus"
              className="cart-prod-subtract-button"
              onClick={() => updateCount(product.id, "subtract")} // subtract 1 to count for given product
            ></Button>
            <Button
              icon="pi pi-trash"
              className="cart-prod-delete-button" // TODO: implement delete from cart button
              onClick={() => deleteFromCart(product.id)}
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
        {console.log(shoppingCart) /* debug */}
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
                {shoppingCart.map(
                  (
                    product,
                    index, // create item component for each shopping cart item
                  ) => itemTemplate(product, index),
                )}
                <h2 className="total">Gesamt: {totalCost} €</h2>
              </div>
              <Button
                icon="pi pi-shopping-cart"
                label="Bestellen"
                className="order-button"
                disabled /* we dont take orders, just proof of concept */
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
