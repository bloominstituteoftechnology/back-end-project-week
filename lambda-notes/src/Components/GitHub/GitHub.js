import React, {Component} from "react";
import axios from "axios"
import {PacmanLoader} from "react-spinners"
import "./GitHub.css"
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
        axios.get(`http://localhost:5000/user/signin/callback${code}`)
        .then(response => {
            this.setState({
                token: response.data.access_token,
                tokenType: response.data.token_type,
                scope: response.data.scope
            })
            axios.get(`https://api.github.com/user?access_token=${this.state.token}`)
            .then(response => {
                localStorage.setItem("node_id", response.data.node_id);
                const nodeId = localStorage.getItem("node_id");
                this.props.history.push("/home")
            }).catch(err => {
                console.log(err);
                this.props.history.push("/login")
            })
        })
        .catch(err => {
            console.log(err);
            this.props.history.push("/login")
        })
    }
    render() {
        return (
            <div className="pacman">
                <PacmanLoader
                color={"#666"}
                size={40}
                loading={true}
                />
            </div>
        )
    }
}


export default GitHub;