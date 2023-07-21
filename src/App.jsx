import React, { Fragment, useEffect, useState, useCallback } from 'react';
import useApi from './hooks/use-api';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);

  const processData = useCallback((data) => {
    const loadedTasks = [];
    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  }, []);

  const { sendRequest: fetchTasks, isLoading, error } = useApi();

  useEffect(() => {
    fetchTasks(
      {
        url: 'https://react-http-4a4b2-default-rtdb.firebaseio.com/tasks.json',
      },
      processData
    );
  }, [fetchTasks, processData]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </Fragment>
  );
}

export default App;
