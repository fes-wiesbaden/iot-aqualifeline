import "./css/Footer.css";
import "primeicons/primeicons.css";
import { Link } from "react-router";

function Footer() {
  return (
    <footer>
      <h1>KONTAKT & WEITERES</h1>
      <div className="footerinside">
        <p>
          <Link to="/legal">IMPRESSUM</Link>
        </p>
        <p>
          <Link to="/legal">DATENSCHUTZ</Link>
        </p>
        <p>TEL.: 0611 676767</p>
        <p>
          <Link to="https://www.pexels.com">Bildquelle</Link>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
