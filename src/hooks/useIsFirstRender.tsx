import { useRef } from 'react';

/**
 * A hook that returns a boolean indicating whether the component is being rendered for the first time.
 * @returns {boolean} A boolean indicating whether the component is being rendered for the first time.
 */
export default function useIsFirstRender(): boolean {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;

        return true;
    }

    return isFirst.current;
}