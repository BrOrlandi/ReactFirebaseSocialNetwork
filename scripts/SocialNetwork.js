import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp(Environment.FIREBASE_CONFIG);

class SocialNetwork{
    constructor(){
        this.database = firebase.database();

        this.database.ref().on('value',(snapshot)=>{
            console.log(snapshot.val());
        });

    }
};

export default new SocialNetwork();
