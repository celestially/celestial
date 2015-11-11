Meteor.startup(function () {
  if (Celestial.Schemas.find().count() === 0) {
    Celestial.Schemas.insert({
      "_id": "cFPnJ5BkCnMa5mnP9",
      "name": "task",
      "schema": {
        "value": [
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
      }
    });
    Celestial.Schemas.insert({
      "_id": "JSbCu43wDnEdiyX7h",
      "name": "subtaskChecklist",
      "schema": {
        "value": [
          {
            "type": "collection",
            "name": "Checklist",
            "fields": {
              "value": [
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
          }
        ]
      }
    });
  }
})