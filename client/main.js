
Messages = new Mongo.Collection("msgs")

if (Meteor.isServer) {
  Meteor.publish("messages", function() {
    return Messages.find({}, {sort: {createdAt: -1}, limit: 5})
  })
}

if (Meteor.isClient) {
  Meteor.subscribe("messages")
}

Meteor.methods({
  sendMessage: function(message) {

    Messages.insert({
      text: message,
      createdAt: new Date(),
      username: 'anon'
    })
  }
})

if (Meteor.isClient) {
  Template.body.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt:1}})
    }
  })


Template.body.events({
  "submit .new-message": function (event) {

    var text = event.target.text.value

    Meteor.call('sendMessage', text)

    event.target.text.value = ''
    return false

  }
})

Accounts.ui.config({
   passwordSignupFields: "USERNAME_ONLY"
})
}
