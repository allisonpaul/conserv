var Login = React.createClass({
  handleFormSubmit: function(event) {
    event.preventDefault();
    formData = $(event.target).serialize();
    var request = $.ajax({
      url: '/sessions',
      type: 'post',
      data: formData
    })
    request.done(function(response){
      if (response.errors) {
        console.log(response)
        var errorsList = response.errors
        $(".errors").append(`<li> ${errorsList} </li>`)
      } else {
        this.props.onAction('main', { currentUserID: response.user_id, userLoggedIn: true })
        console.log(response.user_id)
      }
    }.bind(this))
  },

  handleRegisterClick: function(){

    this.props.onAction("register")
  },

  render: function(){
    return (
      <div className="login-form">
      <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input type="text" className="validate" name="email"/>
              <label>Email</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input type="password" className="validate" name="password"/>
              <label>Password</label>
            </div>
            <div className="input-field col s12 center-align">
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
          <div className="row">
            <div className="input-field col s12">
             <a className="center-align" onClick={this.handleRegisterClick}>Register</a>
            </div>
          </div>
          <div className="errors-div">
            <ul className="errors">
            </ul>
          </div>
      </div>
    )
  }
});
