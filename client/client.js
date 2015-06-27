Template.body.helpers({
    content: function () {
        return "CONTENT HERE";
        //return Feelings.find({feeling : {$in: ["yay", "mad", "happy"]}}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    'click .feeling-button': function (event) {
        console.log("Event" + event);
        Router.go('/stream');
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
Router.route('/stream/:feeling', function());