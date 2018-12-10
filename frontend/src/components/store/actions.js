import axios from 'axios';
//holds all functions/actions

const endpoint = 'http://localhost:9000/api/';

// must be exported as regular functions to work
export function getAllNotes() {
	axios
		.get(endpoint + 'notes')
		.then((res) => {
			this.setState({ notes: res.data });
		})
		.catch((err) => console.log(err));
}

export function getNoteId(id) {
	axios
		.get(endpoint + `note/${id}`)
		.then((res) => {
			this.setState({ noteId: res.data });
		})
		.catch((err) => console.log(err));
}

export function handleChange(e) {
	this.setState({ [e.target.name]: e.target.value });
}

export function filterSearch() {
	this.getAllNotes();
	const { notes, searchTitle } = this.state;
	return searchTitle
		? notes.filter((note) => note.title.toLowerCase().indexOf(searchTitle.toLowerCase()) > -1)
		: notes;
}

export function addNote(e) {
	e.preventDefault();
	const { title, textBody } = this.state;
	if (title === '' && textBody === '') {
		alert('Please edit at least one of the fields');
	} else {
		axios.post(endpoint + 'createnote', { title, textBody }).then(this.setState({ title: '', textBody: '' }));
	}
}

export function handleSubmit(id) {
	axios
		.put(endpoint + `editnote/${id}`, {
			title: this.state.editTitle,
			textBody: this.state.editBody
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
