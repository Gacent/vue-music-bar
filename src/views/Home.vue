<template>
  <div class="home">
    <PlayBar :audioData="audioData" />
    <div class="musicBtn" @click="recodes(0)">内部录音1</div>
    <div class="musicBtn" @click="recodes(1)">内部录音2</div>
    <Detail :show.sync="www" :audioData="audioData" :test="test" />
    <div class="voiceList">
      <li
        v-for="item in voliceList"
        :key="item.id"
        @click="selectVoice(item.id, voliceList)"
      >
        <p
          class="voiceItem"
          :class="{ actived: audioData.currentVoiceId == item.id }"
        >
          语音{{ item.id }}
        </p>
      </li>
    </div>
    <audio v-show="false" src="" ref="audio"></audio>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Detail from "@/components/Detail.vue";
import PlayBar from "@/components/PlayBar.vue";
import eventBus from "@/eventBus";
export default {
  name: "home",
  components: {
    PlayBar,
    Detail
  },
  watch: {
    "audioData.playStatus"() {
      // 监听audioData播放状态，如果没有id和url就置为stop
      if (
        (this.audioData.currentVoiceId == 0 ||
          this.audioData.currentVoiceId == undefined) &&
        !this.audioData.url
      ) {
        this.audioData.playStatus = "stop";
      }
    }
  },
  data() {
    return {
      test: 0,
      audioData: {
        url: null,
        currentVoiceId: 0,
        playStatus: "stop",
        playerInfo: {
          // 播放信息
          currentTime: 0,
          durationTime: 0
        }
      },
      www: false,
      voliceList: [
        {
          audioUrl:
            "https://mimi-003.oss-cn-hangzhou.aliyuncs.com/1561026714892-csqh4x7q.mp3",
          id: "38"
        },
        {
          audioUrl:
            "https://xdlx.365daoyou.cn/nanchang/e42aba4b-8d83-4ee7-bfbd-b5414444280c4670748074687435743.mp3",
          id: "17"
        },
        {
          audioUrl:
            "https://xdlx.365daoyou.cn/nanchang/d67bdad1-8736-4fd9-a6c0-b9ec85eabc956278096273620462341.mp3",
          id: "18"
        }
      ]
    };
  },
  mounted() {
    let $audio = this.$refs.audio;
    $audio.addEventListener(
      "timeupdate",
      () => {
        console.log("timeupdate");
        audioPlaying(this.audioData, "playing");
      },
      true
    ); // 播放时间变化时更改播放按钮显示状态
    $audio.addEventListener(
      "waiting",
      () => {
        console.log("waiting");
        audioPlaying(this.audioData, "waiting");
      },
      true
    ); // 监控缓冲时更改播放按钮显示状态
    $audio.addEventListener(
      "pause",
      () => {
        console.log("pause");
        audioPlaying(this.audioData, "pause");
      },
      true
    ); // 音频结束时更改播放按钮显示状态
    $audio.addEventListener("ended", () => {
      console.log("ended");
      audioPlaying(this.audioData, "ended");
    }); // 音频结束时更改播放按钮显示状态
    $audio.addEventListener(
      "error",
      () => {
        console.log("error");
      },
      true
    ); // 音频结束时更改播放按钮显示状态
    function audioPlaying(audio, status) {
      audio.playStatus = status;
      if (status == "ended") {
        audio.currentVoiceId = null;
        audio.playerInfo.currentTime = 0;
        audio.playerInfo.durationTime = $audio.duration;
      } else {
        audio.playerInfo.currentTime = $audio.currentTime;
        audio.playerInfo.durationTime = $audio.duration;
      }
    }
    // 选择播放列表后播放
    eventBus.$on("selectVoice", options => {
      if (options.id == this.audioData.currentVoiceId) {
        this.$refs.audio.play();
      } else {
        this.audioData.currentVoiceId = options.id;
        options.list.forEach(item => {
          if (item.id == options.id) {
            this.audioData.url = item.audioUrl;
            this.$refs.audio.src = item.audioUrl;
            this.$refs.audio.play();
            return;
          }
        });
      }
    });
    // 暂停播放
    eventBus.$on("pause", () => {
      this.$refs.audio.pause();
    });
    // 开启播放
    eventBus.$on("play", () => {
      this.$refs.audio.play();
    });
    // 关闭播放
    eventBus.$on("closePlay", () => {
      $audio.src = null;
      this.audioData.url = null;
      this.audioData.currentVoiceId = null;
      this.audioData.playStatus = "stop";
      this.audioData.playerInfo = {
        currentTime: 0,
        durationTime: 0
      };
    });
    // 进度条播放位置
    eventBus.$on("setCurrentTime", precent => {
      // todo
      if (this.audioData.playStatus === "pause") {
        precent && ($audio.currentTime = $audio.duration * precent);
        $audio.play();
      } else if (this.audioData.playStatus === "stop") {
        precent && ($audio.currentTime = $audio.duration * precent);
        $audio.pause();
      } else if (this.audioData.playStatus === "playing") {
        precent && ($audio.currentTime = $audio.duration * precent);
        $audio.play();
      } else {
        return false;
      }
    });
  },
  methods: {
    recodes(index) {
      this.www = true;
      this.test = index;
    },
    selectVoice(id, list) {
      eventBus.$emit("selectVoice", {
        id: id,
        list: list
      });
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  padding: 1px;
}
.musicBtn {
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
.voiceList {
  font-size: 0.14rem;
  .voiceItem {
    text-align: center;
    border: 1px solid #ccc;
    background: #eee;
    padding: 0.1rem 0;
    border-radius: 15px;
    margin-bottom: 0.1rem;
    &.actived {
      background: #e7393c;
      color: #fff;
    }
  }
}
ul,
li {
  font-size: 0.14rem;
  list-style: none;
}
</style>
