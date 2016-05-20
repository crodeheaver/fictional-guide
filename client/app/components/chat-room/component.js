import Ember from 'ember';

export default Ember.Component.extend({
    authManager: Ember.inject.service('session'),
    socketIOService: Ember.inject.service('socket-io'),
    socketRef: null,
    userList: [],
    chatInput: '',
    user: null,
    actions: {
        sendChat: function() {
            var message = {
                sender: this.get('authManager').get('currentUser').get('username'),
                text: this.get('chatInput'),
                dateStamp: Date.now()
            };
            this.set('chatInput', '');
            var socket = this.get('socketRef');
            socket.emit('newmessage', message);
        }
    },
    init() {
        this._super(...arguments);
        this.set('user', this.get('authManager').get('currentUser').get('username'));
        var socket = this.get('socketIOService').socketFor('https://seeker-crodeheaver.c9users.io:8082/');
        socket.on('connect', this.onConnect, this);
        socket.on('message', this.onMessage, this);
        socket.on('updateusers', this.onUpdate, this);
        this.set('socketRef', socket);
        Ember.run.scheduleOnce('afterRender', this, function() {
            this.$(".chat").scrollTop(this.$(".chat").context.scrollHeight);
        });
    },

    onConnect() {
        var socket = this.get('socketRef');
        socket.emit('adduser', {
            username: this.get('authManager').get('currentUser').get('username'),
            room: this.get('model').get('name')
        });
    },
    onMessage(message) {
        this.get('model').get('messages').pushObject(message);
    },
    onUpdate(list){
        list.sort();
        this.set('userList', list);
    },
    didUpdateAttrs(){
        const socket = this.get('socketRef');
        socket.emit('changeroom',this.get('model').get('name'));
    },

    willDestroyElement() {
        const socket = this.get('socketRef');
        socket.emit('disconnect')
        socket.off('connect', this.onConnect);
        socket.off('message', this.onMessage);
        socket.off('updateusers', this.onUpdate);
    },
});
