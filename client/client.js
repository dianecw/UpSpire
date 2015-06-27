Template.Home.events({
    'click .feeling-button': function (event) {
        console.log("You clicked " + event.currentTarget.innerText);
        Router.go('/stream/' + event.currentTarget.innerText);
    }
});

Template.Stream.helpers({
	elements: function() {
		var feeling = Session.get("feed-feeling");
        return [{content : "CATPIC", type: "woot"}, {content : "ok"}];
		//return Feelings.find()
	}
});

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');
Router.route('/stream/:_feeling', function () {
    console.log("stream page routing...");
    Session.set("feed-feeling", this.params._feeling);
    this.render('Stream');
});