Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={AuditList} />
    <Route path="/audit/:slug" layout={Layout} content={AuditInput} />
    <Route path="/audits" layout={Layout} content={AuditList} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />
  </Router>
);
