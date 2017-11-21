<template>
  <div>
    <ul class="comments-list">
      <li v-for="comment in comments" class="comment-block" :key="comment.id">
        <avatar-view
          :user="comment.user.login"
          :userUrl="comment.user.htmlUrl"
          :imageUrl="comment.user.avatarUrl"
        ></avatar-view>
        <div :id="'issue-comment-' + comment.id" class="comment-container">
          <h3 class="header">
            <strong>
              <a :href="comment.user.htmlUrl" rel="nofollow">{{comment.user.login}}</a>
            </strong>
            commented
            <a :href="'#issue-comment-' + comment.id" class="timestamp" rel="nofollow">
              <relative-time :date="comment.createdAt"></relative-time>
            </a>
          </h3>
          <div class="content">
            <div v-html="comment.bodyHtml" class="content-child"></div>
          </div>
        </div>
      </li>
    </ul>
    <template v-if="showLoader">
      <i class="fa fa-spin fa-spinner fa-fw fa-2x"></i>
      <span class="sr-only">Loading...</span>
    </template>
    <template v-if="!showLoader && canShowMoreComments">
      <button @click="loadMoreComments">Show more comments</button>
    </template>
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
    list-style: none;
  }

  .comment-block {
    margin: 20px 20px 20px 80px;
  }

  .comment-container .header {
    font-size: 14px;
    background-color: bisque;
    padding: 10px 15px 10px 15px;
    border: #ffa0a0 solid 1px;
    border-bottom: none;
    margin: 0;
    color: gray;
  }

  .comment-container .content {
    background-color: cornsilk;
    padding: 0px 15px 0px 15px;
    border: #ffa0a0 solid 1px;
    margin: 0;
  }

  .content-child {
    padding: 0;
  }

  .timestamp {
    color: inherit;
  }
</style>
