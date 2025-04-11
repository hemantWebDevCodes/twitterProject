import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;
const token = sessionStorage.getItem('api_token');
console.log('Token : ', token);

const echo = new Echo({
    broadcaster: 'pusher',
    key: '3ce92970dbabbad5be44',
    cluster: "ap2",
    forceTLS: false,
    encrypted: true,
    authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
    auth: {
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
    },
});


export default echo;


