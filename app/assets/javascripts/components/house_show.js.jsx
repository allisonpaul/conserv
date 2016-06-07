var House = React.createClass({
  getInitialState: function(){
    return {
      data: undefined
    }
  },

  componentWillMount: function(){
    $.ajax({
      url: '/houses',
      type: 'GET'
    }).success(function(response){
      this.setState({data: response});
    }.bind(this));
  },

  handleFormSubmit: function(event){
    event.preventDefault();
    data = $(event.target).serialize();
    $.ajax({
      url: '/houses/add',
      type: 'POST',
      data: data
    }).success(function(response){
      if (response.errors) {
        var errors = response.errors
        $(".errors").append(`<li> ${errors} </li>`)
      } else {
        this.props.onAction('house') //not refreshing page with new member on list
        var success = response.success
        $(".errors").append(`<li> ${success} </li>`)
      }
    }.bind(this));
  },

  render: function(){
    if (this.state.data != undefined) {
      return (
      <div className="house-info">


        <h3> { this.state.data.data[0].house_name } </h3>
        <h5> Current Members: </h5>

        <ul class="collection">
          {this.state.data.data.map(function(data, i){
            return <li class="collection-item avatar" key={i}>
              <img src={ Gravtastic(data.email) } alt="" class="circle" />
              <span class="title">{data.user_name}</span>
            </li>
          })}
        <PieGraph />
        </ul>

        <h6> Add a new user to your house! </h6>
        <div className="add-member">
          <form onSubmit={this.handleFormSubmit} className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">person_pin</i>
                <input type="text" className="validate" name="name" />
                <label>Username</label>
              </div>
              <div className="input-field col s12 center-align">
                <button className="btn waves-effect waves-light" type="submit" name="action">
                  Add
                </button>
              </div>
            </div>
          </form>
          <div className="errors-div">
            <ul className="errors"></ul>
          </div>
        </div>

      </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
});
