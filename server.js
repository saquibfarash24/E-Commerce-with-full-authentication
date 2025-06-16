import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'express';
import { config } from 'dotenv';
import userRouter from './routes/user.js';
import productRouter from './routes/product.js';
import cartRouter from './routes/cart.js';

const app = express();


app.use(bodyParser.json());

// .env setup
config({path: '.env'});

// user routes
app.use('/api/user', userRouter);


// product routes
app.use('/api/product', productRouter);

// cart routes
app.use('/api/cart', cartRouter);



// home route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Home Page</h1>');
});

mongoose
  .connect(process.env.MONGO_URI, {

    dbName: "E_commerce_API" }
  )
  .then(() => console.log("MongoDB connected successfully....!"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
