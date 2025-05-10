import MessageListItem from '../components/MessageListItem';
import { useState, useRef, useEffect } from 'react';
import { Message, getMessages } from '../data/messages';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonButtons
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const [todos, setTodos] = useState<any[]>([]);

  function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(todos);
  }

  function confirm() {
    let todo = input.current?.value;
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    setTodos(todos);

    modal.current?.dismiss(todo, 'confirm');
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Todos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              To Do List
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton id="open-modal" expand="block">
          Add Todo
        </IonButton>

        <IonModal ref={modal} trigger="open-modal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Add Todo</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonInput
                label="Enter your name"
                labelPlacement="stacked"
                ref={input}
                type="text"
                placeholder="Your name"
              />
            </IonItem>
          </IonContent>
        </IonModal>

        <IonList>
          {todos.map((todo: string, index: number) => <MessageListItem key={index} id={index} todo={todo} setTodos={setTodos} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
