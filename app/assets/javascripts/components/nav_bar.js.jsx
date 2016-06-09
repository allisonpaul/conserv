var NavBar = React.createClass ({
  handleClick: function(destination){
    this.props.onAction(destination);
    $('.button-collapse').sideNav('hide')
  },

  navOptions: function(){
    if(this.props.userLoggedIn === true) {
      return (
        <div>
          <li><a onClick={this.handleClick.bind(null, "userShow")} >{this.props.currentUserName}</a></li>
          <li><a onClick={this.handleClick.bind(null, "claimEvent")} >Claim Events</a></li>
          <li><a onClick={this.handleClick.bind(null, "lineGraph")} >Progress</a></li>
          <li><a onClick={this.handleClick.bind(null, "house")} >House</a></li>
          <li><a onClick={this.handleClick.bind(null, "logout")} >Logout</a></li>
        </div>
      )
    } else {
      return (
        <p id="login-nav-message"> WELCOME TO CONSERV. PLEASE LOGIN TO HAVE ACCESS. </p>
      )
    }
  },

  render: function(){
    return (
      <nav>
        <div className="nav-wrapper">
          <a onClick={this.handleClick.bind(null, "userShow")} href="#" className="brand-logo"><ConservLogo/></a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="side-nav navtext" id="mobile-demo">
            {this.navOptions()}
          </ul>
        </div>
      </nav>
    )
  }

})




