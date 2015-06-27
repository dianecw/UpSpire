//~*~*~*~*~ HOME ~*~*~*~*~
Template.Home.helpers({
    feelings: function() {
		var feeling = Session.get("feedfeeling");
        return [{feeling : "Happy"},
                {feeling : "Sad"},
                {feeling : "Mad"}];
	}
});

Template.Home.events


//~*~*~*~*~ STREAM ~*~*~*~*~
Template.Stream.helpers({
    getFeeling : function() {
        return Session.get("feedfeeling");
    },
	elements: function() {
		var tag = Session.get("feedfeeling");
        //return [{content : "Inspiration goes here", type: "text"}, {content : "http://goo.gl/qGXiV2", type : "image"}];
        var data = Feelings.find({feeling : tag}).content;
        debugger;
		return data;
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
    Session.set("feedfeeling", this.params._feeling);
    this.render('Stream');
});
