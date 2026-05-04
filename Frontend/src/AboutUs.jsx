import "./css/AboutUs.css";
import "primeicons/primeicons.css";
import { Rating } from "primereact/rating";
import { Link } from "react-router";
import CustomRating from "./CustomRating";

function AboutUs() {
  return (
    <div className="aboutUs">
      <div className="infoWrapper">
        <h1 className="infoTitle">Unsere Philosophie</h1>
        <span className="infoText">
          Bei AquaLifeline glauben wir, dass jedes Aquarium eine Welt für sich
          ist und dass diese Welt es verdient, bestens überwacht und geschützt
          zu werden. Unsere Mission ist es, Aquariumbesitzern durch intelligente
          Sensorik und Echtzeit-Daten ein sorgenfreies Erlebnis zu ermöglichen.
          Nachhaltigkeit, Zuverlässigkeit und Transparenz stehen dabei im
          Mittelpunkt unseres Handelns - damit Mensch und Tier gleichermaßen
          profitieren.
        </span>
      </div>
      <div className="ratingsWrapper">
        <h1 className="ratingTitle">Rezensionen</h1>
        <CustomRating name="Marco F." image="rating-01" text="Seit ich AquaLifeline nutze, schlafe ich viel besser. Ich bekomme sofort eine Meldung, wenn sich die Wasserwerte verändern - das hat meinen Fischen schon mehr als einmal das Leben gerettet. Absolut empfehlenswert!"/>
        <CustomRating
          name="Christiane P."
          text="Ich war anfangs skeptisch, aber die Einrichtung war kinderleicht und mir wird alles auf einen Blick angezeigt. Die Daten sind immer aktuell und zuverlässig. Ein Muss für jeden ernsthaften Aquariumbesitzer."
          image="rating-02"
        />
        <CustomRating name="Günther T." image="rating-03" text="Was mich besonders überzeugt hat, ist die Nachhaltigkeit des Konzepts. Statt blind Chemikalien zuzuführen, reagiere ich jetzt gezielt auf echte Messwerte. Mein Aquarium war noch nie so stabil - und mein Gewissen auch nicht."/>
      </div>
    </div>
  );
}

export default AboutUs;
