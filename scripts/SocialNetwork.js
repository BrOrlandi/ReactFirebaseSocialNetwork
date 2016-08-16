import firebase from 'firebase';

// Initialize Firebase
firebase.initializeApp(Environment.FIREBASE_CONFIG);

class SocialNetwork{
    constructor(){
        this.auth = firebase.auth();
        this.database = firebase.database();
        this.storage = firebase.storage(); // for image upload

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

    createFriendRequest(userId){
        var ref =this.database.ref('/friendRequests/' + userId+ '/'+this.getUser().uid);
        ref.set(true);
    }

    acceptFriendRequest(uid){
        // this method is complicated
        var ref = this.database.ref('/friendRequests/' + this.getUser().uid+ '/'+uid); // find reference for the friend request
        ref.once('value',(snapshot)=>{
            if(snapshot.val()){ // if they have a friend request to answer
                ref.remove(); // remove the friend request
                var me = this.getUser().uid; // my user id
                var conversation;
                this.database.ref('/messages').push(firebase.database.ServerValue.TIMESTAMP) // create a conversation with the now date
                    .then((conv)=>{
                        conversation = conv;
                        return conv.once('value');
                    }).then((s)=>{ // the date will be used to save last date of the conversation in descending order.
                        var date = s.val();
                        this.database.ref('/friendships/'+me+'/'+uid).set({conversation: conversation.key, lastDate: -date});
                        this.database.ref('/friendships/'+uid+'/'+me).set({conversation: conversation.key, lastDate: -date});

                        this.database.ref('/conversations/'+conversation.key+'/'+me).set(true);
                        this.database.ref('/conversations/'+conversation.key+'/'+uid).set(true);
                    });
            }
        });
    }

    rejectFriendRequest(uid){
        var ref = this.database.ref('/friendRequests/' + this.getUser().uid+ '/'+uid);
        ref.once('value',(snapshot)=>{
            if(snapshot.val()){
                ref.remove();
            }
        });
    }

    sendMessage(message, friend){
        var uid = friend['.key'];
        var me = this.getUser().uid;
        this.database.ref('/messages/'+friend.conversation).push({
            from: me,
            message: message,
            date:firebase.database.ServerValue.TIMESTAMP
        }).then((data)=>{
            data.child('date').once('value',(s)=>{
                var date = s.val();
                this.database.ref('/friendships/'+me+'/'+uid+'/lastDate').set(-date);
                this.database.ref('/friendships/'+uid+'/'+me+'/lastDate').set(-date);
            });
        });
    }

    sendImage(file, friend){
        var uid = friend['.key'];
        var me = this.getUser().uid;
        // push message
        this.database.ref('/messages/'+friend.conversation).push({
            from: me,
            imageUrl: true,
            date:firebase.database.ServerValue.TIMESTAMP
        }).then((message)=>{
            message.child('date').once('value',(s)=>{
                var date = s.val(); // get message date
                this.database.ref('/friendships/'+me+'/'+uid+'/lastDate').set(-date);
                this.database.ref('/friendships/'+uid+'/'+me+'/lastDate').set(-date);

                // start uploading image
                var uploadTask = this.storage.ref(me + '/' + date + '/' + file.name)
                    .put(file, {'contentType': file.type});

                // Listen for upload completion.
                uploadTask.on('state_changed', null, (error)=>{
                  console.error('There was an error uploading a file to Firebase Storage:', error);
              }, ()=>{
                  // Get the file's Storage URI and update the chat message placeholder.
                  var filePath = uploadTask.snapshot.metadata.fullPath;
                  message.update({imageUrl: this.storage.ref(filePath).toString()});
                });
              });
            });
    }

};

export default new SocialNetwork();
