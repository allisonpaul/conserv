var ClaimEvent = React.createClass({
  getUserEvents: function() {
    request = $.ajax({
      url: /events/
    })
  },
  render: function(){
    return(
      <div>
        <h1 className="claim-event">Claim a slot </h1>
      </div>
    );
  }
})
