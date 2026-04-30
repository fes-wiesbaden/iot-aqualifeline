import "./css/CustomRating.css";
import "primeicons/primeicons.css";
import { Rating } from "primereact/rating";
import { Link } from "react-router";

function CustomRating({ name, text , image }) {
  return (  
  
  <div className="rating">
          <img className="ratingPic" src={`./public/${image}.png`} alt="Rating Pic"/>
          <h2 className="ratingName">{name}</h2>
          <div className="ratingStars">
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
            <i class="pi pi-star-fill"></i>
          </div>
          <span className="ratingText">
            {text ? text : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis, dignissimos possimus nostrum commodi nulla dolorem temporibus iure? Tenetur minus tempora ratione velit, voluptas id at doloremque rerum nostrum ut ex!" } </span>
        </div>
  );
}

export default CustomRating;
