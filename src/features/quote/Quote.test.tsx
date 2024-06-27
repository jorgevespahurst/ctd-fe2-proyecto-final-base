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

const citaPersonaje = [
    {
        quote: "All I'm gonna use this bed for is sleeping, eating and maybe building a little fort.",
        character: "Homer Simpson",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
        characterDirection: "Right",
    }
]

const citaRandom = [
    {
        quote: "Oh Yeah!",
        character: "Duffman",
        image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FDuffman.png?1497567511709",
        characterDirection: "Left"
    }
    ]

    export const handlers = [
        rest.get("https://thesimpsonsquoteapi.glitch.me/quotes", (req, res, ctx) => {
            const data = req.url.searchParams.get('character') ? citaPersonaje : citaRandom
            console.log('Ejecutando desde msw', data)
    
            return res(
            ctx.status(200),
            ctx.json(data)
            )
        })
    
    ]

const server = setupServer (...handlers)


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
            expect (screen.getByText (/Homer/i)).toBeTruthy();
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

    expect (await screen.findByText(/Por favor ingrese un nombre válido/i)).toBeTruthy();
});

it ("clears the quote and input when the clear button is clicked", ()=> {
    renderWithProvider(<Cita />);

    fireEvent.change (screen.getByPlaceholderText(/Ingresa el nombre del autor/i), { target: { value: 'Homer' } });
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

