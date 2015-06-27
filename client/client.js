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
		var feeling = Session.get("feedfeeling");
        return [{content : "Inspiration goes here", type: "text"}, {content : "http://goo.gl/qGXiV2", type : "image"}];
		//return Feelings.find()
	}
});

//~*~*~*~*~ ADD CONTENT ~*~*~*~*~
Template.addContentForm.events({
	'submit form': function(){
		event.preventDefault();
		console.log("Form submitted");
		//console.log(Feelings.insert({ feeling : "Test", content: []}));
		if (event.target.content_text.value) {
			var link = event.target.content_text.value;
		} else {
			var link = "";
		}
		var content_tags = "temp_tag"
		if (content_tags) {
			var tags = content_tags;
		} else {
			var tags = "";
		}
		
		console.log(Feelings.findOne({feeling : tags}));
		if (Feelings.findOne({feeling : tags})) {
		console.log('Feeling in database, pushing new element to feeling');
		Feelings.update(
		Feelings.findOne({feeling : tags})['_id'],
   		{ $push: { content: 
   			{ element : link,
   				type : "pic",
   				sentiment_score : 0,
   			}
   		 } },
  		 {
     		upsert: false,
   		}
   	);
	} else {
		console.log('Feeling not in database, adding new feeling');
		Feelings.insert({feeling : tags, content: [   			
			{ element : link,
   				type : "pic",
   				sentiment_score : 0,
   			}]})
	}
		
		Feelings.findOne({feeling : tags}).content.forEach(
				function(elem){
					console.log("link: " + elem.element);
				});
		
		//console.log(Feelings.findOne({feeling : event.target.content_tags.value}).element);

		
    //console.log(event.type);
	}
    // events go here
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
