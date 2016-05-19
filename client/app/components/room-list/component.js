import Ember from 'ember';

export default Ember.Component.extend({
    authManager: Ember.inject.service('session'),
    socketIOService: Ember.inject.service('socket-io'),
    store: Ember.inject.service(),
    socketRef: null,
    isShowingModal: false,
    actions: {
    toggleModal: function() {
      this.toggleProperty('isShowingModal');
    },
    createRoom: function(modal, name){
        this.toggleProperty('isShowingModal');
        var socket = this.get('socketRef');
        // var newroom=this.get('store').createRecord('room', {
        //     owner: this.get('authManager').get('currentUser').get('username'),
        //     name: name,
        //     messages: [],
        //     isPublic: true
        // });
        // newroom.save();
        socket.emit('newroom',{
            owner: this.get('authManager').get('currentUser').get('username'),
            name: name,
            messages: [],
            isPublic: true
        });
        this.set('name', '')
    }
  },
  init() {
        this._super(...arguments);
        var socket = this.get('socketIOService').socketFor('https://seeker-crodeheaver.c9users.io:8082/');
        socket.on('addroom', this.onUpdate, this);
        this.set('socketRef', socket);
    },
    onUpdate(data){
        this.get('store').unloadAll('room');
        console.log('new room!')
        this.get('store').findAll('room');
        //console.log('new room!')
        //this.get('store').loadAll('room');
    }
});
