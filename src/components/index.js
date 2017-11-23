import AvatarView from './AvatarView.vue'
import GithubCommentView from './GithubCommentView.vue'
import GithubCommentsListView from './GithubCommentsListView.vue'
import RelativeTime from './RelativeTime.vue'
import { version } from './../../package.json'

export function install(Vue) {
  Vue.component('avatar-view', AvatarView)
  Vue.component('github-comment-view', GithubCommentView)
  Vue.component('github-comments-list-view', GithubCommentsListView)
  Vue.component('relative-time', RelativeTime)
}

export {
  AvatarView,
  GithubCommentView,
  GithubCommentsListView,
  RelativeTime
}

const plugin = {
  install,
  version
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
