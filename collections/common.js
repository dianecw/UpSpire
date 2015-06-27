var contentSchema = new SimpleSchema({
    element: { // http://goo.gl/qGXiV2
       type: String,
       label: "Element"
    },
    type: { // "text", "video", "image"
        type: String,
        label: "Type",
        max: 20
    },
    sentiment_score: {
        type: Number,
        label: "Sentiment"
    }
});

var feelingSchema = new SimpleSchema({
    feeling: { // "happy", "sad", "left out"
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