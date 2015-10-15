Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={AuditList} />
    <Route path="/audits" layout={Layout} content={AuditList} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />

    <Route path="/audit/:slug" layout={AuditLayout} content={AuditInput} />
    <Route path="/audit/md/:slug" layout={AuditLayout} content={AuditInput} />
    <Route path="/audit/dc/:slug" layout={AuditLayout} content={AuditInput} />
    <Route path="/audit/recommendations/:slug" layout={AuditLayout} content={AuditRecommendations} />

    <Route path="/grid/ex1" layout={Layout} content={GridEx1} />

  </Router>
);
