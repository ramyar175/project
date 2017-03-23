import DS from 'ember-data';
import { Model } from 'ember-pouch';

export default Model.extend({
        username: DS.attr('string'),
	password: DS.attr('string'),
	rating: DS.attr('number'),
	exp: DS.attr('string')
});
