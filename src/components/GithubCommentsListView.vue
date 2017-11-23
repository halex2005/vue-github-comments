<template>
  <div>
    <ul class="comments-list">
      <li v-for="comment in comments" class="comment-block" :key="comment.id">
        <github-comment-view
          :commentId="comment.id"
          :userLogin="comment.user.login"
          :userProfileUrl="comment.user.htmlUrl"
          :userAvatarUrl="comment.user.avatarUrl"
          :publishDate="comment.createdAt"
          :commentHtmlBody="comment.bodyHtml"
        ></github-comment-view>
      </li>
      <li class="comment-block">
        <div v-if="showLoader">
          <i class="fa fa-spin fa-spinner fa-fw fa-2x"></i>
          <span class="sr-only">Loading...</span>
        </div>
        <template v-if="!showLoader && canShowMoreComments">
          <button class="btn btn-success" @click="loadMoreComments">Show more comments</button>
          <span>{{comments.length}} of {{overallCommentsCount}} comments shown</span>
        </template>
        <template v-if="!showLoader && !canShowMoreComments">
          <span>{{overallCommentsCount}} comments shown</span>
        </template>
      </li>
    </ul>
  </div>
</template>
<script>
  import Octokat from 'octokat'
  import GithubCommentView from './GithubCommentView'
  export default {
    name: 'github-comments-list-view',
    props: [
      'apiRoot',
      'owner',
      'repository',
      'issueNumber'
    ],
    components: {
      GithubCommentView
    },
    data: function () {
      return {
        comments: [],
        overallCommentsCount: 0,
        canShowMoreComments: false,
        showLoader: false
      }
    },
    created: async function() {
      this.showLoader = true
      const octo = new Octokat({
        rootURL: this.apiRoot,
        acceptHeader: 'application/vnd.github.v3.html+json'
      })
      const issueRoot = octo
        .repos(this.owner, this.repository)
        .issues(this.issueNumber)

      const issue = await issueRoot.fetch()
      this.overallCommentsCount = issue.comments

      const comments = await issueRoot.comments.fetch()
      this.addComments(comments)
    },
    methods: {
      addComments: function (comments) {
        this.comments = this.comments.concat(comments.items)
        this.nextComments = comments.nextPage
        this.canShowMoreComments = !!comments.nextPage
        this.showLoader = false
      },
      loadMoreComments: function () {
        if (!this.showLoader && this.nextComments) {
          this.showLoader = true
          this.nextComments.fetch().then(this.addComments)
        }
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
