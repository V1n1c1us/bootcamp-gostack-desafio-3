import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, [])

  function loadRepositories() {
    api.get('repositories').then((response => {
      setRepositories(response.data);
    }))
  }

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio 3 - Bootcamp ${Date.now()}`,
	    url: 'http://github.com',
	    techs: [
		      'React',
		      'Node.js',
		      'React Native'
	    ],
	    likes: 0
    });
    
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repo => repo.id !== id));
    }catch(err){
      alert('Oops.. something wrong is not right :)');
    }

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
