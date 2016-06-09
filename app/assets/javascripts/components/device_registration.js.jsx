var DeviceReg  = React.createClass({
  handleFormSubmit: function(event) {
    event.preventDefault();
    data = $(event.target).serialize();
    $.ajax({
      url: '/devices',
      type: 'POST',
      data: data
    }).success(function(response){
      if (response.errors) {
        console.log(response.errors)
        $(".errors").find("li").remove()
        var errors = response.errors
        $(".errors").append(`<li> ${errors} </li>`)
      } else {
        if (response.found) {
          this.props.onAction('deviceFound', {message: response.found, houseID: response.id})
        } else {
          this.props.onAction('house', {newUser: true} )
        }
      }
    }.bind(this));
  },

  render: function() {
    return <div className="device-reg">
      <div className="device-form">
        <form onSubmit={this.handleFormSubmit} className="col s10">
          <div className="row">
            <div className="input-field col s10">
              <i className="material-icons prefix">settings_remote</i>
              <input type="text" className="validate" name="code" />
              <label>Rasberry Pi Code</label>
            </div>
            <div className="errors-div">
              <ul className="errors">
              </ul>
            </div>
            <div className="input-field col s10 center-align">
              <button className="register-button" type="submit" name="action">
              register your device
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  }
});
