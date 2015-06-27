//~*~*~*~*~ HOME ~*~*~*~*~
Template.Home.helpers({
    feelings: function() {
		//var feeling = Session.get("feedfeeling");
        return [{feeling : "Happy"},
                {feeling : "Sad"},
                {feeling : "Mad"}];
	}
});

//~*~*~*~*~ STREAM ~*~*~*~*~
Template.Stream.helpers({
    getFeeling : function() {
        return Session.get("feedfeeling").toLowerCase();
    },
	elements: function() {
		var tag = Session.get("feedfeeling");
        console.log("Querying for tag: " + tag);
//        var data = [{content : "Inspiration goes here", type: "text"}, {content : "http://goo.gl/qGXiV2", type : "image"}];
        var data = Feelings.findOne({feeling : tag}).content;
        console.log("Data (line below)");
        console.log(data);
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

//~*~*~*~*~ ADD CONTENT ~*~*~*~*~

  Template.addContentForm.helpers({
    tags: [
      { tagName: "Happy" },
      { tagName: "Mad" },
      { tagName: "Isolated" },
      { tagName: "Grumpy" },
      { tagName: "Silly" },
      { tagName: "Discouraged" },
      { tagName: "Heartbroken" },
      { tagName: "Frustrated" },
    ]
    });

Template.addContentForm.events({
    'click .submitbutton' : function(event, template) {
        var type = template.find('input:radio[name=toggle]:checked');
        Session.set("submissiontype", $(type).val());
        console.log("submissiontype set to " + Session.get("submissiontype"));
    },
	'submit form': function(){
		event.preventDefault();
		console.log("Form submitted");

		if (event.target.content_text.value) { // grab the input
			var input = event.target.content_text.value;
		} else {
			var input = "";
		}
        
        Session.set("submissiontype", "image"); // REPLACE
		var content_type = Session.get("submissiontype"); // REPLACE
		if (content_type) {                       // set the content type
			var type = content_type;
		} else {
			var type = "text"; // default to text submission type
		}
		content_tags = $('input:checkbox:checked.prettytags').map(function () {
  			return this.name;
			}).get();
		console.log("tags selected: " + content_tags);

		if (content_tags) {                       // set the feeling tags
			var tags = content_tags;
		} else {
			var tags = ""; // default to no feeling tag
		}
		
		console.log(Feelings.findOne({feeling : content_tags[0]})); // sanity check

        
        content_tags.forEach( function (tag) { // add content to all selected tags
            if (Feelings.findOne({feeling : tag})) {
                console.log('Feeling in database, pushing new element to feeling');
                Feelings.update(
                    Feelings.findOne({feeling : tag})['_id'],
                    { $push: { content: 
                        { element : input,
                            type : content_type,
                            sentiment_score : 0,
                        }
                    }},
                    {
                        upsert: false,
                    }
                );
            } else {
                console.log('Feeling not in database, adding new feeling');
                Feelings.insert({feeling : tag, content: [   			
                    { element : input,
                        type : content_type,
                        sentiment_score : 0,
                    }]})
            }
        });
		
        content_tags.forEach(function (tag) {
            Feelings.findOne({feeling : tag}).content.forEach( // sanity check
                    function(elem){
                        console.log("input: " + elem.element + "  type: " + elem.type);
                    }
            );
        });
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
    console.log("Session feedfeeling set to " + this.params._feeling);
    this.render('Stream');
});
