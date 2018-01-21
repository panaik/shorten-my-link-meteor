import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';
// 'check' method throws an error if there is an error in validation or else does nothing
// Match allows to run custom validation

Meteor.methods({
  'links.insert': function(url) {
    // console.log('attempting to save', url);
    // if url is invalid this returns undefined, or else it returns the url
    // validUrl.isUri(url);
    // Match.Where => define custom validation
    // check method will throw an error if Match.Where's inner function returns a non-truthy value
    check(url, Match.Where(url => validUrl.isUri(url)));

    // We're ready to save the url

    const token = Math.random()
      .toString(36)
      .slice(-5);

    // this is going to execute on both the client and server
    // but the record will be inserted in MongoDB only when this line executes on the server
    // Whereas on the client side its just an optimistic update, a simulation, its not going to reflect in the DB
    // Links.insert({ url: url, token: token, clicks: 0 });
    Links.insert({ url, token, clicks: 0 });
  }
});

export const Links = new Mongo.Collection('links');
