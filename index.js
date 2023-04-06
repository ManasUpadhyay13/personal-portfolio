require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Project = require("./schema/projectSchema")
const Blog = require("./schema/blogSchema")

// Enable CORS
app.use(cors());
app.use(express.json())

// Connect to MongoDB Atlas database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error(error);
    });


app.get("/", (req, res) => {
    res.send("Hello, World!");
})


// ================= project section ================= //


// to get all the projects

app.get('/getAllProjects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.send(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// TO ADD A PROJECT

app.post('/addProjects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// TO DETELTE A PROJECT 

app.delete('/deleteProjects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).send('Project not found');
        }
        res.status(200).send('Project deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



// ================= blog section ================= //

// Route to get all blogs
app.get('/getAllBlogs', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to add a new blog
app.post('/AddNewBlogs', async (req, res) => {
    const { name, imageUrl, hostedLink, description } = req.body;
    const blog = new Blog({
        name,
        imageUrl,
        hostedLink,
        description,
    });

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route to delete a blog
app.delete('/deleteBlogs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
