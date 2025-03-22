import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCxVQp4Srl6ty4kz7a6Ebqn18uDeRPi-w0",
  authDomain: "netflix-clone-fce2c.firebaseapp.com",
  projectId: "netflix-clone-fce2c",
  storageBucket: "netflix-clone-fce2c.firebasestorage.app",
  messagingSenderId: "112098398047",
  appId: "1:112098398047:web:6f7f5144b6df99435b30ea"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: name,
            email: email,
            authProvider: "local",
        });
    }catch(err){
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const logIn = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
    }catch(err){
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
    }
}

const logOut = () => {
    signOut(auth);
}

export {auth, db, signUp, logIn, logOut};