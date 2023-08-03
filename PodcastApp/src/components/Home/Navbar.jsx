
import Menu from "./Menu"

export default function Navbar() {
    return (
      <header className="header">
        <div className="site-title">
            <img src=".\src\assets\Logo.png" width = '80px' alt="Volume, Chill and Podcast Logo" />
            <h1 className="header-title"> Chill and Podcast</h1>
        </div>
        <nav>
        <div className="navbar">
        <img src="./src/assets/search.png"></img>
        <div className="container nav-container">
        <input className="checkbox"/>
            <div className='menu' ></div>
            <div className="hamburger-lines">
            <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>  
          </div>
        </div>
      </nav>
      </header>
    )
  }

 