import { rest } from 'msw';
import { products } from './productData';

export const handlers = [
    // handles a GET /api/products request
    rest.get('/api/products', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(products),
            ctx.delay(150)
        )
    }),
    
]