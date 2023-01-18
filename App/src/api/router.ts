import { Router } from 'express';
import {helloWorld} from "./routes/hello-world.route";

const router = Router();

router.get("/hello", helloWorld);

export default router;