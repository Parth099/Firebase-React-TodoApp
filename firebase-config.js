import { initializeApp } from "firebase/app";

// app_data
const firebaseConfig = {
    apiKey: "AIzaSyCdmCNrDFZWh-Cg7Du7IB5ralN81mm2Zj0",
    authDomain: "fir-react-todoapp-7f97d.firebaseapp.com",
    projectId: "fir-react-todoapp-7f97d",
    storageBucket: "fir-react-todoapp-7f97d.appspot.com",
    messagingSenderId: "528588538669",
    appId: "1:528588538669:web:51720a45dfea381ed909a4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app };
