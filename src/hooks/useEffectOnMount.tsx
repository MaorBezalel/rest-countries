import { EffectCallback, useEffect } from 'react';

/**
 * Runs the effect only on the initial render/mount.
 * @param effect The effect to run on mount.
 */
export default function useEffectOnMount(effect: EffectCallback) {
    useEffect(effect, []);
}