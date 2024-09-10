import { Hono } from 'hono';

import { UsersController } from "./controllers/index.ts";
import { Middleware } from "./middleware.ts";


const app = new Hono();
(new Middleware(app)).addMiddleware();


(new UsersController(app)).addRoutes();


Deno.serve(app.fetch);