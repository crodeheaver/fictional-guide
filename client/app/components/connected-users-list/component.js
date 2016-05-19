import Ember from 'ember';

export default Ember.Component.extend({
    socketIOService: Ember.inject.service('socket-io'),
    authManager: Ember.inject.service('session'),
    store: Ember.inject.service(),
    userList: [],
    socketRef: null,
    init() {
        this._super(...arguments);
        var socket = this.get('socketIOService').socketFor('https://seeker-crodeheaver.c9users.io:8082/');
        socket.on('connect', this.onConnect, this);
        socket.on('updateusers', this.onUpdateUsers, this)
        
        this.set('socketRef', socket);
    },

    onConnect() {
        var socket = this.get('socketRef');
        socket.emit('getusers');
    },
    onUpdateUsers(list){
        console.log(list)
        var socket = this.get('socketRef');
        this.set('userList',list);
    },

    willDestroyElement() {
        const socket = this.get('socketRef');
        socket.off('connect', this.myOnClose);
        socket.off('message', this.myOnClose);
    }
});
