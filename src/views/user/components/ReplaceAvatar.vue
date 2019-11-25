<template>
  <vs-popup
    class="avatar-popup"
    title="更换头像"
    :active.sync="showPopup"
  >
    <div>
      <div class="text-center">
        <vueCropper
          ref="cropper"
          style="width: 300px; height: 300px;"
          outputType="jpeg"
          :outputSize="0.8"
          :canMove="false"
          :canMoveBox="true"
          :canScale="true"
          :autoCrop="true"
          :centerBox="true"
          :fixed="true"
          :infoTrue="true"
          :img="img"
        ></vueCropper>
        <vs-button
          class="w-full mt-4"
          @click="onReplace()"
        >确认更换</vs-button>
      </div>
    </div>
  </vs-popup>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'ReplaceAvatar',
  components: { VueCropper },

  props: {
    popupActive: {
      type: Boolean,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },

  watch: {
    popupActive(active) {
      if (active) {
        this.showPopup = true
      }
    },
  },

  computed: {
    showPopup: {
      get() {
        return this.popupActive
      },
      set(active) {
        if (!active) {
          this.$emit('closePopup')
        }
      },
    },
  },

  methods: {
    onReplace() {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-popup::v-deep {
  .vs-popup {
    width: initial;
    .vs-popup--content {
      margin: 10px 0;
    }
  }
}
</style>
