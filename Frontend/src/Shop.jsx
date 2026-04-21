import "./css/Shop.css";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { classNames } from "primereact/utils";
import { ProductService } from "./service/ProductService";
import { InputText } from "primereact/inputtext";
import ShoppingCart from "./ShoppingCart";
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";

function Shop() {
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
            <span className="prod-price">{product.price}€</span>
            <Button
              icon="pi pi-shopping-cart"
              className="prod-shop-button"
              disabled={product.inventoryStatus === "OUTOFSTOCK"}
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

  return (
    <>
      <div id="container">
        <h1>SHOP</h1>
        <ShoppingCart />
        <DataView value={products} listTemplate={listTemplate} />
      </div>
    </>
  );
}

export default Shop;
