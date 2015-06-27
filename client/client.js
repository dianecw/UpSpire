
// Pertaining to Meteor.js
Template.Home.events({
    'click .feeling-button': function (event) {
        console.log("You clicked " + event.currentTarget.innerText);
        Router.go('/stream/' + event.currentTarget.innerText);
    }
});

Template.body.helpers({
	elements: function() {
		var feeling = Session.get
		return Feelings.find()
	}
});

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');
Router.route('/stream/:_feeling', function () {
    Session.set("feed-feeling", this.params._feeling); 
});

// Functionality for Create page