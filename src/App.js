import React, {useState, useEffect} from 'react'
import './App.css';

function App() {

  const [task, setTask] = useState('');
  const [items, setItems] = useState(
    !localStorage.getItem('tarefas')
    ?[]: JSON.parse(localStorage.getItem('tarefas')));

  const handleChange = (e) => {
    setTask(e.target.value);
  }

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, task]);
    setTask('');

    if(task.length <= 0){
      alert('Adicione uma tarefa.');
      return;
    }
        
    if(items.indexOf(task) >= 0){
      alert('Essa tarefa já está na lista.');
      return;
    }
  }

  useEffect(() => {
    if(localStorage.getItem('tarefas')){
      setItems(JSON.parse(localStorage.getItem('tarefas')))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tarefas', JSON.stringify(items))
  }, [items]);

  function remove (index) {
    let array = [...items];
    array.splice(index, 1);
    setItems(array);
  };

  return (
    <div className="App">
      <div className='typedout'>
        <h1 className ='titulo'>Lista de Tarefas</h1>
      </div>
      <form onSubmit={addItem}>
        <div className='add'>
          <input className='input' type = 'text' placeholder ='Adicione Tarefa' onChange = {handleChange} value = {task} />
          <button className ='botao' type = 'submit'>Adicionar</button>
        </div>

        <div className ='itens'>
          {items.map((item, index) => <li key = {index}> {item}
            <button align = 'right' className='botao' onClick={() => remove(index)}>🗑️</button></li>)}
        </div>
      </form>      
    </div>
  );
}

export default App;
