import "../styles/pages/Home.css";
import { NavLink } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";

function Home() {
    return (
        <section className="home-page">
            <img
                className="hero-image"
                src={heroImage}
                alt="Fashion model"
            />

            <div className="overlay"></div>

            <div className="hero-content">
                <p className="hero-subtitle">DISCOVER MORE</p>

                <h1 className="hero-title">
                    VERDE
                </h1>

                <p className="hero-description">
                    Thoughtfully curated fashion, electronics,
                    and lifestyle essentials for everyday living.
                </p>

                <NavLink to="/shop">
                    <button className="shop-btn">
                        Shop Collection
                    </button>
                </NavLink>
            </div>

            <div className="background-text">
                VERDE
            </div>
        </section>
    );
}

export default Home;