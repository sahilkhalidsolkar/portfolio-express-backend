
const express = require('express');
const { createClient } = require("@sanity/client")
var cors = require('cors')
const dotenv = require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())

// sanity client
const client = createClient({
    projectId: `${process.env.SANITY_PROJECT_ID}`,
    dataset: "production",
    apiVersion: "2023-05-29",
    useCdn: false
});
app.get('/api/author', async (req, res) => {
    const author = await client.fetch(`*[_type == "author"]`);
    res.json(author)

});
app.get('/api/experience', async (req, res) => {
    const experience = await client.fetch(`*[_type == "experience"]`);
    res.json(experience)


});
app.get('/api/projects', async (req, res) => {
    const projects = await client.fetch(`*[_type == "projects"]| order(_createdAt asc)`);
    res.json(projects)


});
app.get('/api/projects/:id', async (req, res) => {
    const id = req.params.id
    const singleProject = await client.fetch(`*[_id == "${id}"]`);
    res.json(singleProject)


});
app.get('/api/resume', async (req, res) => {
    const resume = await client.fetch(`*[_type == "resume"]{...,technologies[]->}`);
    res.json(resume)


});

app.listen(PORT, (error) => {
    if (!error)
        console.log("Server is Successfully listening on port " + PORT)
    else
        console.log("Error occurred, server can't start", error);
}
);