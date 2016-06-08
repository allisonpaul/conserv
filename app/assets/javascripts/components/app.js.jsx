var App = React.createClass({
  getInitialState: function() {
    return {
      screen: "login",
      userLoggedIn: false,
      currentUserID: undefined,
      houseMember: false,
      message: undefined,
      houseID: undefined,
      currentUserName: undefined,
      newUser: false
    }
  },

  updateView: function(newView, options = {}) {
    if ($('.lineChartContainer') != []) { $('.lineChartContainer').remove() }
    $('.pieChartContainer').remove()
    this.setState({ screen: newView });
    this.setState(options);
    // this.updateScreenContent();
  },

  logout: function() {
    this.logoutServer();
    this.setState({
      screen: "main",
      userLoggedIn: false,
      currentUserID: undefined,
    });
  },

  logoutServer: function() {
    $.ajax({
      url: '/logout',
      type: 'get'
    }).done(function(response) {console.log(response)})
  },

  updateScreenContent: function() {
    switch(this.state.screen) {
      case "login":
        return <Login onAction={this.updateView} />
      case "register":
        return <Register onAction={this.updateView} />
      case "device":
        return <DeviceReg onAction={this.updateView} />
      case "deviceFound":
        return <DeviceFound onAction={this.updateView} message={this.state.message} houseID={this.state.houseID} />
      case "userShow":
        if (this.state.userLoggedIn === true) {
          return <UserShow onAction={this.updateView} />
        } else { return <Login onAction={this.updateView} /> }
      case "claimEvent":
        return <ClaimEvent onAction={this.updateView} />
      case "lineGraph":
        return <LineGraph onAction={this.updateView} />
      case "pieGraph":
        return <PieGraph onAction={this.updateView} />
      case "barGraph":
        return <BarGraphContainer onAction={this.updateView} />
      case "house":
      if (this.state.houseMember === true) {
        return <House onAction={this.updateView} />
      } else {
        return <HouseForm onAction={this.updateView} newUser={this.state.newUser} />
      }
      case "logout":
        this.logout()
    }
  },
  render: function(){
    return <div className="app-container">
    <NavBar
      onAction={this.updateView}
      userLoggedIn={this.state.userLoggedIn}
      currentUserName={this.state.currentUserName} />

      {this.updateScreenContent()}
    </div>
  },
});
