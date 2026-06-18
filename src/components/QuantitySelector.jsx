import "../styles/QuantitySelector.css"
export default function QuantitySelector({quantity, setQuantity}){
    function handleChange(e){
        const value = e.target.value;
        if(value===""){
            setQuantity("");
            return;
        }
        if(/^\d+$/.test(value)){
            setQuantity(Number(value));
        }
    }
    function handleBlur(){
        if(quantity==="" || quantity<1){
            setQuantity(1);
        }
    }
    return (
        <div 
            className="selector" 
            onClick={(e)=>e.stopPropagation()}
        >
            <p>Quantity:</p>
            <button 
                className="minus" 
                onClick={()=>setQuantity(prev=> prev===1?1:prev-1)}
            >
                -
            </button>
            <div>
                <input 
                    type="text"
                    value={quantity} 
                    onChange= {handleChange}
                    onBlur = {handleBlur}
                />
            </div>
            <button 
                className="plus" 
                onClick={()=>setQuantity(prev=>prev+1)}
            > 
                +
            </button>
        </div>
    )
}