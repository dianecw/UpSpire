Template.Home.events({
    'click .feeling-button': function (event) {
        console.log("You clicked " + event.currentTarget.innerText);
        Router.go('/stream/' + event.currentTarget.innerText);
    }
});

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');
Router.route('/stream/:_feeling', function () {
    Session.set("feed-feeling", this.params._feeling); 
});