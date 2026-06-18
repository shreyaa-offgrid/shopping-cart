import "../styles/Shop.css"
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx"
import ProductModal from "../components/ProductModal.jsx";

export default function Shop() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        setLoading(true);
        setError(null);
        try{
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch(err){
            setError('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return (
            <main>
                <div className="loading">
                    <h1>Loading products...</h1>
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
                        onClose={()=>setSelectedProduct(null)}
                    />
                )}
                {products.map(product => (
                    <ProductCard 
                        {...product} 
                        key={product.id} 
                        onClick={()=>setSelectedProduct(product)}
                    />
                ))}
            </div>
        </main>
    );
}
