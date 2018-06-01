import React, {Component} from "react";
import axios from "axios"

class GitHub extends Component {
    constructor() {
        super();
        this.state={
            token: "",
            tokenType:"",
            scope: ""
        }
    }

    componentDidMount() {
        const code = this.props.location.search
        console.log(this.props.location.search)
        axios.get(`http://localhost:5000/user/signin/callback${code}`)
        .then(response => {
            console.log(response.data)
            this.setState({
                token: response.data.access_token,
                tokenType: response.data.token_type,
                scope: response.data.scope
            })
            console.log(this.state)
            axios.get(`https://api.github.com/user?access_token=${this.state.token}`)
            .then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        return (
            <div>Testing</div>
        )
    }
}


export default GitHub;