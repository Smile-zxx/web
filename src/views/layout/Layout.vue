<template>
  <div class="page">
    <div class="pageContainer">
      <div class="thispage">
        <div class="header">
          <the-header></the-header>
        </div>
        <div class="main">
          <div :class="this.isHide ? 'sideHiden' : 'side'">
            <the-sidebar></the-sidebar>
          </div>
          <div class="content">
            <div class="tag">
              <i
                :class="this.isHide ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
                @click="hide"
              ></i>
              <template v-for="(item, index) in this.path">
                <span :key="item.id" v-if="index == 0">{{ item }}</span>
                <span :key="item.id" v-else>{{ " > " + item }}</span>
              </template>
            </div>
            <div id="mainContent" class="mainContent">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="noticHide ? 'notice noticeUnhide' : 'notice noticeHide'">
      <div>
        <the-msgBox></the-msgBox>
      </div>
    </div>
    <div
      :class="
        noticHide ? 'noticebtn noticebtnHide' : 'noticebtn noticebtnUnhide'
      "
      @click="noticChange"
    >
      <i :class="noticHide ? 'el-icon-caret-left' : 'el-icon-caret-right'"></i>
    </div>
  </div>
</template>

<script>
import Header from "../../components/layout/Header";
import Aside from "../../components/layout/Aside";
import MessageBox from "../../components/messageBox/MessageBox";
export default {
  name: "TheLayout",
  data() {
    return {
      isHide: false,
      noticHide: true,
      path: []
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    hide() {
      this.isHide = !this.isHide;
      this.$store.commit("pageState");
    },
    getBreadcrumb() {
      let matched = this.$route.matched;
      this.path = [];
      matched.forEach((element, index) => {
        if (index === 0) {
          this.path.push("首页");
        } else {
          if (element.name != "/") {
            this.path.push(element.name);
          }
        }
      });
    },
    noticChange() {
      this.noticHide = !this.noticHide;
    }
  },
  components: {
    "the-header": Header,
    "the-sidebar": Aside,
    "the-msgBox": MessageBox
  },
  mounted() {
    this.getBreadcrumb();
  }
};
</script>

<style scoped lang="scss">
.page {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  background-color: #eff3f4;
  overflow: hidden;
  .pageContainer {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  div {
    transition: 0.5s;
  }
  .thispage {
    position: relative;
    height: 100%;
    width: 90%;
    margin: auto;
    overflow: hidden;
    .header {
      width: 100%;
      height: 80px;
      z-index: 100;
    }
    .main {
      width: 100%;
      height: 100%;
      display: flex;
      padding-bottom: 80px;
      .sideHiden {
        height: 100%;
        width: 0px;
        overflow: hidden;
      }
      .side {
        height: 100%;
        width: 240px;
        overflow: hidden;
        flex-shrink: 0;
      }
      .content {
        width: 100%;
        height: 100%;
        background-color: white;
        flex-shrink: 1;
        .tag {
          width: 100%;
          height: 50px;
          background-image: linear-gradient(75deg, #9adfbf, #ffd79d);
          overflow: hidden;
          color: #1c7e7c;
          line-height: 50px;
        }
        .mainContent {
          width: 100%;
          height: calc(100% - 50px);
          overflow-y: auto;
          overflow-x: hidden;
          margin: auto;
        }
        i {
          font-size: 25px;
          margin-right: 20px;
          cursor: pointer;
        }
        span {
          font-size: 25px;
        }
      }
    }
  }
  .notice {
    z-index: 100;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .noticeHide {
    right: 0;
  }
  .noticeUnhide {
    right: -360px;
  }
  .noticebtn {
    z-index: 100;
    position: absolute;
    bottom: 270px;
    height: 40px;
    font-size: 40px;
    cursor: pointer;
    color: #409eff;
  }
  .noticebtnHide {
    right: 10px;
    color: #f56c6c;
  }
  .noticebtnUnhide {
    right: 350px;
    color: #409eff;
  }
}
</style>
