<template>
  <div id="app">
    <github-comments-list-view
      v-bind="githubSettings"
      :issue-number="issueNumber"
    >
    </github-comments-list-view>
  </div>
</template>

<script>
import GithubCommentsListView from './components/GithubCommentsListView'

export default {
  name: 'app',
  components: {
    GithubCommentsListView
  },
  data() {
    return {
      githubSettings: {
        apiRoot: 'https://api.github.com',
        owner: 'halex2005',
        repository: 'temp-repo-for-issues',
        applicationClientId: 'ba94aae109fbd9e8329a'
      },
      issueNumber: '1',
      newPostText: 'nothing here?'
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
