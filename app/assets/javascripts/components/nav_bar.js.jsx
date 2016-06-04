var NavBar = React.createClass ({
  render: function(){
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo"><ConservLogo/></a>
          <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul className="right hide-on-med-and-down">
            <li><a href="sass.html">User page</a></li>
            <li><a href="badges.html">House</a></li>
            <li><a href="collapsible.html">Settings</a></li>
            <li><a href="mobile.html">Invite Friends</a></li>
          </ul>
          <ul className="side-nav" id="mobile-demo">
            <li><a href="sass.html">User page</a></li>
            <li><a href="badges.html">House</a></li>
            <li><a href="collapsible.html">Settings</a></li>
            <li><a href="mobile.html">Invite Friends</a></li>
          </ul>
        </div>
      </nav>
    )
  }

})




