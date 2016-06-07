var House = React.createClass({
  getInitialState: function(){
    return {
      data: undefined
    }
  },

  getHouseData: function(){
    $.ajax({
      url: '/houses',
      type: 'GET'
    }).success(function(response){
      this.setState({data: response});
    }.bind(this));
  },

  componentWillMount: function(){
    this.getHouseData();
  },

  handleFormSubmit: function(event){
    var that = this
    event.preventDefault();
    $('.pieChartContainer').remove()
    data = $(event.target).serialize();
    $.ajax({
      url: '/houses/add',
      type: 'POST',
      data: data
    }).success(function(response){
      this.getHouseData();
      if (response.errors) {
        var errors = response.errors
        $(".errors").append(`<li> ${errors} </li>`)
      } else {
        console.log(this.props) //not refreshing page with new member on list
        var success = response.success
        $(".errors").append(`<li> ${success} </li>`)
        this.props.onAction('house', {houseMember: true})
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
            return <li class="collection-item avatar" className="circle" key={i}>
              <img src={ Gravtastic(data.email) } alt="" class="circle" />
              <span class="title">{data.user_name}</span>
            </li>
          })}
        <PieGraph />
        </ul>

        <h6> Add a new user to your house! </h6>
        <div className="add-member">
          <form onSubmit={this.handleFormSubmit} className="col s10">
            <div className="row">
              <div className="input-field col s10">
                <i className="material-icons prefix">person_pin</i>
                <input type="text" className="validate" name="name" />
                <label>Username</label>
              </div>
              <div className="input-field col s10 center-align">
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
