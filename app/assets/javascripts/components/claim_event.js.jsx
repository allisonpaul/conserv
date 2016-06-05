var ClaimEvent = React.createClass({
  getUserEvents: function() {
    $.ajax({
      url: '/events',
      type: 'get'
    })
    .done(function(response){
      console.log(response)
    })
  },
  render: function(){
    return(
      <div className="soft-white-bg">
        <h1 className="claim-event">Claim a slot </h1>
        { this.getUserEvents() }
      </div>
    );
  }
})
