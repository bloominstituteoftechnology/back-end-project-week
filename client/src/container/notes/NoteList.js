import { connect } from "react-redux";
import NoteList from "../../component/notes/noteList";
import { getNotes } from "../../store/actions/note";

const mapStateToProps = state => ({
	notes: state.note.notes
});
const mapDispatchToProps = dispatch => ({
	getNotes: dispatch(getNotes())
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NoteList);
