define({ "api": [
  {
    "type": "delete",
    "url": "/api/notes",
    "title": "Deletes notes information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notes unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedNotes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "group": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "groupTitle": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "name": "DeleteApiNotes"
  },
  {
    "type": "get",
    "url": "/api/notes",
    "title": "Request notes information",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Notes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "group": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "groupTitle": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "name": "GetApiNotes"
  },
  {
    "type": "get",
    "url": "/api/notes/:id",
    "title": "Request notes information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notes unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Notes",
            "description": "<p>notes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "group": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "groupTitle": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "name": "GetApiNotesId"
  },
  {
    "type": "post",
    "url": "/api/notes",
    "title": "Adds new notes into DB",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedNotes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "group": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "groupTitle": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "name": "PostApiNotes"
  },
  {
    "type": "put",
    "url": "/api/notes",
    "title": "Updated notes information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Notes unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "Status",
            "description": "<p>if the api has completed or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "UpdatedNotes",
            "description": "<p>Array of all the notes in it.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/notes.js",
    "group": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "groupTitle": "_home_kamalnrf_Lambda_School_back_end_project_week_routes_notes_js",
    "name": "PutApiNotes"
  }
] });
