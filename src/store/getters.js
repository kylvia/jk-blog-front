const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  info: state => state.sysInfo.info,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  errorLogs: state => state.errorLog.logs
}
export default getters
