import React, { useState, useEffect } from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories')
      .then(({ data }) =>{
        setRepositories(data);
      });
  }, [])

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/",
      title: `Desafio ReactJS ${new Date()}`,
      techs: ["React", "Node.js"],
    }

    const { data } = await api.post('/repositories', repository)

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    
    const index = repositories.findIndex((repository) => {return repository.id === id})
    repositories.splice(index, 1)

    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repository) => {
            return (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            );
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
