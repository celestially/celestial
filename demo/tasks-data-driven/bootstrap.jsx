Meteor.startup(function() {
  if (Celestial.Schemas.find().count() === 0) {
    Celestial.Schemas.insert({
      "_id": "vnrQcaMM8daGJz9tc",
      "name": "task",
      "createdAt": "2015-11-11T21:31:33.140Z",
      "locked": true,
      "schema": [
        {
          "type": "string",
          "name": "Title"
        },
        {
          "type": "string",
          "name": "Due Date"
        },
        {
          "type": "boolean",
          "name": "Completed"
        }
      ]
    });
    Celestial.Schemas.insert({
      "_id": "7y3BgjSPnqdxeRWk6",
      "name": "subtaskChecklist",
      "createdAt": "2015-11-11T21:33:44.963Z",
      "locked": true,
      "schema": [
        {
          "type": "collection",
          "name": "Checklist",
          "fields": [
            {
              "type": "string",
              "name": "Subtask"
            },
            {
              "type": "boolean",
              "name": "Completed"
            }
          ]
        }
      ]
    });
  }
})