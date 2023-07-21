import useApi from '../../hooks/use-api';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const processData = async (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const { sendRequest, isLoading, error } = useApi();

  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url: 'https://react-http-4a4b2-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        body: { text: taskText },
        headers: {
          'Content-Type': 'application/json',
        },
      },
      processData.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
