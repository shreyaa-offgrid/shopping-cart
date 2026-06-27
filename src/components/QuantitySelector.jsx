import "../styles/components/QuantitySelector.css"
export default function QuantitySelector({ text, quantity, setQuantity}) {
    function handleChange(e) {
        const value = e.target.value;
        if (value === "") {
            setQuantity("");
            return;
        }
        if (/^\d+$/.test(value)) {
            setQuantity(Number(value));
        }
    }
    function handleBlur() {
        if (quantity === "" || quantity < 1) {
            setQuantity(1);
        }
    }
    return (
        <div
            className="selector"
            onClick={(e) => e.stopPropagation()}
        >
            <p>{text}</p>
            <button
                className="minus"
                onClick={
                    () => {
                        setQuantity(quantity===1?1:quantity-1)
                    }
                }
                disabled={quantity===1}
            >
                -
            </button>
            <div>
                <input
                    type="text"
                    value={quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            <button
                className="plus"
                onClick={() => setQuantity(quantity+1)}
            >
                +
            </button>
        </div>
    )
}