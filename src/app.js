const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// Rota para Listagem de respositórios
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Rota para Criação de respositório
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body
  
  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return response.json(repository)
});

// Rota para Alteração de repositório
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  
  const indiceRep = repositories.findIndex(repository => repository.id === id)

  if (indiceRep < 0) {
      return response.status(400).json({"error": "Repository not found"})
      //400 = Bad Request     
  }

  const repository = repositories[indiceRep]
  
  repository.title = title
  repository.url = url
  repository.techs = techs

  return response.json(repository)
});

// Rota para Remoção de repositório
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params

  const indiceRep = repositories.findIndex(repository => repository.id === id)

    if (indiceRep < 0) {
        return response.status(400).json({"error": "Repository not found"})
        //400 = Bad Request      
    }

    repositories.splice(indiceRep, 1)  //remove 1 repositório a partir de indiceRep
    
    return response.status(204).send(); //204 = No Content   
});

// Rota para Curtir repositório
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  const indiceRep = repositories.findIndex(repository => repository.id === id)

  if (indiceRep < 0) {
      return response.status(400).json({"error": "Repository not found"})
      //400 = Bad Request     
  }

  const repository = repositories[indiceRep]
  repository.likes++;
    
  return response.json(repository)

});

module.exports = app;
