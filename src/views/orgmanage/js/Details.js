import {
  getOrgDetails,
  modifyBadicInfo,
  delMember,
  addMember,
  modifyMember
} from "../../../api/orgmanage/orgmanage.js";
import {
  validateAccount,
  validatePass,
  validateName,
  spaceValidate
} from "../../../utils/validator.js"
export default {
  name: "Deatails",
  data() {
    return {
      uploadToken: {
        Authorization: localStorage.getItem("token")
      },
      currentDate: new Date(),
      doc: {
        count: 10,
        searchRule: {
          Name: "",
          DepartmentIName: ""
        },
        currentPage: 1,
        pageSize: 5,
        addDialogVisible: false,
        addDialog: {
          Name: "",
          UserID: "",
          Password: "",
          DepartmentIName: ""
        },
        delDialogVisible: false,
        modifyDialogVisible: false,
        modifyDialog: {
          Name: "",
          UserID: "",
          Password: "",
          DepartmentIName: ""
        },
        targetRow: {}
      },
      nur: {
        searchRule: {
          name: "",
          department: ""
        },
        addDialogVisible: false,
        addDialog: {
          Name: "",
          UserID: "",
          Password: "",
          DepartmentIName: "脑科"
        },
        delDialogVisible: false,
        modifyDialogVisible: false,
        modifyDialog: {
          Name: "",
          UserID: "",
          Password: "",
          DepartmentIName: "脑科"
        },
        targetRow: {},
        count: 10
      },
      HospitalID: "",
      activeName: "second",
      orgInfo: {
        HospitalOrgDetails: {
          HospitalName: "",
          HospitalLeve: "",
          HospitalType: "",
          Address: "",
          ContactPhone: "",
          Image: ""
        },
        HospitalIntroduction: ``,
        Doctor: [],
        Nurse: []
      },
      rule1: {
        Name: [{ validator: validateName, trigger: "blur" }],
        Password: [{ validator: validatePass, trigger: "blur" }],
        UserID: [{ validator: validateAccount, trigger: "blur" }]
      },
      rules2: {
        Password: [{ validator: validatePass, trigger: "blur" }]
      },
      rules3: {
        HospitalName: [{ validator: spaceValidate, trigger: "blur" }],
        HospitalLeve: [{ validator: spaceValidate, trigger: "blur" }],
        HospitalType: [{ validator: spaceValidate, trigger: "blur" }],
        Address: [{ validator: spaceValidate, trigger: "blur" }],
        ContactPhone: [{ validator: spaceValidate, trigger: "blur" }]
      }
    };
  },
  computed: {
    docShowTable: function () {
      let result = [];
      let departmentList = [];
      this.orgInfo.Doctor.forEach(data => {
        if (
          (!this.doc.searchRule.Name ||
            data.Name == this.doc.searchRule.Name)
        ) {
          result.push(data);
        }
      });
      return { result: result, departmentList: departmentList };
    },
    nurShowTable: function () {
      let result = [];
      let departmentList = [];
      this.orgInfo.Nurse.forEach(data => {
        if (
          (!this.nur.searchRule.Name ||
            data.Name == this.nur.searchRule.Name)
        ) {
          result.push(data);
        }
      });
      return { result: result, departmentList: departmentList };
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      this.orgInfo.HospitalOrgDetails.Image = "http://" + res.url;
    },
    HospitalOrgDetails() {
      this.$refs.introduction.validate((valid) => {
        if (valid) {
          this.orgInfo.HospitalOrgDetails.HospitalIntroduction = this.orgInfo.HospitalIntroduction;
          modifyBadicInfo(this.HospitalID, this.orgInfo.HospitalOrgDetails);
        } else {

          return false;
        }
      });


    },
    docReSet() {
      this.doc.searchRule.Name = "";
      this.doc.searchRule.DepartmentIName = "";
    },
    addDoctor() {
      this.$refs.docAddDialog.validate(valid => {
        if (valid) {
          let obj = this.doc.addDialog;
          obj.RoleName = "医生";
          addMember(this.HospitalID, obj).then(res => {
            if (res) {
              this.orgInfo.Doctor.push(obj);
            }
          });
          this.doc.addDialogVisible = false;
        } else {
          this.$message.error("请按照格式输入！")
        }
      })

    },
    delDoctor(data) {
      this.doc.delDialogVisible = true;
      this.doc.targetRow = data;
    },
    //缺认删除医师
    confirmDocDel() {
      delMember(this.HospitalID, this.doc.targetRow.UserID).then(res => {
        if (res) {
          this.orgInfo.Doctor.forEach((item, index) => {
            if (item.UserID == this.doc.targetRow.UserID) {
              this.orgInfo.Doctor.splice(index, 1);
            }
          });
        }
      });
      this.doc.delDialogVisible = false;
    },
    modifyDoctor(data) {
      this.doc.modifyDialogVisible = true;
      this.doc.targetRow = data;
      this.doc.modifyDialog.Name = data.Name;
      this.doc.modifyDialog.UserID = data.UserID;
      this.doc.modifyDialog.Password = "";
    },
    //医生修改确认
    confirmDocmodify() {

      this.$refs.docModifyDialog.validate(valid => {
        if (valid) {
          modifyMember(this.doc.modifyDialog);
          this.doc.modifyDialogVisible = false;
        } else {
          this.$message.error("请按照格式输入！")
        }
      })


    },
    nurReSet() {
      this.nur.searchRule.Name = "";
      this.nur.searchRule.DepartmentIName = "";
      this.nur.count = 10;
    },
    addNurShowCount() {
      this.nur.count += 10;
    },
    addNurse() {
      this.$refs.nurAddDialog.validate(valid => {
        if (valid) {
          let obj = this.nur.addDialog;
          obj.RoleName = "护士";
          this.nur.addDialogVisible = false;
          addMember(this.HospitalID, obj).then(res => {
            if (res) {
              this.orgInfo.Nurse.push(obj);
            }
          });
        } else {
          this.$message.error("请按照格式输入！")
        }
      })




    },
    delNurse(data) {
      this.nur.delDialogVisible = true;
      this.nur.targetRow = data;
    },
    // 缺认删除护士
    confirmNusDel() {
      delMember(this.HospitalID, this.nur.targetRow.UserID).then(res => {
        if (res) {
          this.orgInfo.Nurse.forEach((item, index) => {
            if (item.UserID == this.nur.targetRow.UserID) {
              this.orgInfo.Nurse.splice(index, 1);
            }
          });
        }
      });
      this.nur.delDialogVisible = false;
    },
    modifyNurse(data) {
      this.nur.modifyDialogVisible = true;
      this.nur.targetRow = data;
      // this.nur.modifyDialog = data;
      this.nur.modifyDialog.Name = data.Name;
      this.nur.modifyDialog.UserID = data.UserID;
      this.nur.modifyDialog.Password = "";
    },
    confirmNurmodify() {
      this.$refs.nurModifyDialog.validate(valid => {
        if (valid) {
          modifyMember(this.nur.modifyDialog);
          this.nur.modifyDialogVisible = false;
        } else {
          this.$message.error("请按照格式输入！")
        }
      })


    }
  },
  mounted() {
    let HospitalID = localStorage.getItem("HospitalID");
    this.HospitalID = HospitalID;
    getOrgDetails(HospitalID).then(res => {
      console.log(res);
      this.orgInfo = res;
      console.log(res);
    });
  }
};