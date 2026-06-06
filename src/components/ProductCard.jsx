import "../styles/ProductCard.css"
function ProductCard({ title, price, description, category, image, rating }) {
    return (
        <div className="card-container">
            <div className="product-card">
                <div className="product-img">
                    <img src={image} alt="" />
                </div>
                <p>{title}</p>
                <h3>Rs {price * 100}</h3>
                <div className="rating">
                    <p>&#9733; {rating.rate}</p>
                    <p class="count">({rating.count})</p>
                </div>
            </div>
        </div>

    )
}

export default ProductCard;