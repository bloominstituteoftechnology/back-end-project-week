import React from "react";
import axios from "axios";

class PostContainer extends React.Component {
	state = {
		posts: [],
	};

	componentDidMount() {
		axios
			.get("http://localhost:3333/api/posts")
			.then(response => {
				console.log(response.data);
				this.setState({ posts: response.data });
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		return (
			<ul>
				{this.state.posts.map(post => {
					return <li>{post.text}</li>;
				})}
			</ul>
		);
	}
}

export default PostContainer;
