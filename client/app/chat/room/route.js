import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
    actions:{
        sendChat: function(input, user, model){
            let message = this.store.createRecord('message', {sender:user, text:input});
            model.get('messages').pushObject(message);
            model.save();
        }
    },
    model(params) {
        return this.store.findRecord('room', params.name);
    }
});
