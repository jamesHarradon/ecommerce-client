import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsReducer from "./productsSlice";
import guestReducer from "../../guestSlice";

// the render function below allows us to create our own render function that will replace the render method imported from @testing-library/react in our test.
// this will enable us to use a data store
// we then import from this file as we normally would to use methods from @testing-library/react

function render(
    //parameters
    ui,
    {
        preloadedState,
        store = configureStore({ reducer: { products: productsReducer, guest: guestReducer }, preloadedState }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

//re-export everything
export * from '@testing-library/react';
//override render method
export { render };