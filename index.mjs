import oExpress from "express";
import userRouter from "./routes/users.mjs"
import productRouter from "./routes/products.mjs"

const app = oExpress();

//middleware för routes
app.use(userRouter, productRouter);

const PORT = 3020;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, http://localhost:3020`)
}) 