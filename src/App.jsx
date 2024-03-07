import { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [Todo, setTodo] = useState('');
  const [ToggleComp, setToggleComp] = useState(true);
  const [Todos, setTodos] = useState([]);
  const [BtnText, setBtnText] = useState('ADD');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('todos'))) {
      const data = JSON.parse(localStorage.getItem('todos'));
      setTodos(data);
    }
  }, []);

  const saveLS = (data) => {
    localStorage.setItem('todos', JSON.stringify(data));
  };

  const handleAdd = () => {
    if (Todo !== '') {
      const newTodos = [...Todos, { id: uuidv4(), Todo, isCompleted: false }];
      setTodos(newTodos);
      setTodo('');
      setBtnText('ADD');
      saveLS(newTodos);
    }
  };

  const handleComp = (item) => {
    const index = Todos.findIndex((todo) => todo.id === item.id);
    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLS(newTodos);
  };

  const handleEdit = (item) => {
    const index = Todos.findIndex((todo) => todo.id === item.id);
    let newTodo = [...Todos];
    setBtnText('SAVE');
    setTodo(newTodo[index].Todo);
    let newTodos = Todos.filter((todo) => todo.id !== item.id);
    setTodos(newTodos);
    saveLS(newTodos);
  };

  const handleDel = (item) => {
    const con = window.confirm('Are you sure you want to Delete?');
    if (con === true) {
      let newTodos = Todos.filter((todo) => todo.id !== item.id);
      setTodos(newTodos);
      saveLS(newTodos);
    }
  };

  const handletoggleComp = () => {
    setToggleComp(!ToggleComp);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto rounded-lg p-4 bg-violet-100 my-5 min-h-[85vh]">
        <div className="bg-violet-200 mx-5 border-solid shadow-md border-2 border-violet-900 p-4 rounded-lg">
          <h1 className="font-bold text-lg">Add Todo</h1>
          <input onChange={(e) => setTodo(e.target.value)} value={Todo} type="text" name="todo" className="p-1 border rounded-md focus:outline-none focus:ring focus:border-violet-300 bg-white text-black" id="todo" />
          <button onClick={handleAdd} className="transition duration-300 ease-in-out bg-green-500 hover:bg-green-700 mx-3 text-white rounded-md p-1" >{BtnText}</button>
        </div>
        <div className="bg-violet-200 mx-5 mt-4 border-solid border border-violet-700 p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-center">Your Todos</h1>
          <input type="checkbox" onChange={handletoggleComp} checked={ToggleComp} className="mb-3" />Show Completed
          <hr className="mb-5" style={{ borderColor: 'black' }} />
          <div className='row'>

            {Todos.length === 0 && <div className="w-full text-center">No Todos to display.</div>}
            {Todos.map((item) => (ToggleComp || !item.isCompleted) && (

              <div key={item.id} onDoubleClick={() => handleComp(item)} className={`m-2 card shadow-lg rounded-md ${item.isCompleted ? 'bg-red-400' : 'bg-green-400'} transition duration-300 ease-in-out`} style={{ width: '10rem' }}>
                <div className="card-body">
                  <p className={`rounded-md text-center ${item.isCompleted ? 'bg-pink-700 text-white' : 'bg-green-700 text-white'}`}>{item.isCompleted ? 'Completed' : 'Pending'}</p>
                  <h6 className={`card-subtitle mt-2 text-body-secondary ${item.isCompleted ? 'text-black line-through' : 'text-black'}`}>{item.Todo}</h6>
                  <div className="flex">
                    <div className="mx-auto flex">
                      <button onClick={() => { handleEdit(item) }} className="bg-yellow-400 hover:bg-yellow-700 text-white m-1 rounded-md p-2">
                        <FaEdit />
                      </button>
                      <button onClick={() => { handleDel(item) }} className="bg-red-500 hover:bg-red-700 text-white rounded-md m-1 p-2">
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;