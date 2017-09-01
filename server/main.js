import { Meteor } from 'meteor/meteor';

Messages = new Mongo.Collection("msgs")

Meteor.startup(() => {
  // code to run on server at startup

  Meteor.methods({
    sendMessage: function(message) {

      Messages.insert({
        text: message,
        createdAt: new Date(),
        username: 'anon'
      })
    }
  })
});
