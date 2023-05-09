const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log(`Connected to the database: "${connection.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Create a recipe
    return Recipe.create({
      title: 'Pizza Margherita',
      level: 'Easy Peasy',
      ingredients: ['flour', 'yeast', 'water', 'tomatoes', 'mozzarella', 'basil'],
      cuisine: 'Italian',
      dishType: 'main_course',
      duration: 30,
      creator: 'Chef John',
    });
  })
  .then((recipe) => {
    console.log(`Recipe created: ${recipe.title}`);
    // Insert multiple recipes
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    console.log('All recipes inserted into the database');
    recipes.forEach((recipe) => {
      console.log(recipe.title);
    });
    // Update a recipe
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then((recipe) => {
    console.log(`Recipe updated: ${recipe.title}`);
    // Remove a recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe deleted');
    // Close the database connection
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Connection closed');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
