import { getBasicInfo, changeBasicInfo } from "../../../api/user/user.js";
export default {
  name: "More",
  data() {
    return {
      uploadToken: {
        Authorization: localStorage.getItem("token")
      },
      activeNames: ["基本信息", "教育经历", "工作经历", "科研经历", "教学经历"],
      formData: {
        basicInfo: {
          Portrait: "",
          Name: "",
          Gender: "",
          Birthday: "",
          Address: "",
          Job: "",
          Post:"",
          Tel: ""
        },
        exp: []
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.formData.basicInfo.Portrait = "http://" + res.url;
      console.log(res.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    save() {
      changeBasicInfo(this.formData);
    }
  },
  mounted() {
    getBasicInfo().then(res => {
      this.formData.basicInfo = res.basicInfo;
      this.formData.exp = res.exp;
    });
  }
};

