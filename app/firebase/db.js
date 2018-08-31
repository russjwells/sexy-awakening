import { db } from './firebase';

// User api

export const doCreateUser = (id, email, first_name, last_name, birthday, gender) => {
    const defaults = {
        distance: 30,
        ageRange: [18,36],
        showMen: true,
        showWomen: true,
        subscription: 'guest',
        bio: '',
    }

    db.ref(`users/${id}`).set({
        uid: id,
        email,
        first_name,
        last_name,
        birthday,
        gender,
        distance: 30,
        ageRange: [18,36],
        showMen: true,
        showWomen: true,
        subscription: 'guest',
        bio: ''
    });
}
    

export const onceGetUsers = () => 
    db.ref('users').once('value');