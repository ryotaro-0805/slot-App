import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

  const firebaseConfig = {
    apiKey: "AIzaSyAltwmLRlHaaSfzO9Vsqy8ByR9htFbQnHo",
    authDomain: "chatbot-demo-6cf0c.firebaseapp.com",
    databaseURL: "https://chatbot-demo-6cf0c-default-rtdb.firebaseio.com",
    projectId: "chatbot-demo-6cf0c",
    storageBucket: "chatbot-demo-6cf0c.appspot.com",
    messagingSenderId: "613545308774",
    appId: "1:613545308774:web:2c3b8dad384a5acff9f3a7"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export {db};