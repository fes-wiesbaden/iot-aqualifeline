import "./css/Shop.css";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { ProductService } from "./service/ProductService";
import { InputText } from "primereact/inputtext";
import ShoppingCart from "./ShoppingCart";
import LoadingScreen from "./LoadingScreen";
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

function Shop({ shoppingCart, setShoppingCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsSmall().then((data) => setProducts(data));
  }, []);

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const itemTemplate = (product, index) => {
    return (
      <div className="product-wrap" key={product.id}>
        <img
          className="prod-img"
          src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`}
          alt={product.name}
        />
        <div className="prod-data-wrap">
          <div className="prod-info">
            <div className="prod-name">{product.name}</div>
            <span className="prod-price">{product.price}€</span>
            <Rating value={product.rating} readOnly cancel={false}></Rating>
            <div className="prod-lesser-info">
              <span className="prod-tag">
                <i className="pi pi-tag"></i>
                <span className="font-semibold">{product.category}</span>
              </span>
              <Tag
                value={product.inventoryStatus}
                severity={getSeverity(product)}
                className="prod-inv-status"
              ></Tag>
            </div>
          </div>

          <div className="prod-buy-wrap">
            <Button
              icon="pi pi-shopping-cart"
              className="prod-shop-button"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
              onClick={() => addToCart(product)}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((product, index) => {
      return itemTemplate(product, index);
    });

    return <div className="products">{list}</div>;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product) => {
    setShoppingCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, count: p.count + 1 } : p,
        );
      }
      return [...prev, { ...product, count: 1 }];
    });
  };


  if (loading) return <LoadingScreen />;

  return (
    <>
      <div id="container">
        <h1>SHOP</h1>
        <ShoppingCart
          shoppingCart={shoppingCart}
          setShoppingCart={setShoppingCart}
        />
        <DataView value={products} listTemplate={listTemplate} />
      </div>
    </>
  );
}

export default Shop;
