import axios from 'axios';
//holds all functions/actions

const endpoint = 'http://localhost:9000/api/';

// must be exported as regular functions to work
export function getAllNotes() {
	axios
		.get(endpoint + 'notes')
		.then((res) => {
			console.log(res.data);
			this.setState({ notes: res.data });
		})
		.catch((err) => console.log(err));
}

/////// get one note by id
export function getNoteId(id) {
	axios
		.get(endpoint + `note/${id}`)
		.then((res) => {
			this.setState({ noteId: res.data });
		})
		.catch((err) => console.log(err));
}

/////// handle all input changes for the site
export function handleChange(e) {
	this.setState({ [e.target.name]: e.target.value });
}

///// filter search
export function filterSearch() {
	this.getAllNotes();
	const { notes, searchTitle } = this.state;
	return searchTitle
		? notes.filter((note) => note.title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1)
		: notes;
}

///// add a new note
export function addNote(e) {
	e.preventDefault();
	const { title, textBody } = this.state;
	if (title === '' && textBody === '') {
		alert('Please edit at least one of the fields');
	} else {
		axios
			.post(endpoint + 'createnote', { title: title, content: textBody })
			.then(() => this.setState({ title: '', textBody: '' }));
	}
}

// edit note
export function handleSubmit(id) {
	const { editTitle, editBody } = this.state;
	axios
		.put(endpoint + 'note/' + id, {
			title: editTitle,
			content: editBody
		})
		.then(() => {
			getAllNotes();
		})
		.catch((err) => console.log(err));
}

export function deleteNote(id) {
	console.log('action');
	axios
		.delete(endpoint + `removenote/${id}`)
		.then(() => {
			getAllNotes();
		})
		.catch((err) => console.log(err));
}
