import "./css/AboutUs.css";
import "primeicons/primeicons.css";
import { Rating } from "primereact/rating";
import { Link } from "react-router";
import CustomRating from "./CustomRating";

function AboutUs() {
  return (
    <div className="aboutUs">
      <div className="infoWrapper">
        <h1 className="infoTitle">Unsere Unternehmensphilosophie</h1>
        <span className="infoText">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
          fugiat ipsum atque modi rerum doloremque exercitationem? Ratione,
          reprehenderit architecto! Dolorem, doloremque deserunt modi omnis
          reprehenderit quaerat odit placeat fugiat porro.
        </span>
      </div>
      <div className="ratingsWrapper">
        <h1 className="ratingTitle">Rezensionen</h1>
        <CustomRating name="Name 1" image="rating-01"/>
        <CustomRating name="Name 2" text="hallo ich find aqualifeline soooo toll omg ich liebe das produkt omg omg" image="rating-02"/>
        <CustomRating name="Name 3" image="rating-03"/>
      </div>
    </div>
  );
}

export default AboutUs;
