import React from 'react';
import api from './services/api';
import "./styles.css";
import { useState, useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState ([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);
  async function handleAddRepository() {
    
    const response = await api.post('projects', {
      title:`New project ${Date.now()}`,
      owner: 'Vinicius Aleixo'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {

     await api.delete(`projects/${id}`);
     setProjects(projects.filter(project => project.id !== id));
 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {projects.map(project => <li key={project.id}>{project.title}
        
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
