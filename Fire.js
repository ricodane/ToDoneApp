import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAu7gU16q1RNgHPyGQQl6JJsMwiNOvDbVE",
    authDomain: "todoneapp-739d0.firebaseapp.com",
    databaseURL: "https://todoneapp-739d0.firebaseio.com",
    projectId: "todoneapp-739d0",
    storageBucket: "todoneapp-739d0.appspot.com",
    messagingSenderId: "997550443314",
    appId: "1:997550443314:web:e889b1005ed8bbdbef652b"
};

class Fire {
    constructor(callback){
        this.init(callback);
    }

    init (callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null, user);
            } else {
                firebase
                .auth()
                .signInAnonymously()
                .catch(error => {
                    callback(error);
                });
            }
        });
    }

    getLists(callback) {
        let ref = this.ref.orderBy("name");

            this.unsubscribe = ref.onSnapshot(snapshot => {
                let lists = [];

                snapshot.forEach(doc => {
                    lists.push({ id: doc.id, ...doc.data() });
                });

                callback(lists);
            });
    }

    addList(list) {
        let ref = this.ref;

        ref.add(list);
    }

    updateList(list) {
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    deleteList(list){
        let ref = this.ref;
        ref.doc(list.id).delete();
    }

    editList(list){
        let ref = this.ref;
        ref.doc(list.id).edit(list);
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    get ref() {
        return firebase
        .firestore()
        .collection('users')
        .doc(this.userId)
        .collection('lists');
    }

    detach() {
        this.unsubscribe();
    }
};

export default Fire;