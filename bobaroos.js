// Feelings = new Mongo.Collection("feelings");


if (Meteor.isClient) {
    Template.body.helpers({
      feelings: function () {
        return Feelings.find({feeling : {$in: ["yay", "mad", "happy"]}}, {sort: {createdAt: -1}});
      }
    });
}


// if (Meteor.isServer) {
//     Meteor.startup(function () {
//         // code to run on server at startup
//     });
// }

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');
Router.route('/stream');
