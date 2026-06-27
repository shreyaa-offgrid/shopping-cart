import "../styles/components/Footer.css"

export default function Footer(){
    const year = new Date().getFullYear();
    return (
        <footer>
            <p>Made with &hearts; by Shreya Singh</p>
            <p>Copyright &copy; {year}</p>
            <p>Using <a href="https://fakestoreapi.com/" target="_blank">FakeStoreAPI &#8599;</a></p>
        </footer>
    )
}