import React from 'react';
import api from './services/api';
import "./styles.css";
import { useState, useEffect } from 'react';

function App() {
  const [repositories, setRepositories] = useState ([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      title:`New project ${Date.now()}`,
      owner: 'Vinicius Aleixo'
    });

    const project = response.data;

    setRepositories([...repositories, project]);
  }

  async function handleRemoveRepository(id) {

     await api.delete(`repositories/${id}`);
     setRepositories(repositories.filter(project => project.id !== id));
 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(project => <li key={project.id}>{project.title}
        
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
