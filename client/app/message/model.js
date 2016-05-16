import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  sender: belongsTo('user'),
  text: attr('string'),
  dateStamp: attr('date')
});
