import logo from './assets/logo.jpg';

export default function Banner(){
    return(
        <>
        <div id="banner">
            <section id="logo-section">
                <img id="logo" src={logo} alt={"Music Player"}></img>
            </section>
            <section id="link-section">
                <button className="banner-link">Playlists</button>
                <button className="banner-link">New</button>
                <button className="banner-link">Logout</button>
            </section>
        </div>
        </>
    )
}