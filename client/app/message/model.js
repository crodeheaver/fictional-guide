import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  sender: attr('string'),
  text: attr('string'),
  dateStamp: attr('date')
});
