import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        transitionUp: function(param) {
            this.sendAction('transition', param);
        }
    }
});
