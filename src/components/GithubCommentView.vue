<template>
  <div>
    <avatar-view
      :user="userLogin"
      :userUrl="userProfileUrl"
      :imageUrl="userAvatarUrl"
    ></avatar-view>
    <ul :id="'issue-comment-' + commentId" class="list-group">
      <li class="list-group-item list-group-item-info header">
        <strong>
          <a :href="userProfileUrl" rel="nofollow" target="_blank">
            {{userLogin}}
          </a>
        </strong>
        commented
        <a :href="'#issue-comment-' + commentId" rel="nofollow">
          <relative-time :date="publishDate"></relative-time>
        </a>
      </li>
      <li class="list-group-item">
        <div v-html="commentHtmlBody"></div>
      </li>
    </ul>
  </div>
</template>
<script>
  import AvatarView from './AvatarView'
  import RelativeTime from './RelativeTime'
  export default {
    name: 'github-comment-view',
    props: [
      'commentId',
      'userLogin',
      'userProfileUrl',
      'userAvatarUrl',
      'publishDate',
      'commentHtmlBody'
    ],
    components: {
      RelativeTime,
      AvatarView
    },
  }
</script>
