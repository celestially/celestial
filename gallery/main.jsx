Gallery = new Mongo.Collection('gallery');

const galleryModule = {
  name: 'gallery',
  collection: Gallery,
  layout: Layout,
  routes: [
  {
    path: '/:id/main',
    name: 'main',
    content: GalleryMain
  }
]
};

Reaktor.init(
  <Router>

    {celestial.createRoutes(galleryModule)}

    <Route path="/gallery/list"
           layout={Layout}
           content={celestial.getListComponent(galleryModule)} />
  </Router>);

