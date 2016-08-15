import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp(Environment.FIREBASE_CONFIG);

class SocialNetwork{
    constructor(){
        this.auth = firebase.auth();
        this.database = firebase.database();

        this.auth.onAuthStateChanged(this.registerUser.bind(this));
    }

    signIn(){
        var provider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(provider);
    }

    signOut(){
        this.auth.signOut();
    }

    registerUser(user){
        if(user == null)
            return;

        console.log(user);
        var userId = user.uid;
        var ref =this.database.ref('/users/' + userId);
        ref.once('value').then((snapshot)=>{
            var userVal = snapshot.val();
            if(userVal == null){
                userVal = {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                };
                ref.set(userVal);
            }
        });
    }

    getUser(){
        return this.auth.currentUser;
    }
};

export default new SocialNetwork();
