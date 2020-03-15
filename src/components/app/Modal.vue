<template>
  <div class="modal fade" :id="modalId" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ modalTitle }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" ref="closeBtn">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      modalId: {
        type: String,
        required: true
      },
      modalTitle: {
        type: String,
        required: true
      },
      isNeedToClose: Boolean
    },
    watch: {
      isNeedToClose(value) {
        if (value) {
          this.$refs.closeBtn.click()
        }
      }
    }
  }
</script>
