TL;DR: It works don't touch it

Getting Started:
- The current version of notes API lives on http://localhost:9000 when running
    -This API is used to store, recieve, edit, and delete notes
Endpoints: PORT will be referring to http://localhost:9000
    -PORT/note/get/all
        - Sends all the notes in the database in an array. Each note is an object that contains an id, title, and textBody
    -PORT/note/get/:id
        - Sends a single with specified id as an object
    -PORT/note/create
        - Sending a note with required fields (title and textBody) to this endpoint will add the note to the database and give it an id.
    -PORT/note/edit/:id
        -Sending an object with required fields (title and textBody) will modify the note with the specified id.
    -PORT/note/delete/:id
        -Sending an id to this endpoint will delete the note with the id given. This cannot be undone

API Calls: How to use the endpoints
- Making GET Requests : recieveing a note or notes
    -There are two endpoints (listed below) in this api that accept get requests
        1.)PORT/note/get/all
        2.)PORT/note/get/:id
----------------------------------------------------------------------------------------------------------------------
    -To use PORT/note/get/all

    1.) Make a request using axios
        1.a) axios.get('http://localhost:9000/note/get/all')
    2.) The server will respond with an array of note objects looking like this
        2.a)[{title : "title1",textBody:"textbody1",id:1},{title : "title2",textBody:"textbody2",id:2}]
        2.b) The array of objects will be sent in response.data
    3.) Save the notes array
        3.a) To save the notes array first make the request (step 1a) then save the response.data example below using React State
        3.b) .then(response => this.setState({notes : response.data}) <-- make sure it is response.data
    4.) Display the notes however you see fit
----------------------------------------------------------------------------------------------------------------------
    -To use PORT/note/get/:id

    1.) Make a request using axios and replacing :id with the id of the note you wish to use
        1.a) axios.get('http://localhost:9000/note/get/1') <-- This would get the note with id 1
    2.) The server will respond with a note object with specified id
        2.a){"title2",textBody:"textbody2",id:1}
        2.b) The note object will be sent in response.data
    3.) Save the note object
        3.a) To save the note object first make the request (step 1a) then save the response.data example below using React State
        3.b) .then(response => this.setState({SingleNote : response.data}) <-- make sure it is response.data
    4.) Display the note however you see fit
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------

-Making Post Requests : How to add a note
    - There is only one endpoint in this API that accepts post requests (listed below)
        -PORT/note/create
    
    To use PORT/note/create

    1.) First have an object with the required fields (title and textBody)
        1.a) should look like this ---> {title:"your title", textBody:"body of text"}
    2.) Next make a post request to the endpoint (example using axios below)
        2.a)axios.post('http://localhost:9000/note/create', yourObject) <-- Your object should look like example 1.a above
    3.) Once the request is sent the server will respond with an object containing the generated id of your note
        2.a) {ID : 1}  <--- 1 could be any number
    4.) To obtain the id of your note save it using the .then and grabbing it from response.data
    5.) note is added and should appear when doing get request with PORT/note/get/all or PORT/note/get/(returned id)

----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------

Making Put Requests: Editing a note
    -There is one endpoint that accepts a put request (listed below)
        -PORT/note/edit/:id
    
    To use PORT/note/edit/:id

    1.)Have an object with required fields prepared (title and textBody)
    2.) Make a request using axios replacing :id with the id of the note you wish to edit
        1.a) axios.put('http://localhost:9000/note/edit/1') <-- This would get the note with id 1
    3.) The server will respond with an object stating how many objects were updated (example below)
        2.a)"1 item was edited"
    4.) Make sure the note was changed

----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
Making Delete Requests: deleting a note
    -There is one endpoint that accepts a delete request (listed below)
        -PORT/note/delete/:id
    
    To use PORT/note/delete/:id

    1.) Make a delete request to the provided endpoint replacing :id with the id of the note you wish to delete (example below using axios)
        1.a) axios.delete(`http://localhost:9000/note/delete/1`) <--- This will delete the note with id of 1
    2.)If successful the server will send a response of '1 note deleted'

----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------

Field name types and restrictions

Field Name      Type        Restrictions
________________________________________________________
title           string      Must be under 128 characters

textBody        string      Must be under 2048 characters

id              number      N.A. (Automatically Generated)

----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------------------------
FAQ

1) This is a question
1A) Well thought out answer

2)Another Question
2A) I don't know questions people would have after this amazing documentation

3)Last question?
3A) I got lazy at the end


Contact Us/Support
I can't help you but these people can!
LINK: https://lambdaschool.com/



