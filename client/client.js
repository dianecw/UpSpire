Template.Home.helpers({
    feelings: function() {
		var feeling = Session.get("feed-feeling");
        return [{feeling : "Happy"},
                {feeling : "Sad"},
                {feeling : "Mad"}];
	}
});

Template.Home.events({
    // nothing here yet
});

Template.Stream.helpers({
	elements: function() {
		var feeling = Session.get("feed-feeling");
        return [{element : "CATPIC", type: "woot"}, {content : "ok"}];
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
    console.log("checkpoint...");
    this.render('Stream');
});