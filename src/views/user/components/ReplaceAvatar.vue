<template>
  <vs-popup
    class="avatar-popup"
    title="更换头像"
    :active.sync="showPopup"
  >
    <div>
      <div class="flex flex-col justify-center items-center">
        <vueCropper
          ref="cropper"
          style="width: 300px; height: 300px;"
          outputType="jpeg"
          :info="false"
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

        <!-- 警告框 -->
        <div class="w-full">
          <vs-alert
            closable
            close-icon="close"
            color="danger"
            :active.sync="showAlert"
          >
            图片上传失败，请重试！
          </vs-alert>
        </div>

        <vs-button
          id="replaceBtn"
          class="w-full mt-4 vs-con-loading__container"
          :disabled="btnDisable"
          @click="onReplace()"
        >确认更换</vs-button>
      </div>
    </div>
  </vs-popup>
</template>

<script>
import { VueCropper } from 'vue-cropper'

import { replaceAvatar } from '@/request/api/user'

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


  data: () => ({
    btnDisable: false,
    showAlert: false,
  }),

  methods: {
    onReplace() {
      this.$refs.cropper.getCropBlob(async (blob) => {
        const filename = `${Date.now()}.${blob.type.split('/')[1]}`
        const formData = new FormData()
        formData.append('avatar', blob, filename)

        this.$loading(
          async () => {
            this.btnDisable = true

            const { code, data } = await replaceAvatar(formData)
            if (code === 2000) {
              this.$store.commit('user/SET_AVATAR', data.avatar_url)
              this.$vs.notify({
                title: '图片上传成功',
                text: '头像已更换',
                color: 'success',
              })
              this.showPopup = false
            } else if (code === 3000 || code === 4003 || code === 5000) {
              this.showAlert = true
            }
          },
          {
            background: 'primary',
            color: '#fff',
            container: '#replaceBtn',
            scale: 0.45,
          },
          () => { this.btnDisable = false },
          () => { this.showAlert = true },
        )
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
      margin: 0;
      padding: 20px 13px 20px 16px;
    }
  }
}
</style>
