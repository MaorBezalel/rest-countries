import { DependencyList, EffectCallback, useEffect } from 'react';

import { useIsFirstRender } from '.';

/**
 * Runs an effect after the component has mounted, skipping the initial render.
 * @param effect The effect to run.
 * @param deps The dependencies to watch for changes.
 */
export default function useEffectAfterMount(effect: EffectCallback, deps?: DependencyList) {
    const isFirst = useIsFirstRender();

    useEffect(() => {
        if (!isFirst) {
            return effect();
        }
    }, deps)
}