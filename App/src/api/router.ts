import { Router } from 'express';
import {helloWorld} from "./routes/hello-world.route";
import {getAllProducts} from "./routes/get-all-products.route";
import {ProductRepository} from "./persistence/product-repository";
import {getProduct} from "./routes/get-product.route";
import {addProduct} from "./routes/add-product.route";
import {deleteProduct} from "./routes/delete-product.route";
import {updateProduct} from "./routes/update-product.route";

const repository = new ProductRepository()
const router = Router();

router.get("/hello", helloWorld);
router.get("/products", (req, res) => getAllProducts(req, res, repository))
router.post("/products", (req, res) => addProduct(req, res, repository))
router.get("/products/:productId", (req, res) => getProduct(req, res, repository))
router.delete("/products/:productId", (req, res) => deleteProduct(req, res, repository))
router.put("/products/:productId", (req, res) => updateProduct(req, res, repository))

export default router;