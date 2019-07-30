<template>
  <transition name="fade">
    <div class="playBar" v-if="audioData.currentVoiceId">
      <div class="play-wrap" @click="qiehuan">
        <div class="play-left">
          <template v-if="audioData.playStatus == 'playing'">
            <img src="../assets/playing.gif" />
          </template>
          <template v-else>
            <img src="../assets/pause.png" />
          </template>
        </div>
        <div class="play-right" v-if="audioData.currentVoiceId">
          <p>{{ "语音" + audioData.currentVoiceId }}</p>
        </div>
      </div>
      <div class="close" @click="closeAll">关闭</div>
    </div>
  </transition>
</template>

<script>
import eventBus from "@/eventBus";
export default {
  components: {},
  props: {
    audioData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    qiehuan() {
      if (this.audioData.playStatus == "playing") {
        eventBus.$emit("pause");
      } else {
        eventBus.$emit("play");
      }
    },
    closeAll() {
      eventBus.$emit("closePlay");
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.close {
  margin-right: 0.1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-100%);
}
.playBar {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  height: 0.5rem;
  line-height: 0.5rem;
  border-bottom: 0.01rem solid #ccc;
  font-size: 0.16rem;
  background: #e7393c;
  color: #fff;
  justify-content: space-between;
  .play-wrap {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    .play-left {
      width: 0.3rem;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      margin-left: 0.1rem;
      img {
        width: 100%;
      }
    }
    .play-right {
      margin-left: 0.1rem;
    }
  }
}
</style>
