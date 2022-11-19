import {
  getExpertDetails,
  modifyBadicInfo,
  addMember,
  delMember,
  modifyMember
} from "../../../api/expertmanage/expertmanage.js";
import {
  validateAccount,
  validatePass,
  validateName,
  spaceValidate,

} from "../../../utils/validator.js"
export default {
  name: "Deatails",
  data() {
    return {
      uploadToken: {
        Authorization: localStorage.getItem("token")
      },
      ExpertID: "",
      exp: {
        count: 10,
        searchRule: {
          Name: "",
          department: ""
        },
        addDialogVisible: false,
        addDialog: {
          Name: "",
          UserID: "",
          Password: "",
          department: "",
          Research: ""
        },
        delDialogVisible: false,
        modifyDialogVisible: false,
        modifyDialog: {
          Name: "",
          UserID: "",
          Password: "",
          department: ""
        },
        targetRow: {}
      },
      activeName: "first",
      expertGroupInfo: {
        expertdetails: {
          ExpertImage: "",
          ExpertName: "",
          ExpertSpecialty: "",
          ExpertIntroduction:
            "",
          ExpertID: "",
          ExpertTel: ""
        },
        TeamDoctor: [
          {
            Name: "",
            ID: "",
            Image: "",
            department: ""
          }
        ]
      },
      rules: {
        Name: [{ validator: validateName, trigger: "blur" }],
        Password: [{ validator: validatePass, trigger: "blur" }],
        UserID: [{ validator: validateAccount, trigger: "blur" }]
      },
      rules2: {
        Password: [{ validator: validatePass, trigger: "blur" }]
      },
      rules3: {
        ExpertName: [{ validator: spaceValidate, trigger: "blur" }],
        ExpertTel: [{ validator: spaceValidate, trigger: "blur" }],
        ExpertSpecialty: [{ validator: spaceValidate, trigger: "blur" }],
      },
    };
  },
  computed: {
    expShowTable: function () {
      let result = [];
      let departmentList = [];
      if (this.expertGroupInfo.TeamDoctor.length > 0) {
        this.expertGroupInfo.TeamDoctor.forEach(data => {
          if (departmentList.indexOf(data.department) == -1) {
            departmentList.push(data.department);
          }
          if (
            (!this.exp.searchRule.Name ||
              data.Name.includes(this.exp.searchRule.Name)) &&
            (!this.exp.searchRule.department ||
              data.department == this.exp.searchRule.department)
          ) {
            result.push(data);
          }
        });
      } else {
        this.expertGroupInfo.TeamDoctor = []
      }
      return { result: result, departmentList: departmentList };
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.expertGroupInfo.expertdetails.ExpertImage = "http://" + res.url;
    },
    expReSet() {
      this.exp.searchRule.Name = "";
      this.exp.searchRule.department = "";
    },
    basicInfo() {
      this.$refs.introduction.validate((valid) => {
        if (valid) {
          modifyBadicInfo(this.ExpertID, this.expertGroupInfo.expertdetails);
        }
      });

    },

    addExpert() {
      let obj = this.exp.addDialog;
      obj.RoleName = "专家";
      this.$refs.addDialog.validate(valid => {
        if (valid) {
          addMember(this.ExpertID, obj).then(res => {
            if (res) {
              this.expertGroupInfo.TeamDoctor.push(obj);
              this.exp.addDialogVisible = false;
            }
          });
        } else {
          this.$message.error("请按照格式输入！")
        }
        console.log(valid)
      })

    },
    delExpert(data) {
      this.exp.delDialogVisible = true;
      this.exp.targetRow = data;
    },
    //确认删除医师
    confirmExpDel() {
      console.log(this.ExpertID, this.exp.targetRow.UserID)
      delMember(this.ExpertID, this.exp.targetRow.UserID).then(res => {
        if (res) {
          this.expertGroupInfo.TeamDoctor.forEach((item, index) => {
            if (item.UserID == this.exp.targetRow.UserID) {
              this.expertGroupInfo.TeamDoctor.splice(index, 1);
            }
          });
        }
      });
      this.exp.delDialogVisible = false;
    },
    modifyExpert(data) {
      this.exp.modifyDialogVisible = true;
      console.log(data)
      console.log(this.exp.modifyDialog)

      this.exp.targetRow = data;
      this.exp.modifyDialog.Name = data.Name;
      this.exp.modifyDialog.UserID = data.UserID;
      this.exp.modifyDialog.Password = ""
    },
    //专家修改确认
    confirmExpmodify() {
      this.$refs.modifyDialog.validate(valid => {
        if (valid) {
          modifyMember(this.exp.modifyDialog);
          this.exp.modifyDialogVisible = false;

        } else {
          this.$message.error("请按照格式输入！")

        }
      })

    },
    test() {
      getExpertDetails(this.ExpertID).then(res => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.ExpertID = localStorage.getItem("ExpertID");
    console.log(this.ExpertID)
    getExpertDetails(this.ExpertID).then(res => {
      console.log(res)
      this.expertGroupInfo = res;
    });
  }
};