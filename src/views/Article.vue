<template>
  <div>
    <Loader v-if="loading"/>
    <div v-else-if="article">
      <h1>{{ article.name }}</h1>
      <div class="d-flex justify-content-center mb-2">
        <img :src="article.img" :alt="article.name">
      </div>
      <p class="lead">
        {{ article.description }}
      </p>
    </div>

    <mini-loader
      v-if="!loading && !showCommentBlock"
    />

    <div class="comments" v-if="showCommentBlock">
      <h2>Holy war</h2>
      <p class="lead text-secondary" v-if="!comments">
        No comments... Be the first to add him
      </p>
      <comment
        v-else
        v-for="(comment, index) in comments"
        :id="index + newComments"
        :userName="comment.userName"
        :userComment="comment.userComment"
        :commentDate="comment.commentDate"
      />
      <comment-form
        v-if="isAuthenticated"
        :userName="userName"
        :hasModal="hasCommentFormModal"
        @commentAdd="commentAddHandler"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Loader from '@/components/app/Loader'
  import MiniLoader from '@/components/app/MiniLoader'
  import Comment from '@/components/Comment'
  import CommentForm from '@/components/CommentForm'

  export default {
    name: 'Article',
    metaInfo: {
      title: 'Main article',
    },
    data() {
      return {
        loading: true,
        newComments: 0,
        article: null,
        comments: null,
        showCommentBlock: false,
        hasCommentFormModal: false
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'userName'])
    },
    async mounted() {
      this.article = await this.getArticle()
      this.loading = false
      this.comments = await this.getComments()
      this.showCommentBlock = true
    },
    methods: {
      ...mapActions(['getArticle', 'getComments']),
      commentAddHandler(commentData) {
        this.comments.push(commentData)
      }
    },
    components: {
      Loader,
      MiniLoader,
      Comment,
      CommentForm
    }
  }
</script>
