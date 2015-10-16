Reaktor.init(
  <Router>
    <Route path="/" layout={Layout} content={AuditList} />
    <Route path="/audits" layout={Layout} content={AuditList} />
    <Route path="/collConfig" layout={Layout} content={CollectionConfig} />

    <Route path="/audit/:slug" layout={Layout} content={AuditInput} />
    <Route path="/audit/md/:slug" layout={Layout} content={AuditInput} />
    <Route path="/audit/dc/:slug" layout={Layout} content={AuditInput} />
    <Route path="/audit/recommendations/:slug" layout={Layout} content={AuditRecommendations} />

    <Route path="/audit1" layout={Layout} content={AuditTest} />

    <Route path="/grid/ex1" layout={Layout} content={GridEx1} />

  </Router>
);


