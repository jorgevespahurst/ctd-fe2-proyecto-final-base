import React, { ReactElement } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Cita from "./Cita";
import { rest, RestRequest, ResponseComposition, RestContext } from "msw";
import { setupServer  } from "msw/lib/node";
import { API_URL  } from "../../app/constants";
import { Provider } from "react-redux";
import { store } from "../../app/store";


const renderWithProvider = (ui: React.ReactElement) => {
    return render(<Provider store={store}>{ui}</Provider>);
};

const server = setupServer (
    rest.get (API_URL, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
        return res (
            ctx.status (200),
            ctx.json ([{ quote: "D' oh!", character: "Homer Simpson", Image: "", characterDirection: "Right"}])
        );
    }),
    rest.get (`${API_URL}?character=:character`, (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
        const { character } = req.params;
        if (character === "Homer Simpson") {
            return res (
                ctx.status (200),
                ctx.json ([{ quote: "D' oh!", character: "Homer Simpson", image: "", characterDirection: "Right"}])
            );
        } else if (!isNaN(Number(character))) {
            return res (ctx.status (400), ctx.json({ message: "El nombre debe ser un texto" }));
        } else {
            return res (ctx.status (404), ctx.json({ message: "No se encontro ninguna cita" }));
        }
    })
);

beforeAll (() => server.listen());
afterEach (() => server.resetHandlers());
afterAll (() => server.close());

describe ("Cita Component", () => {
    it ("fetches and displays a random quote when no input is provided", async () => {
        renderWithProvider(<Cita />);

        fireEvent.click(screen.getByRole('button', { name: /Obtener cita aleatoria/i }));

        expect(screen.getByText(/CARGANDO.../i)).toBeTruthy();

        await waitFor(() => {
            expect(screen.getByText(/D' oh!/i)).toBeTruthy();
            expect(screen.getByText(/Homer Simpson/i)).toBeTruthy();
        });
    });

    it ("fetches and displays a quote for a given character", async () => {
        renderWithProvider(<Cita />);

        fireEvent.change(screen.getByPlaceholderText(/Ingresa el nombre del autor/i), { target: { value: 'Homer Simpson' } });
        fireEvent.click(screen.getByRole('button', { name: /obtener cita/i }));

        expect (screen.getByText (/CARGANDO.../i)).toBeTruthy();

        await waitFor(() => {
            expect (screen.getByText (/D' oh!/i)).toBeTruthy();
            expect (screen.getByText (/Homer Simpson/i)).toBeTruthy();
        });
    });

it("displays an error message if a numeric value is provided", async() => {
    renderWithProvider(<Cita />);

    fireEvent.change(screen.getByPlaceholderText(/Ingresa el nombre del autor/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /obtener cita/i }));

    expect(screen.getByText(/CARGANDO.../i)).toBeTruthy();
    await waitFor(() => {
        expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeTruthy();
    });
});

it("displays a not found message if no quote is found for the given character", async() => {
    renderWithProvider(<Cita />);
    fireEvent.change(screen.getByPlaceholderText(/Ingresa el nombre del autor/i), { target: { value: 'Maggie' } });
    fireEvent.click(screen.getByRole('button', { name: /obtener cita/i }));

    expect(screen.getByText(/CARGANDO.../i)).toBeTruthy();

    await waitFor(() => {
        expect(screen.getByText(/Por favor ingrese un nombre válido/i)).toBeTruthy();
    });
});

it ("clears the quote and input when the clear button is clicked", ()=> {
    renderWithProvider(<Cita />);

    fireEvent.change (screen.getByPlaceholderText(/Ingresa el nombre del autor/i), { target: { value: 'Homer Simpson' } });
    fireEvent.click (screen.getByRole('button', { name: /obtener cita/i }));

    waitFor(() => {
        expect(screen.getByText(/D' oh!/i)).toBeTruthy();
    });

    fireEvent.click(screen.getByRole('button', { name: /borrar/i } ));

    expect(screen.queryByText(/D' oh!/i)).not.toBeTruthy();
    expect(screen.queryByText(/Homer Simpson/i)).not.toBeTruthy();
    expect(screen.getByPlaceholderText(/Ingresa el nombre del autor/i)).toBeTruthy();
    });
});

