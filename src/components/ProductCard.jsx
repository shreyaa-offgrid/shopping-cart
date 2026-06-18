import "../styles/ProductCard.css";
import PropTypes from "prop-types";

function ProductCard({ title, price, image, rating, onClick}) {
    return (
        <div className="card-container">
            <div className="product-card" onClick={onClick}>
                <div className="product-img">
                    <img src={image} alt={title} />
                </div>

                <p>{title}</p>
                <h3>Rs {price * 100}</h3>
                <div className="rating">
                    <p>&#9733; {rating.rate}</p>
                    <p className="count">({rating.count})</p>
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,

    rating: PropTypes.shape({
        rate: PropTypes.number.isRequired,
        count: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;