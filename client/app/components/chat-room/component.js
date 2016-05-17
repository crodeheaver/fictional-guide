import Ember from 'ember';

export default Ember.Component.extend({
    authManager: Ember.inject.service('session'),
    chatInput: '',
    actions: {
        sendChat: function(model){
            var user = this.get('authManager').get('currentUser').get('username')
            this.sendAction('sendChat', this.get('chatInput'), user, model);
        }
    }
});
