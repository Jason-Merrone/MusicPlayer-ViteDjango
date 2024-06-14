import { Link } from 'react-router-dom';
import logo from './assets/logo.jpg';

export default function Banner(){
    async function logout() {
        const res = await fetch("/registration/logout/", {
          credentials: "same-origin",
        });
        if (res.ok) {
          window.location = "/registration/sign_in/";
        }
      }
    return(
        <>
        <div id="banner">
            <section id="logo-section">
                <img id="logo" src={logo} alt={"Music Player"}></img>
            </section>
            <section id="link-section">
                <Link to="/">
                    <button className="banner-link">Playlists</button>
                </Link>
                <Link to="/new">
                    <button className="banner-link">New</button>
                </Link>
                <Link>
                    <button className="banner-link" onClick={logout}>Logout</button>
                </Link>
            </section>
        </div>
        </>
    )
}