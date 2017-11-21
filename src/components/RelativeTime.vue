<template>
  <span
    :date="this.date.toISOString()"
    :title="this.date.toLocaleString()">
    {{this.relativeDate}}
  </span>
</template>

<script>
  export default {
    name: 'relative-time',
    props: {
      date: {
        default: new Date(),
        type: Date,
        required: true
      }
    },
    computed: {
      relativeDate: function () {
        const oneMinute = 60*1000
        const oneHour = 60*oneMinute
        const oneDay = 24*oneHour
        const oneMonth = 30*oneDay
        const difference = new Date() - this.date

        if (difference < oneMinute) {
          return 'just now'
        } else if (difference < oneHour) {
          return Math.floor(difference/oneMinute) + ' minutes ago'
        } else if (difference < oneDay) {
          return Math.floor(difference/oneHour) + ' hours ago'
        } else if (difference < oneMonth) {
          return Math.floor(difference/oneDay) + ' days ago'
        } else {
          return 'on ' + this.date.toLocaleString()
        }
      }
    }
  }
</script>
