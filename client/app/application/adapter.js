import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin,{
    host: 'http://localhost:8081',
    namespace: 'api',
    authorizer: 'authorizer:application'
});
//
// import DS from 'ember-data';
//
// export default DS.RESTAdapter.extend({
//   host: 'http://localhost:8081',
//   namespace: 'api'
//   });