// Feelings = new Mongo.Collection("feelings");

// if (Meteor.isClient) {
//     // Template.body.helpers({
//     //   feelings: function () {
//     //     return Feelings.find({}, {sort: {createdAt: -1}});
//     //   }
//     // });

//     // Template.body.events({
//     //     'submit .feeling-submission': function () {
//     //         // Executed when form is submitted
//     //         var input = event.target.feeling.value;
//     //         Feelings.insert({
//     //             feeling: input,
//     //             createdAt: new Date()
//     //         });
//     //         event.target.feeling.value("done");
//     //         return false; // prevent default form behavior
//     //     }
//     // });
// }

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