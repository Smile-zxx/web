
import { getOrgInfo, addOrgInfo } from "../../../api/orgmanage/orgmanage.js";
export default {
  computed: {
    showList: function() {
      let list = [];
      let classList = [];
      this.listInfo.forEach(element => {
        if (classList.indexOf(element.HospitalLeve) == -1) {
          classList.push(element.HospitalLeve);
        }
        if (
          (!this.search.HospitalName ||
            element.HospitalName == this.search.HospitalName) &&
          (!this.search.HospitalLeve ||
            element.HospitalLeve == this.search.HospitalLeve)
        ) {
          list.push(element);
        }
      });
      return { list: list, classList: classList };
    }
  },
  data() {
    return {
      addOrgDialogVisible: false,
      search: {
        HospitalName: "",
        HospitalLeve: ""
      },
      listInfo: [],
      newOrganization: {
        HospitalName: "",
        HospitalLeve: "",
        HospitalType: "",
        HospitalIntroduction: "",
        ContactPhone: "",
        Address: "",
        Image: ""
      }
    };
  },

  methods: {
    reset() {
      this.search.HospitalName = "";
      this.search.HospitalLeve = "";
    },
    details(HospitalID) {
      localStorage.setItem("HospitalID", HospitalID);
      this.$router.push("/organizationmanage/orgdetails");
    },
    addOrgGroup() {
      addOrgInfo(this.newOrganization);
      this.addOrgDialogVisible = false;
    }
  },
  mounted() {
    getOrgInfo().then(res => {
      this.listInfo = res;
      console.log(res)
    });
  }
};