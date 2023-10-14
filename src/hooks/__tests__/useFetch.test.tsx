import { vi, describe, it, expect, afterEach } from 'vitest';
import { renderHook, cleanup } from '@testing-library/react';
import useFetch from '../useFetch';

describe('useFetch Hook', () => {
    const RESPONSE = 0; // The index of the response in the tuple returned by useFetch
    const SEND_REQUEST = 1; // The index of the function that sends the request in the tuple returned by useFetch

    const FAKE_API_URL_1: string = 'https://jsonplaceholder.typicode.com/todos/1';
    const FAKE_API_URL_2: string = 'https://jsonplaceholder.typicode.com/todos/2';
    const FAKE_API_URL_3: string = 'https://jsonplaceholder.typicode.com/todos/3';

    type FakeApiData = {
        userId: number;
        id: number;
        title: string;
        completed: boolean;
    };

    describe('when data is fetched successfully', () => {
        afterEach(cleanup);

        it('should allow us to fetch data from an API when we first declare the hook', async () => {
            const { result } = renderHook(() => useFetch<FakeApiData>(FAKE_API_URL_1));
    
            await vi.waitFor(() => {
                expect(result.current[RESPONSE].data).toEqual({
                    userId: 1,
                    id: 1,
                    title: "delectus aut autem",
                    completed: false
                });
            });
        });
    
        it('should allow us to fetch data from an API not necessarily when we first declare the hook', async () => {
            const { result, rerender } = renderHook(() => useFetch<FakeApiData>());
    
            result.current[SEND_REQUEST](FAKE_API_URL_2);
            await vi.waitFor(() => {
                expect(result.current[RESPONSE].data).toEqual({
                    userId: 1,
                    id: 2,
                    title: 'quis ut nam facilis et officia qui',
                    completed: false
                });
            });
    
            rerender();
            result.current[SEND_REQUEST](FAKE_API_URL_3);
            await vi.waitFor(() => {
                expect(result.current[RESPONSE].data).toEqual({
                    userId: 1,
                    id: 3,
                    title: 'fugiat veniam minus',
                    completed: false
                });
            });
        });
    });

    describe('when data is not fetched successfully', () => {
        afterEach(cleanup);

        it('should return an error when the API endpoint is invalid', async () => {
            const { result } = renderHook(() => useFetch<FakeApiData>('invalid-url'));
    
            await vi.waitFor(() => {
                expect(result.current[RESPONSE].error).toEqual(new Error('Something went wrong! Please refresh the page or try again later.'));
            });
        });
    });

    describe('when data is being fetched', () => {
        afterEach(cleanup);

        it('should return a loading state when the API endpoint is valid', async () => {
            const { result } = renderHook(() => useFetch<FakeApiData>(FAKE_API_URL_1));
    
            // without waiting
            expect(result.current[RESPONSE].isLoading).toBeTruthy();

            // after waiting
            await vi.waitFor(() => {
                expect(result.current[RESPONSE].isLoading).toBeFalsy();
            });
        });
    });
});

