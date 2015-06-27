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

		if (event.target.content_tags.value) {
			var tags = event.target.content_tags.value;
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

Router.route('/', function () {
  this.render('Home');
});

Router.route('/create');
Router.route('/stream/:_feeling', function () {
    Session.set("feed-feeling", this.params._feeling); 
});
