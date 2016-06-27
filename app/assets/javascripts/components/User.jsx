var User = React.createClass({

  getInitialState: function(){
    return{
      // user can be slimmed down to just the avatar url!
      user: this.props.data,
      firstName: this.props.data.first_name,
      lastName: this.props.data.last_name,
      saving: false,
      files: [],
      preview: false
    }
  },

  _onSelect: function(){
    var file = this.refs.file.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      this.setState({
          files: [reader.result], preview: true
      })
    }.bind(this);
  },

  _removeFile: function(num){
    this.setState({
      files: this.state.files.filter(function(_, i) { return i !== num}), preview: false
    });
    // Reset the file upload input
    this.refs.file.value = "";
  },

  updateState: function(data){
    this.setState({ user: data, uploading: false, files: [], preview: false});

    // Reset the file upload input
    this.refs.file.value = "";
  },

  _firstName: function(e) {
    this.setState({ firstName: e.target.value })
  },

  _lastName: function(e) {
    this.setState({ lastName: e.target.value });
  },

  _imageRender: function(){
    var images = this.state.files.map( function(f, x) {
      return(
        <div key={x}>
          <img src={f} width="50" height='50'/>
          <button className="button small image-remove" onClick={this._removeFile.bind(this, x)}>Remove</button>
        </div>
      )
    }.bind(this));
    return(<div>{images}</div>)
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
            <input ref="file" type="file" multiple="true" onChange={this._onSelect}/>
            <input type="hidden" name="user[avatar]" value={this.state.files} multiple="true" />
          </form>
          <div className={this.state.preview ? "image-preview" : "hidden"}>
            <h5>Preview:</h5>
            {this._imageRender()}
          </div>
          {/* Removing the button outside the form prevents a refresh */}
          {this.state.saving ? "Saving..." : <button className="button" onClick={this.onSave}>Save</button>}
        </div>
      </div>
    )
  }
});
module.exports = User;
