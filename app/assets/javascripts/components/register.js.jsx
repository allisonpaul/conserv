var Register = React.createClass({
  handleFormSubmit: function(event) {
    event.preventDefault();
    formData = $(event.target).serialize();
    var request = $.ajax({
      url: '/users',
      type: 'post',
      data: formData
    })
    request.done(function(response){
      if (response.errors) {
        var errorsList = response.errors.map(function(error, i) {
          return <li key={i} className='errors'>{error}</li>
        })
      } else {
        this.props.onUpdate('home')
        console.log(response.user_id)
      }
    })
  },
  render: function(){
    return (
      <div className="register-form">
        <form onSubmit={this.handleFormSubmit} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">account_circle</i>
              <input type="text" className="validate" name="user[username]" />
              <label>Username</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">email</i>
              <input type="text" className="validate" name="user[email]"/>
              <label>Email</label>
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">lock</i>
              <input type="password" className="validate" name="user[password]"/>
              <label>Password</label>
            </div>
            <div className="input-field col s12 center-align">
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
});
