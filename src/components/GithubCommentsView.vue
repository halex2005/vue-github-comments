<template>
  <div>
    <ul class="comments-list">
      <li v-for="comment in comments" class="comment-block" :key="comment.id">
        <avatar-view
          :user="comment.user.login"
          :userUrl="comment.user.htmlUrl"
          :imageUrl="comment.user.avatarUrl"
        ></avatar-view>
        <ul :id="'issue-comment-' + comment.id" class="list-group">
          <li class="list-group-item list-group-item-info header">
            <strong>
              <a :href="comment.user.htmlUrl" rel="nofollow" target="_blank">
                {{comment.user.login}}
              </a>
            </strong>
            commented
            <a :href="'#issue-comment-' + comment.id" rel="nofollow">
              <relative-time :date="comment.createdAt"></relative-time>
            </a>
          </li>
          <li class="list-group-item">
            <div v-html="comment.bodyHtml"></div>
          </li>
        </ul>
      </li>
      <li class="comment-block">
        <div v-if="showLoader">
          <i class="fa fa-spin fa-spinner fa-fw fa-2x"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <template v-if="!showLoader && canShowMoreComments">
          <button class="btn btn-success" @click="loadMoreComments">Show more comments</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
  import Octokat from 'octokat'
  import AvatarView from './AvatarView.vue'
  import RelativeTime from './RelativeTime'
  export default {
    name: 'github-comments-view',
    props: [
      'apiRoot',
      'owner',
      'repository',
      'issueNumber'
    ],
    components: {
      RelativeTime,
      AvatarView
    },
    created: function () {
      this.showLoader = true
      const octo = new Octokat({
        rootURL: this.apiRoot,
        acceptHeader: 'application/vnd.github.v3.html+json'
      })
      octo.repos(this.owner, this.repository)
        .issues(this.issueNumber)
        .comments
        .fetch()
        .then(this.addComments)
    },
    methods: {
      addComments: function (comments) {
        this.comments = this.comments.concat(comments.items)
        this.nextComments = comments.nextPage
        this.canShowMoreComments = !!comments.nextPage
        this.showLoader = false
      },
      loadMoreComments: function () {
        if (this.nextComments) {
          this.showLoader = true
          this.nextComments.fetch().then(this.addComments)
        }
      }
    },

    data: function () {
      return {
        comments: [],
        canShowMoreComments: false,
        showLoader: false
      }
    }
  }
</script>

<style scoped>
  .comments-list {
    list-style-type: none;
  }

  .comment-block {
    margin: 20px 20px 20px 80px;
  }

</style>
