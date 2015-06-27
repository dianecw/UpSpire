//~*~*~*~*~ HOME ~*~*~*~*~
Template.Home.helpers({
    feelings: function() {
		var feeling = Session.get("feed-feeling");
        return [{feeling : "Happy"},
                {feeling : "Sad"},
                {feeling : "Mad"}];
	}
});

//~*~*~*~*~ STREAM ~*~*~*~*~
Template.Stream.helpers({
    getFeeling : function() {
        return Session.get("feed-feeling");
    },
	elements: function() {
		var feeling = Session.get("feed-feeling");

        return [{content : "Inspiration goes here", type: "text"}, {content : "http://goo.gl/qGXiV2", type : "image"}];
		//return Feelings.find()
	}
});

Template.element.helpers({
  isText: function(type){
    return type == "text"
  },
  isImage: function(type){
    return type == "image"
  },
  isVideo: function(type){
    return type == "video"
  }
});


// ~*~*~*~*~ROUTERS~*~*~*~*~

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');

Router.route('/stream/:_feeling', function () {
    console.log("stream page routing...");
    Session.set("feed-feeling", this.params._feeling);
    this.render('Stream');
});
