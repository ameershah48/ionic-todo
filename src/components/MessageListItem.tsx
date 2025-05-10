import {
  IonItem,
  IonLabel,
  IonButton
  } from '@ionic/react';
import './MessageListItem.css';

interface MessageListItemProps {
  id: number;
  todo: string;
  setTodos: (todos: any[]) => void;
}

function removeTodo(id: number, setTodos: (todos: any[]) => void) {
  let todos = JSON.parse(localStorage.getItem('todos') || '[]');
  todos.splice(id, 1);
  localStorage.setItem('todos', JSON.stringify(todos));
  setTodos(todos);
}

const MessageListItem: React.FC<MessageListItemProps> = ({ id, todo, setTodos }) => {
  return (
    <IonItem id="message-list-item" detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <p>
          {todo}
        </p>
      </IonLabel>
      <IonButton onClick={() => removeTodo(id, setTodos)}>
        Remove
      </IonButton>
    </IonItem>
  );
};

export default MessageListItem;
