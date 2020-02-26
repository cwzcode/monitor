import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  state:{
    uid: '',

    //项目的总值与活跃值
    project: [],
    project_activeInfo: '',
    active_projectIndex: '',

    //活跃项目的区域总值与活跃值
    area:[],
    area_activeInfo: '',
    active_areaIndex: '',

    //活跃区域的房间总值与活跃值
    room:[],
    room_activeInfo: '',
    active_roomIndex: '',

    //活跃房间的节点总值与活跃值
    node:[],
    node_activeInfo: '',

    viewWidth: '',
  },
  mutations:{
    signChangeUid(state,uid){
      state.uid = uid
    },
    clearUid(state){
      state.uid = ''
    },
    queryChangeProject(state,project){
      state.project = project
    },
    setProject_activeInfo(state,projectIndex){
      state.active_projectIndex = projectIndex
      state.project_activeInfo = state.project[projectIndex]
      // console.log(JSON.stringify(state.project_activeInfo))
    },
    setArea_activeInfo(state,areaIndex){
      state.active_areaIndex = areaIndex
      state.area_activeInfo = state.project_activeInfo.area_info[areaIndex]
      // console.log(JSON.stringify(state.area_activeInfo))
    },
    setRoom_activeInfo(state,roomIndex){
      state.active_roomIndex = roomIndex
      state.room_activeInfo = state.area_activeInfo.room_info[roomIndex]
      // console.log(JSON.stringify(state.room_activeInfo))
    },
    setNode_activeInfo(state,nodeIndex){
      state.node_activeInfo = state.room_activeInfo.node_info[nodeIndex]
      // console.log(JSON.stringify(state.node_activeInfo))
    },
    setViewWidth(state,viewWidth){
      state.viewWidth = viewWidth
    }
  },
  actions:{

  },
  getters:{
    getProjectName(state){
      let project_name = []
      let project = state.project
      for(let i=0; i < project.length; i++){
        project_name.push(project[i].project_name)
      }
      return project_name
    },
  },
  modules:{

  }
})

//3.导出对象
export default store
