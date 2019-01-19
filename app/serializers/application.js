import RESTSerializer from 'ember-data/serializers/rest';

export default RESTSerializer.extend({
  serialize(snapshot) {
    const json = this._super(snapshot, { includeId: true });
    Object.keys(json).forEach((attr) => {
      if (json[attr] === null) delete json[attr];
    });
    return json;
  },
});
