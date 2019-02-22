var Home = React.createClass({
  // ...
  showLock: function() {
    // Show the Auth0Lock widget
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="login-box">
      <a onClick={this.showLock}>Sign In</a>
    </div>);
  }
});