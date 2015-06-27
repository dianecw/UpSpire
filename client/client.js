Template.body.helpers({
    content: function () {
        return "CONTENT HERE";
        //return Feelings.find({feeling : {$in: ["yay", "mad", "happy"]}}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    'click .feeling-button': function (event) {
        console.log("You clicked " + event.currentTarget.innerText);
        Router.go('/stream');
    }
});

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');
Router.route('/stream');