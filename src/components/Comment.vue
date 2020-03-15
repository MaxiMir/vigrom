<template>
  <div class="mt-1">
    <div>
      <p class="text-success">
        <span class="font-weight-lighter">{{ commentDate | date('datetime') }}:</span>
        @{{ userName }}
      </p>
      <p class="lead">{{ userComment }}</p>
    </div>
    <hr/>
  </div>
</template>

<script>
  export default {
    props: {
      userName: {
        type: String,
        required: true
      },
      userComment: {
        type: String,
        required: true
      },
      commentDate: {
        type: Number,
        required: true
      }
    }
  }
</script>
