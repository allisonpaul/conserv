var NavBar = React.createClass ({
  handleClick: function(destination){
    this.props.onAction(destination);
    $('.button-collapse').sideNav('hide')
  },

  render: function(){
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo"><ConservLogo/></a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a onClick={this.handleClick} >User page</a></li>
            <li><a href="badges.html">House</a></li>
          </ul>
          <ul className="side-nav navtext" id="mobile-demo">
            <li><a onClick={this.handleClick.bind(null, "claimEvent")} >claim</a></li>
            <li><a onClick={this.handleClick.bind(null, "barGraph")} >weekly</a></li>
            <li><a onClick={this.handleClick.bind(null, "userShow")} >user</a></li>
            <li><a onClick={this.handleClick.bind(null, "lineGraph")} >history</a></li>
            <li><a onClick={this.handleClick.bind(null, "pieGraph")} >house view</a></li>
            <li><a onClick={this.handleClick.bind(null, "houseForm")} >make a house</a></li>
            <li><a onClick={this.handleClick.bind(null, "house")} >house</a></li>
            <li><a onClick={this.handleClick.bind(null, "logout")} >logout</a></li>
          </ul>
        </div>
      </nav>
    )
  }

})




