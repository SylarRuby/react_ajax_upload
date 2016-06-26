var User = React.createClass({

  getInitialState: function(){
    return{
      // user can be slimmed down to just the avatar url!
      user: this.props.data,
      firstName: this.props.data.first_name,
      lastName: this.props.data.last_name,
      saving: false
    }
  },

  updateState: function(data){
    this.setState({ user: data, uploading: false});
  },

  _firstName: function(e) {
    this.setState({ firstName: e.target.value })
  },

  _lastName: function(e) {
    this.setState({ lastName: e.target.value });
  },

  onSave: function(){

    this.setState({ saving: true });

    /*
    * Do not use .serialize()!
    * It's not a good idea if we want to send a form with post method
    * But instead:
    */
    var fd = $(this.refs.myForm).context;
    var formData = new FormData(fd);

    $.ajax({
       url: '/users/1/upload',
       type: 'POST',
       data: formData,
       cache: false,
       contentType: false,
       processData: false,
       success: function (data, xhr) {
           this.setState({ saving: false });
           // Re-render the uploaded image
           this.updateState(data["user"]);

           // You may not need this?
           alert("Profile updated!");
       }.bind(this),
       error: function () {
          this.setState({ saving: false });
          console.log("Error in ajax submission");
       }.bind(this),
    });
  },
  render: function(){
    return(
      <div className="row">
        <div className="large-10 large-centered columns">
          <h1>Simple user image upload</h1>
          <form ref="myForm" encType="multipart/form-data" remote="true">
            <div className="user-details callout secondary">
              <span className="circle">
                <img src={this.state.user.avatar_url_medium} />
              </span>
              <div className="medium-6 columns">
                <input type="text"
                  name="user[first_name]"
                  value={this.state.firstName}
                  onChange={this._firstName}
                  placeholder="First name"/>
              </div>
              <div className="medium-6 columns">
                <input type="text"
                  name="user[last_name]"
                  value={this.state.lastName}
                  onChange={this._lastName}
                  placeholder="Last name"/>
              </div>
            </div>
            <input type="file" name="user[avatar]" id="user_avatar"/>
          </form>
          {/* Removing the button outside the form prevents a refresh */}
          {this.state.saving ? "Saving..." : <button className="button" onClick={this.onSave}>Save</button>}
        </div>
      </div>
    )
  }
});
module.exports = User;
