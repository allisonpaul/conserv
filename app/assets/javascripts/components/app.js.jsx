var App = React.createClass({
  getInitialState: function() {
    return {
      screen: "login",
      userLoggedIn: false,
      currentUserID: undefined,
    }
  },

  updateView: function(newView, options = {}) {
    this.setState({ screen: newView })
    this.setState(options)
  },

  updateScreenContent: function() {
    switch(this.state.screen) {
      case "login":
        return <Login onAction={this.updateView} />
      case "main":
        if (this.state.userLoggedIn === true) {
          return <HomePage />
        } else {
          return <Login />
        }
      case "register":
        return <Register onAction={this.updateView} />
    }
  },
  render: function(){
    return <div className="app-container">
    < NavBar/>
      {this.updateScreenContent()}
    </div>
  },
});
