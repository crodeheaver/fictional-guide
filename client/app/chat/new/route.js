import Ember from 'ember';

export default Ember.Route.extend({
    authManager: Ember.inject.service('session'),
    model() {
        return this.store.createRecord('room');
    },
    actions: {
        transition: function(param) {
            console.log(param.get('name'))
            this.transitionTo('chat.room', { queryParams: { name: param.get('name') }});
        }
    },
});
