import { initializeApp } from "https://gstatic.com";
import { getDatabase, ref, set, onValue } from "https://gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyBrHrOs6GePe5obSaIizqn8Z4uiHE0jnXs",
  authDomain: "://firebaseapp.com",
  databaseURL: "https://polikdogonay-default-rtdb.firebaseio.com/",
  projectId: "polikdogonay",
  storageBucket: "polikdogonay.firebasestorage.app",
  messagingSenderId: "727003414663",
  appId: "1:727003414663:web:ff2bfffdbe0f4a4550b822",
  measurementId: "G-NCS4GEPLSB"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 1. Забираем актуальные классы и учеников из облака Firebase
onValue(ref(db, 'dogonyai_cloud'), (snapshot) => {
  const cloudData = snapshot.val();
  if (cloudData) {
    if (cloudData.teacher) {
      localStorage.setItem('dogonyai_teacher', JSON.stringify(cloudData.teacher));
    }
    if (cloudData.students) {
      localStorage.setItem('dogonyai_all_students', JSON.stringify(cloudData.students));
    }
  }
});

// 2. Отправляем новые классы и учеников в облако при каждом сохранении
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  originalSetItem.apply(this, arguments);

  if (key === 'dogonyai_teacher') {
    set(ref(db, 'dogonyai_cloud/teacher'), JSON.parse(value));
  }
  if (key === 'dogonyai_all_students') {
    set(ref(db, 'dogonyai_cloud/students'), JSON.parse(value));
  }
};

console.log("🔥 Firebase PoliKDogonay успешно подключён!");