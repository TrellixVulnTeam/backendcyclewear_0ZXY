import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyDd_uSgbiRd_mmGkTRbR-fJ11gF7yUnlRM",
  authDomain: "cyclewear-e3d3b.firebaseapp.com",
  projectId: "cyclewear-e3d3b",
  storageBucket: "cyclewear-e3d3b.appspot.com",
  messagingSenderId: "238100588812",
  appId: "1:238100588812:web:1e004e34a34411d30e0129"
};

// Exporto Firebase Inicializado
export default firebase.initializeApp(firebaseConfig);

//******************* Version de Firebase en Package.json
//"firebase": "^9.1.0",
