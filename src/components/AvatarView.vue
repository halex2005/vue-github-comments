<template>
  <div class="avatar-container">
    <a :href="userUrl" rel="nofollow" target="_blank">
      <img :src="imageUrl" :alt="user" class="avatar"/>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'avatar-view',
    props: [
      'user',
      'userUrl',
      'imageUrl'
    ]
  }
</script>

<style scoped>
  .avatar-container {
    border-radius: 5px;
    float: left;
    position: relative;
    margin-left: -65px;
  }

  .avatar {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 5px;
    border-style: none;
    display: inline-block;
  }
</style>
