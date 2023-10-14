import ThemeMode from './theme-mode/ThemeMode';
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="header-wrapper">
            <div className="header container">
                <h1 className="header__title"><Link to="/" aria-label="Go back to the home page">Where in the world?</Link></h1>
                <ThemeMode  />
            </div>
        </header>
    );
}