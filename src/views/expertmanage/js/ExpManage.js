import {
  getExpertGroupInfo,
  addExperGroupInfo
} from "../../../api/expertmanage/expertmanage.js";
export default {
  name: "ExpManage",
  computed: {
    showTable: function () {
      let list = [];
      this.listInfo.forEach(element => {
        if (
          !this.search.ExpertName ||
          element.ExpertName.includes(this.search.ExpertName)
        ) {
          list.push(element);
        }
      });
      return list;
    }
  },
  data() {
    return {
      search: {
        ExpertName: ""
      },
      listInfo: [
        {
          ExpertImage: "",
          ExpertName: "",
          ExpertSpecialty:
            "",
          ExpertIntroduction:
            "",
          ExpertID: ""
        }
      ],
      addExpertGroupDialogVisible: false,
      ExpertGroupDialog: {
        ExpertName: ""
      }
    };
  },
  methods: {
    reset() {
      this.search.ExpertName = "";
    },
    details(data) {
      console.log(data)
      localStorage.setItem("ExpertID", data.ExpertID)
      this.$router.push("/expertmanage/details");
    },
    addExpGroup() { }
  },
  mounted() {
    getExpertGroupInfo().then(res => {
      this.listInfo = res
      console.log(res)
    });
  }
};