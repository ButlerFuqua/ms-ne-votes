import { Hono } from 'hono';

import { AdminController } from "./controllers/index.ts";
import { Middleware } from "./middleware.ts";


const app = new Hono();
(new Middleware(app)).addMiddleware();


(new AdminController(app)).addRoutes();


Deno.serve(app.fetch);