Template.body.helpers({
    feelings: function () {
        return Feelings.find({feeling : {$in: ["yay", "mad", "happy"]}}, {sort: {createdAt: -1}});
    }
});

Template.body.events({
    'submit .feeling-submission': function () {
        // Executed when form is submitted
        var input = event.target.feeling.value;
        Feelings.insert({
            feeling: input,
            createdAt: new Date()
        });
        event.target.feeling.value("done");
        return false; // prevent default form behavior
    }
});

Session.set("hideCompleted", event.target.checked);