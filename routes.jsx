Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={Home} />
    <Route path="/post/:slug" layout={Layout} content={Post} />
    <Route path="/audit/:slug" layout={Layout} content={AuditInput} />
    <Route path="/audits" layout={Layout} content={AuditList} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />
  </Router>
);
