const mongoose = require('mongoose');



// Define a schema for the project object
const projectSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    techStack: Array,
    gitLink: String,
    hostedLink: String,
    description: String,
  });
  


// Create a model for the project collection
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;