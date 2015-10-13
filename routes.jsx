Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={AuditList} />
    <Route path="/audit/:slug" layout={Layout} content={AuditInput} />
    <Route path="/audits" layout={Layout} content={AuditList} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />

    <Route path="/audit/md/:slug" layout={AuditLayout} content={AuditInput} />
    <Route path="/audit/dc/:slug" layout={AuditLayout} content={AuditInput} />
    <Route path="/audit/recommendations/:slug" layout={AuditLayout} content={AuditRecommendations} />
  </Router>
);
