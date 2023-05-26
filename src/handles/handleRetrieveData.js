import { handleRetrieveLists } from './handleRetrieveLists';
import { handleRetrieveTasks } from './handleRetrieveTasks';

export const handleRetrieveData = async (id) => {
  const lists = await handleRetrieveLists(id);
  const tasks = await handleRetrieveTasks(id);

  lists.forEach(list => {
    tasks.forEach(task => {
      if (task.list_id === list.id) {
        list.create({
          id: task.task_id,
          list: task.list_id,
          user: task.user_id,
          firestore: task.id,
          title: task.title,
          priority: task.priority,
          due: task.due,
          complete: task.complete
        })
      }
    })
  })
  return lists;
}