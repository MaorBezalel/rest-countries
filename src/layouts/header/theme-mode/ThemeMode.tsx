import sunIcon from '../../../assets/icon-sun.svg';
import moonIcon from '../../../assets/icon-moon.svg';
import {useThemeMode} from '../../../hooks';
import { useRef} from 'react';

export default function ThemeMode() {
    const { theme, toggle } = useThemeMode('theme');
    const iconRef = useRef<HTMLImageElement>(null);

    const handleToggle = () => {
        toggle();
        iconRef.current?.classList.add('spin');
        setTimeout(() => {
            iconRef.current?.classList.remove('spin');
        }, 300);
    }
    
    return (
        <button className="theme-mode__toggle" type="button" aria-label="Light/Dark Mode" onClick={handleToggle}>
            <div className="theme-mode__indicator">
                <img className="theme-mode__icon" ref={iconRef} src={theme === 'light' ? sunIcon : moonIcon} alt={theme === 'light' ? "Sun Icon" : "Moon Icon"} />
            </div>
        </button>
    );
}