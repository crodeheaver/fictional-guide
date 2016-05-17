import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin,{
    host: 'https://seeker-crodeheaver.c9users.io:8081',
    namespace: 'api',
    authorizer: 'authorizer:application'
});
