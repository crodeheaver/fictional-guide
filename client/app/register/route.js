import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        register: function(login, password) { 
            console.log(login,password)
            this.store.createRecord('user', {
                username: login,
                password: password
            }).save().then(() => {
                this.transitionTo('login');
            }, (err) => {
                alert('Error obtaining token: ' + err.responseText);
            });
        }
    }
});
