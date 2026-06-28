import "../styles/pages/Shop.css"
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx"
import ProductModal from "../components/ProductModal.jsx";
import { PropagateLoader } from "react-spinners";
import { useContext } from "react";
import SearchContext from "../SearchContext";

export default function Shop() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { searchQuery } = useContext(SearchContext);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    const filteredProducts = products.filter(product => {
        const query = searchQuery.trim().toLowerCase();

        if (query === "") {
            return true;
        }

        return (
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    });

    if (loading) {
        return (
            <main>
                <div className="loading">
                    <PropagateLoader size={10} />
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main>
                <div className='error'>
                    <p>{error}</p>
                    <button onClick={loadProducts}>Retry</button>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="shop-grid">
                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
                {filteredProducts.length === 0 ? (
                    <p className="no-results">
                        No products found for "{searchQuery}"
                    </p>
                ) : (filteredProducts.map(product => (
                    <ProductCard
                        {...product}
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                    />
                )))}
            </div>
        </main>
    );
}
