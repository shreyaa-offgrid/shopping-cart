import "../styles/Nav.css"

function Nav() {
    return (
        <header>
            <div><a href="">Home</a></div>
            <div><a href="">Shop</a></div>
            <div className='search-bar'>
                <img src="../src/assets/search-icon.svg" alt="A magnifying glass" />
                <input type="text" placeholder="What are you looking for?" />
                <a href="">&#x276F;</a>
            </div>
            <div className='cart'>
                <a href=""><img src="../src/assets/shopping-cart.svg" alt="" /></a>
                <p>0</p>
            </div>
        </header>
    )
}
export default Nav;