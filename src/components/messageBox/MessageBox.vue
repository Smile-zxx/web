<template>
  <div class="msgbox">
    <p v-show="!this.$store.state.msg.messageList.length > 0">暂无新消息</p>
    <p
      v-for="(item, index) in this.$store.state.msg.messageList"
      :key="item.id"
    >
      <span @click="noticeRoute(item.router, index)"
        >[{{ item.time }}]{{ item.msg }}</span
      >
    </p>
  </div>
</template>

<script>
import { login } from "../../api/user/user";
export default {
  name: "MessageBox",
  methods: {
    noticeRoute(route, index) {
      if (route) this.$router.push(route);
      this.$store.commit("delDessage", index);
    }
  },
  sockets: {
    relogin(val) {
      console.log(val);
    }
  },
  mounted() {
    this.$socket.client.emit("login", localStorage.getItem("UserID"));
  }
};
</script>

<style lang="scss" scoped>
.msgbox {
  width: 350px;
  height: 300px;
  background-color: #ededed;
  overflow: auto;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 10px 10px 20px 10px rgba(0, 0, 0, 0.5);
  p {
    color: #d2691e;
    margin-top: 15px;
    font-size: 18px;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>