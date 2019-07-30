<template>
  <transition name="fade">
    <div class="wrap" v-if="show">
      <div class="music-bar">
        <div class="left">
          <div class="tu">
            <div
              class="plays"
              @click="selects(voliceList[test].id, voliceList)"
            >
              <template
                v-if="
                  voliceList[test].id == audioData.currentVoiceId &&
                    audioData.playStatus == 'playing'
                "
                ><img src="../assets/playing.gif" />
              </template>
              <template v-else>
                <img src="../assets/pause.png" />
              </template>
            </div>
          </div>
        </div>
        <div class="right">
          <p class="title">{{ "语音" + voliceList[test].id }}</p>
          <div class="main-wrap">
            <div
              class="main-bar"
              v-if="voliceList[test].id != audioData.currentVoiceId"
            >
              <em>0:00</em>
              <div class="main-progress">
                <em class="yellow-line" :style="{ width: 0 + '%' }"></em>
              </div>
              <em>0:00</em>
            </div>
            <div class="main-bar" v-else>
              <em>{{ audioData.playerInfo.currentTime | formatSeconds }}</em>
              <div
                class="main-progress"
                @touchstart="touchStart($event)"
                @touchmove="touchMove($event)"
              >
                <em
                  class="yellow-line"
                  :style="{ width: currentProgress + '%' }"
                ></em>
              </div>
              <em>{{ audioData.playerInfo.durationTime | formatSeconds }}</em>
            </div>
          </div>
        </div>
      </div>
      <div class="closeBtn" @click="close">关闭</div>
    </div>
  </transition>
</template>

<script>
import eventBus from "@/eventBus";
export default {
  // 传入参数
  // 1. 显示参数
  // 2. 播放audioData
  // 3. 如果播放列表在组件内部则需要传入播放的index，如果没有则，传voliceList
  components: {},
  props: {
    test: {
      type: Number,
      default() {
        return 0;
      }
    },
    waiList: {
      type: Array,
      default() {
        return [];
      }
    },
    show: {
      type: Boolean,
      default() {
        return false;
      }
    },
    audioData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      touch: null,
      percent: 0,
      voliceList: [
        {
          audioUrl:
            "https://mimi-003.oss-cn-hangzhou.aliyuncs.com/1561026714892-csqh4x7q.mp3",
          id: "37"
        },
        {
          audioUrl:
            "https://xdlx.365daoyou.cn/nanchang/e42aba4b-8d83-4ee7-bfbd-b5414444280c4670748074687435743.mp3",
          id: "10"
        }
      ]
    };
  },
  computed: {
    currentProgress() {
      // 进度条
      let temp =
        Math.floor(
          (this.audioData.playerInfo.currentTime /
            this.audioData.playerInfo.durationTime) *
            10000
        ) / 100;
      if (isNaN(temp)) {
        temp = 0;
      }
      return temp;
    }
  },
  methods: {
    selects(id, list) {
      if (
        this.audioData.playStatus == "playing" &&
        this.voliceList[this.test].id == this.audioData.currentVoiceId
      ) {
        eventBus.$emit("pause");
      } else {
        eventBus.$emit("selectVoice", { id, list });
      }
    },
    close() {
      this.$emit("update:show", false);
    },
    touchStart(event) {
      let precent = 0;
      this.touch = {
        stratX: 0,
        endX: 0,
        distance: 0
      };
      this.touch.stratX =
        event.target.offsetParent.offsetLeft +
        event.target.offsetParent.offsetParent.offsetLeft;
      this.touch.endX = event.touches[0].clientX;
      this.touch.distance = this.touch.endX - this.touch.stratX;
      precent = this.touch.distance / event.target.offsetParent.offsetWidth;
      if (this.touch.distance <= 0) {
        precent = 0;
      } else if (precent >= 1) {
        precent = 1;
      }
      // 设置播放器的播放时间
      // this.player.setCurrentTime(precent)
      eventBus.$emit("setCurrentTime", precent);
    },
    touchMove(event) {
      let precent = 0;
      this.touch.endX = event.touches[0].clientX;
      this.touch.distance = this.touch.endX - this.touch.stratX;
      console.log(this.touch.distance);
      precent = this.touch.distance / event.target.offsetParent.offsetWidth;
      if (this.touch.distance <= 0) {
        // 太小置于最左边
        precent = 0;
      } else if (precent >= 1) {
        // 太大置于最右边
        precent = 100;
      }
      // 设置播放器的播放时间
      // this.player.setCurrentTime(precent)
      eventBus.$emit("setCurrentTime", precent);
    }
  },
  created() {},
  mounted() {
    if (this.waiList.length != 0) {
      // 外部没传进播放列表则不需要覆盖本组件的voliceList
      this.voliceList = this.waiList;
    } else {
      // 走组件请求voliceList
    }
  }
};
</script>
<style lang="less" scoped>
.closeBtn {
  border: 1px solid #ccc;
  font-size: 0.15rem;
  display: block;
  width: 50%;
  text-align: center;
  margin: 0 auto;
  height: 0.5rem;
  line-height: 0.5rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 0.15rem;
}
.music-bar {
  position: relative;
  display: flex;
  display: -webkit-flex;
  font-size: 0.16rem;
  height: 1rem;
  padding: 0.05rem;
  box-sizing: border-box;
  background: #e7393c;
  .left {
    width: 1rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    .tu {
      width: 0.8rem;
      height: 0.8rem;
      background: #000;
      border-radius: 50%;
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;
      .plays {
        background: rgba(255, 255, 255, 0.7);
        width: 0.7rem;
        border-radius: 50%;
        height: 0.7rem;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        img {
          width: 50%;
        }
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      margin: 0.05rem 0 0.05rem 0.1rem;
    }
    .main-bar {
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      align-items: center;
      em {
        font-size: 0.14rem;
        font-style: normal;
        display: block;
        width: 0.5rem;
        text-align: center;
      }
      .main-progress {
        flex: 1;
        height: 0.05rem;
        border-radius: 15px;
        background: #fff;
        position: relative;
        .yellow-line {
          width: 100%;
          // margin-top: -0.01rem;
          position: absolute;
          height: 100%;
          background-color: #3f85e7;
          border-radius: 0.08rem;
          transition: none !important;
          &::after {
            content: "";
            position: absolute;
            width: 0.16rem;
            height: 0.16rem;
            right: -0.08rem;
            top: 0.02rem;
            margin-left: -0.1rem;
            margin-top: -0.08rem;
            z-index: 4;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            border-radius: 100%;
            background: #ffffff;
            box-shadow: 0 0 0.02rem 0 rgba(0, 0, 0, 0.2);
            transition: none !important;
          }
        }
      }
    }
  }
}
.wrap {
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter,
.fade-leave-to {
  transform: translateY(100%);
}
</style>
