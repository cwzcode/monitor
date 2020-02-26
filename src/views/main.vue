<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="用户信息">
          <div class="layout-logo">物联网平台</div>
          <div class="layout-nav">
            <MenuItem name="用户信息">
              <Icon type="ios-analytics"></Icon>
              用户信息
            </MenuItem>
            <MenuItem name="退出登录" @click.native="backToLogin">
              <Icon type="ios-paper"></Icon>
              退出登录
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout style="height:calc(100vh - 64px)">
        <Sider hide-trigger :style="{ background: '#fff' }">
          <Menu ref="side_menu" :active-name="0 - 0" :open-names="[0]" theme="light" width="auto" v-for="(projectInfo, n) in $store.state.project" :key="n">
            <Submenu :name="n" :key="n">
              <template slot="title">
                <Icon type="md-school"></Icon>
                {{ projectInfo.project_name }}
              </template>
              <MenuItem v-for="(areaInfo, i) in projectInfo.area_info" :key="i" :name="n - i" @click.native="getAreaInfo(n, i)">{{ areaInfo.area_name }}</MenuItem>
              <MenuItem class="el-icon-remove" name="icon_remove" @click.native="clickDeleteProject(n)"></MenuItem>
            </Submenu>
          </Menu>
        </Sider>

        <Modal v-model="button_deleteProject" title="删除项目" @on-ok="deleteProject">
          <p>确定要删除{{ $store.state.project_activeInfo.project_name }} 这个项目吗？</p>
        </Modal>

        <Layout :style="{ padding: '0 15px 15px' }">
          <Breadcrumb :style="{ margin: '8px 0' }">
            <select-column
              :modal_addProject="modal_addProject"
              :modal_addArea="modal_addArea"
              :modal_addRoom="modal_addRoom"
              :modal_deleteArea="modal_deleteArea"
              @value_addProject="val => (this.modal_addProject = val)"
              @value_addArea="val => (this.modal_addArea = val)"
              @value_addRoom="val => (this.modal_addRoom = val)"
              @value_deleteArea="val => (this.modal_deleteArea = val)"
            >
              <Button type="text" @click="modal_addProject = true" slot="addProject">
                新建项目
                <Icon type="md-add" />
              </Button>
              <Button type="text" @click="modal_addArea = true" slot="addArea">
                新建区域
                <Icon type="md-add" />
              </Button>
              <Button type="text" @click="modal_addRoom = true" slot="addRoom">
                新建房间
                <Icon type="md-add" />
              </Button>
              <Button type="text" @click="modal_deleteArea = true" slot="deleteArea">
                删除当前区域
                <Icon type="md-remove" />
              </Button>
            </select-column>
          </Breadcrumb>
          <Content :style="{ padding: '15px', background: '#fff' }"><router-view></router-view></Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import selectColumn from '@/components/content/selectColumn.vue';

export default {
  data() {
    return {
      uid: '',
      modal_addProject: false,
      button_deleteProject: false,
      modal_addArea: false,
      modal_addRoom: false,
      modal_deleteArea: false,
      deleteProjectId: ''
    };
  },
  computed: {},
  watch: {
    openNames() {
    }
  },
  components: {
    selectColumn
  },
  mounted() {
    this.uid = this.$store.state.uid;

    this.$get('/QueryProjectServlet', {
      uid: this.uid
    }).then(response => {
      this.$store.commit('queryChangeProject', response.project);
      if(response.project.length){
        this.$store.commit('setProject_activeInfo', 0);
        if(response.project[0].area_info.length){
          this.$store.commit('setArea_activeInfo', 0);
          this.$router.push('/main/area').catch(err => {
            err;
          });
        }
      }
    });

  },
  methods: {
    backToLogin() {
      this.$get('/LogoutServlet', {
        uid: this.uid
      }).then(response => {
        // console.log(response)
        if (response.state === 'logout success') {
          this.$Notice.success({
            title: '退出登录成功'
          });
          this.$router.push('/user/signIn').catch(err => {
            err;
          });
          this.$store.commit('clearUid');
          // this.$cookies.remove('uid');
        } else {
          this.$Notice.error({
            title: '退出登录失败'
          });
        }
      });
    },
    getAreaInfo(projectIndex, areaIndex) {
      this.$store.commit('setProject_activeInfo', projectIndex);
      this.$store.commit('setArea_activeInfo', areaIndex);
    },
    clickDeleteProject(index){
      this.button_deleteProject = true
      let project = this.$store.state.project;
      this.deleteProjectId = project[index].project_id;
      this.$store.commit('setProject_activeInfo', index);
    },
    deleteProject() {
      this.$get('/DeleteProjectServlet', {
        uid: this.uid,
        sid: this.deleteProjectId
      }).then(response => {
        console.log(response);
        // this.selectAreaInfo = '';
        // this.selectRoomInfo = '';
        this.$get('/QueryProjectServlet', {
          uid: this.uid
        }).then(res => {
          this.$store.commit('queryChangeProject', res.project);
          // console.log(JSON.stringify(this.$store.state.project))
        });
        this.$message('删除项目成功');
      });
    }
  }
};
</script>

<style>
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  color: #ffffff;
  line-height: 30px;
  font-size: 20px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 500px;
  margin: 0 auto;
  margin-left: 80%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
.highlight {
  animation: myfirst 1s;
  animation-iteration-count: infinite;
}
@-webkit-keyframes myfirst {
  0% {
    color: #a00000;
  }
  50% {
    color: #5e5e5e;
  }
  100% {
    color: #a00000;
  }
}
.stateNormal {
  color: #306c14;
}
.stateError {
  color: #a00000;
}
</style>
