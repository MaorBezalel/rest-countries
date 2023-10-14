import axios, { AxiosResponse } from 'axios';
import { useReducer } from 'react';
import { useEffectOnMount } from '.';

/**
 * Represents the state of a fetch request.
 * @template T The type of data returned by the fetch request.
 */
type State<T> = {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

/**
 * Enum representing the possible action types for useFetch hook.
 */
enum ActionType {
    FETCH_LOADING = 'FETCH_LOADING',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_FAILURE = 'FETCH_FAILURE',
}

/**
 * Represents the possible actions that can be dispatched by the useFetch hook.
 * @template T The type of the payload.
 */
type Action<T> =
    | { type: ActionType.FETCH_LOADING }
    | { type: ActionType.FETCH_SUCCESS; payload: T }
    | { type: ActionType.FETCH_FAILURE; payload: Error };

/**
 * A reducer function for handling state changes in response to data fetching actions.
 * @template T The type of data being fetched.
 * @returns A new state object based on the given action type and payload.
 */
const dataFetchReducer = <T,>() => (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
        case ActionType.FETCH_LOADING:
            return { ...state, isLoading: true };
        case ActionType.FETCH_SUCCESS:
            return { ...state, data: action.payload, isLoading: false };
        case ActionType.FETCH_FAILURE:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}

type UseFetchResult<T> = [State<T>, (url: string, applyToData?: {(data: T): T}[]) => void];

/**
 * A hook for fetching data from an API endpoint.
 * @template T The type of data returned by the API endpoint.
 * @param {string} url The URL of the API endpoint.
 * @param {Array<(data: T) => T>} [applyToData] An optional array of functions to apply to the fetched data.
 * @returns {[UseFetchResult<T>, (url: string, applyToData?: Array<(data: T) => T>) => void]} A tuple containing the request state and a function to send a request.
 */
export default function useFetch<T>(url?: string, applyToData?: {(data: T): T}[]): UseFetchResult<T> {
    const [requestState, dispatch] = useReducer(dataFetchReducer<T>(), {
        data: null,
        isLoading: false,
        error: null,
    });

    useEffectOnMount(() => {
        if (!url) return;
        sendRequest(url, applyToData);
    });

    /**
     * Sends a GET request to the specified URL and dispatches the response data to the store.
     * @param url - The URL to send the GET request to.
     * @param applyToData - An optional array of functions to apply to the response data before dispatching it to the store.
     */
    const sendRequest = (url: string, applyToData?: {(data: T): T}[]) => {
        dispatch({ type: ActionType.FETCH_LOADING });
        axios
            .get(url)
            .then((response: AxiosResponse<T>) => {
                if (applyToData) {
                    applyToData.forEach((func) => {
                        response.data = func(response.data);
                    });
                }
                dispatch({ type: ActionType.FETCH_SUCCESS, payload: response.data });
            })
            .catch(() => {
                const error = new Error('Something went wrong! Please refresh the page or try again later.');
                dispatch({ type: ActionType.FETCH_FAILURE, payload: error });
            });
    }

    return [requestState, sendRequest];
}