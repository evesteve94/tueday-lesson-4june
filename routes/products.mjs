import oExpress from "express";
let router = oExpress.Router();
import products from "../constants/products.js";

//middleware för att reqest.body kan defineras
router.use(oExpress.json());

//GET PRODUCTS
router.get("/api/products", (_request, _response) => {
    _response.status(200).json(products);
})

router.get("/api/products/:id", (_request, _response) => {
    let id = parseInt(_request.params.id);

    if(isNaN(id)) {
        return _response.status(400).send("400 error, bad request. invalid id");
    }

    let specProduct = products.find((product) => {
        return product.id === id;
    })

    if(!specProduct) return _response.status(404).send(`404 page not found, no product with id ${id} found. `)

    _response.status(200).json(specProduct);
})


//POST PRODUCT
router.post("/api/products", (_request, _response) => {
    let {body} = _request;

    let addNewProduct = {
        id: products[products.length -1].id + 1, ...body
    }

    products.push(addNewProduct);

    _response.status(201).send(addNewProduct);
})

//PUT PRODUCT
router.put("/api/products/:id", (_request, _response) => {
    let {body, params: {id}} = _request;

    let productId = parseInt(id);

    if(isNaN(productId)) {
        return _response.status(400).send("400 bad request, please enter a valid id")
    }

    let productIndex = products.findIndex((product) => {
        return product.id === productId;
    })

    if(productIndex === -1) {
        return _response.status(404).send("404 page not found, product not found")
    };

    products[productIndex] = {id: productId, ...body};

    _response.status(200).send(products[productIndex]);

})


//PATCH PRODUCT
router.patch("/api/products/:id", (_request, _response) => {
    let {body, params: {id}} = _request;

    let productId = parseInt(id);

    if(isNaN(productId)) {
        return _response.status(400).send("400 bad request, please enter a valid id")
    }

    let productIndex = products.findIndex((product) => {
        return product.id === productId;
    })

    if(productIndex === -1) {
        return _response.status(404).send("404 page not found, product not found")
    };

    products[productIndex] = {...products[productIndex], ...body};

    _response.status(200).send(products[productIndex])
})

//DELETE PRODUCT
router.delete("/api/products/:id", (_request, _response) => {
    let id = parseInt(_request.params.id);

    if(isNaN(id)) {
        return _response.status(400).send("400 bad request, please enter a valid id")
    }

    let productIndex = products.findIndex((product) => {
        return product.id === id;
    })

    if(productIndex === -1) {
        return _response.status(404).send("404 page not found, product not found")
    };

    products.splice(productIndex, 1);

    _response.status(200).send("product deleted successfully.")
})
    export default router;