import React, { ReactElement } from "react"; 
import { render } from "@testing-library/react"; 
import { configureStore, PreloadedState } from "@reduxjs/toolkit"; 
import { Provider } from "react-redux"; 
import { RootState } from "./app/store"; 
import citaReducer from "./features/quote/citaSlice"; 

enum ESTADO_FETCH {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
    SUCCEEDED = 'SUCCEEDED',
    FAILED = 'FAILED'
}

const defaultCitaState = {
    data: null,
    estado: ESTADO_FETCH.IDLE,
};

const renderWithProviders = (
    ui: ReactElement,
    { preloadedState = {
        cita: defaultCitaState,
    }, store = configureStore ({ reducer: { cita: citaReducer }, preloadedState: preloadedState as PreloadedState<RootState> }), }: {
        preloadedState?: PreloadedState<RootState>;
        store?: ReturnType<typeof configureStore>;
    } = {}
) => {
    return render (<Provider store={store}>{ui}</Provider>);
};

export * from "@testing-library/react"; 
export { renderWithProviders as render };

