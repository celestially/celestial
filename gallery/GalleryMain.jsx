var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
  stores: [imageStore]
});

const fields = ['gallery_name', 'gallery_desc']

GalleryMain = React.createClass({

  upload() {
    var self = this;
    console.log('self.props.item: ' + JSON.stringify(self.props.item));
    FS.Utility.eachFile(event, function (file) {
      Images.insert(file, function (err, fileObj) {
        if (err) {
          // handle error
        } else {
          // handle success depending what you need to do
          //var userId = Meteor.userId();
          //var imagesURL = {
          //  'profile.image': '/cfs/files/images/' + fileObj._id
          //};
          Gallery.update(self.props.item._id,
            {$push: {images: '/cfs/files/images/' + fileObj._id}});
        }
      })
    })
  },

  render() {
    console.log('GalleryMain: ');
    return <div className="row">
      <div className="col-xs-6">
        <AutoForm fields={fields}
          {...this.props} />

        {this.props.item.images.map( imageUrl => {
          return <img src={imageUrl} height="75px"> </img>
          })
          }
        <input type="file" onChange={this.upload}/>

      </div>
    </div>
  }
});


