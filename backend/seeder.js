import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
// Importing Products array
import products from './data/products.js';
// Importing Models
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

// We bring this two because the seeder is not connected to our server
// its just connected to our DB to seed data in
dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Delete all models
    console.log('Deleting Orders'.red);
    await Order.deleteMany();
    console.log('Deleting Products'.red);
    await Product.deleteMany();
    console.log('Deleting Users'.red);
    await User.deleteMany();

    // inserting our user array
    console.log('Inserting Users'.green);
    const createdUsers = await User.insertMany(users);

    // getting admin id to add to products
    const adminUser = createdUsers[0]._id;

    // creating product array where all products have been added by the admin
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    // adding product array to database
    console.log('Inserting products'.green);
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    // Delete all models
    console.log('Deleting Orders'.red);
    await Order.deleteMany();
    console.log('Deleting Products'.red);
    await Product.deleteMany();
    console.log('Deleting Users'.red);
    await User.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// importData will be runned in terminal with "node backend/seeder"
// destroyData will be runned in terminal with "node backend/seeder -d"
// we will add a script in package.json for faster writing!
// data:destroy  and data:import
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
