import oExpress from "express";
import userRouter from "./routes/users.mjs"
import productRouter from "./routes/products.mjs"
import users from "./constants/users.js";
import products from "./constants/products.js";

const app = oExpress();

//middleware för routes
app.use(userRouter, productRouter);

// Middleware for serving EJS files (static)
app.set("view engine", "ejs");

// Serve static files
app.use(oExpress.static('public'))

app.get("/home", (_request, _response) => {
    _response.status(200).render("index", {products: products, users: users})
})

const PORT = 3020;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, http://localhost:3020`)
}) 