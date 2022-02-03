/**
 * @jest-environment jsdom
 */


import React from 'react';
// the below import comes from test-utils because we have adapted the render method to use a redux store and includes our productsReducer.
import { screen, render, waitFor } from './test-utils';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Products from './Products';
import productData from '../../mocks/productData';

afterAll(() => {
    global.fetch.mockClear();
    delete global.fetch;
})


global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve(productData),
    })
);

test('Products are fetched and rendered', async () => {
    render(<Products />);
    const firstProduct = await screen.findByText('Tanglewood TUJ2CE Exotic Java Concert Ukulele');
    expect(firstProduct).toBeInTheDocument();
})