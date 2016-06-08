var UserShow = React.createClass ({
  getInitialState: function() {
    return {
      data: undefined
    }
  },

  componentWillMount: function(){
    $.ajax({
      url: '/users/show',
      type: 'GET'
    }).success(function(response){
      this.setState({data: response});
    }.bind(this));
  },


  randFact: function(array) {
    return array[Math.floor(Math.random()*array.length)];
  },

  render: function(){
    var waterFacts = [
      'The United States uses about 346,000 million gallons of fresh water every day.',
      'By the time a person feels thirsty, his or her body has lost over 1 percent of its total water amount.',
      'The weight a person loses directly after intense physical activity is weight from water, not fat.',
      'There is more water in the atmosphere than in all of our rivers combined.',
      'A bath uses up to 70 gallons of water; a five-minute shower uses 10 to 25 gallons.',
      'A jellyfish and a cucumber are each 95% water.',
      'It takes more than twice the amount of water to produce coffee than it does tea.',
      'You use about 2 gallons to flush a toilet – about the same as you use to brush your teeth.',
      'Your bones are composed of 31% water.',
      'Cold water is heavier than hot water.',
      'Bill Gates sponsors a machine that turns poop into drinking water.',
      'Giraffes can go longer without drinking water than camels can.',
      'The deep sea is the largest museum on Earth: There are more artifacts and remnants of history in the ocean than in all of the world’s museums, combined.',

    ]

    if (this.state.data != undefined) {
      return(
        <div>
          <div>
            <h1 id="username">{this.state.data.username}'s <br/> <span id="sub-t">recent activity</span></h1>
            <img id="avatar" src={ Gravtastic(this.state.data.email) } />
          </div>
          <BarGraphContainer />
          <div className="fact">
          <p className="water-fact"> <h6 id="fact">Did you know?</h6><br/> { this.randFact(waterFacts) } </p>
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
