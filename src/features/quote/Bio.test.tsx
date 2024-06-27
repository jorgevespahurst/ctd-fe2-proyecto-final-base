import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Bio from '../bio/Bio';
import { NombresSimpsons, INFO_SIMPSONS } from '../bio/constants';


const server = setupServer(
    rest.get('*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(INFO_SIMPSONS[NombresSimpsons.BART]) // Mock para devolver datos de Bart Simpson
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Cambia la biografía al hacer clic en un botón de personaje', async () => {
    const { getByText, getByAltText, getByTestId } = render(<Bio />);

  // Espera a que se cargue la biografía inicial de Bart Simpson
    const imagenInicial = getByAltText('Bart Simpson');
    expect(imagenInicial).toBeTruthy();

  // Hacer clic en el botón de Lisa Simpson para cambiar la biografía
    const botonLisa = getByText('LISA');
    fireEvent.click(botonLisa);

  // Verifica que se haya cambiado la biografía a Lisa Simpson
    const imagenLisa = getByAltText('Lisa Simpson');
    expect(imagenLisa).toBeTruthy();
});