import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
    register() {
     this.sendAction('register',
     this.get('login'),
     this.get('password'))
    }
  }
});
