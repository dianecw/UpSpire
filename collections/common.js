var contentSchema = new SimpleSchema({
    element: {
       type: String,
       label: "Element"
    },
    type: { // "text", "video", "image"
        type: String,
        label: "Type",
        max: 20
    }
});

var feelingSchema = new SimpleSchema({
    feeling: {
       type: String,
       label: "Feeling",
    },
    content: {
        type: [contentSchema],
        label: "ContentIDs"
    }
});

Feelings = new Mongo.Collection("feelings");
Feelings.attachSchema(feelingSchema);