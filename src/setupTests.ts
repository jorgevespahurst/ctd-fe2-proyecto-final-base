// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import { setupServer } from "msw/node";
import { rest } from "msw";
import { API_URL  } from './app/constants';

const handlers = [
    rest.get (API_URL, (req, res, ctx) => {
        return res (
            ctx.status (200),
            ctx.json ([{ quote: "D' oh!", character: "Homer Simpson", Image: "", characterDirection: "Right"}])
        );
    }),
    rest.get (`$ {API_URL} ?character=character`, (req, res, ctx) => {
        const { character } = req.params;
        if (character === "Homer Simpson") {
            return res (
                ctx.status (200),
                ctx.json ([{ quote: "D' oh!", character: "Homer Simpson", Image: "", characterDirection: "Right"}])
            );
        } else if (!isNaN (character)) {
            return res (ctx.status (400), ctx.json({ message: "El nombre debe ser un texto"}));
        } else {
            return res (ctx.status (404), ctx.json ({ message: "No se encontro ninguna cita"}));
        }
    })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


