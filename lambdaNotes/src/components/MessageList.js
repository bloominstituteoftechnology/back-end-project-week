import React, { Component } from "react";
import ReactDom from 'react-dom';

class MessagesList extends Component {

  componentWillUpdate() {
    const node = ReactDom.findDOMNode(this)
    this.shouldScrollToBottom = node.scrollTop + node.clientHeight >= node.scrollHeight
  }

  componentDidUpdate() {
    if(this.shouldScrollToBottom) {
      const node = ReactDom.findDOMNode(this)
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    const styles = {
      container: {
        overflowY: "scroll",
        flex: 1
      },
      ul: {
        listStyle: "none"
      },
      li: {
        marginTop: 13,
        marginBottom: 13
      },
      senderUsername: {
        fontWeight: "bold"
      },
      message: { fontSize: 15 }
    };
    return (
      <div
        style={{
          ...this.props.style,
          ...styles.container
        }}
      >
        <ul style={styles.ul}>
          {this.props.messages.map((message, index) => (
            <li key={index} style={styles.li}>
              <div>
                <span style={styles.senderUsername}>{message.senderId}</span>{" "}
              </div>
              <p style={styles.message}>{message.text}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MessagesList;
