var User = React.createClass({

  onUpload: function(){
    var formData = $(this.refs.myForm).serialize();
    $.ajax({
       url: '/users/1/upload',
       type: 'POST',
       data: formData,
       async: false,
       cache: false,
       contentType: false,
       processData: false,
       success: function (data) {
           console.log("success: " + data);
       },
       error: function () {
           alert("error in ajax form submission");
       }
    });
  },
  render: function(){
    return(
      <form ref="myForm" remote="true">
        <input type="file" name="user[avatar]" />
        <button className="button" onClick={this.onUpload}>Upload</button>
      </form>
    )
  }
});
module.exports = User;
