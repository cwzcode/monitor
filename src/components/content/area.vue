<template>
  <div>
    <span style="float: right;">{{$store.state.project_activeInfo.project_name}} - {{$store.state.area_activeInfo.area_name}}</span>
    <el-row>
      <el-col style="margin-left: 20px;width: 30%" v-for="(roomInfo, k) in $store.state.area_activeInfo.room_info" :key="k">
        <el-card :body-style="{ padding: '0px' }" style="margin-top: 10px;">
          <img class="photo" src="@/assets/images/平面图.jpg" @click="getActiveRoomInfo(k)" />
          <div style="padding: 8px;">
            <!-- <Icon type="md-warning" style="float: right;" size="20" v-bind:class="{ highlight: roomInfo.isError }" /> -->
            <p>{{ roomInfo.room_name }}</p>
            <div class="bottom clearfix"><el-button type="text" class="button" style="float: right;" @click="clickDelectRoom(k)">删除</el-button></div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <Modal v-model="modal_deleteRoom" title="删除当前房间" @on-ok="delectRoom">
      <p>确定要删除{{ $store.state.area_activeInfo.area_name }}-{{ delectRoomName }}这个房间吗？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid: '',
      
      modal_deleteRoom: false,
      delectRoomIndex: 0,
      delectRoomName: '',
    };
  },
  mounted() {
    this.uid = this.$store.state.uid;
  },
  methods: {
    getActiveRoomInfo(roomIndex) {
      this.$router.push('/main/room').catch(err => {
        err;
      });
      this.$store.commit('setRoom_activeInfo', roomIndex);
    },
    clickDelectRoom(roomIndex) {
      this.modal_deleteRoom = true;
      this.delectRoomIndex = roomIndex;
      this.delectRoomName = this.$store.state.area_activeInfo.room_info[this.delectRoomIndex].room_name
    },
    delectRoom() {
      let delectRoomId = this.$store.state.area_activeInfo.room_info[this.delectRoomIndex].room_id;
      this.$get('/DeleteRoomServlet', {
        // uid: this.uid,
        uid: 19,
        cid: delectRoomId,
      }).then(response => {
        console.log(response);
        // this.area_name = '';
        this.$get('/QueryProjectServlet', {
          // uid: this.$store.state.uid,
          uid: this.uid
        }).then(res => {
          let projectIndex = this.$store.state.active_projectIndex
          let areaIndex = this.$store.state.active_areaIndex
          this.$store.commit('queryChangeProject', res.project);
          this.$store.commit('setProject_activeInfo', projectIndex);
          this.$store.commit('setArea_activeInfo', areaIndex);
        });
        this.$message({
          message: '删除房间成功',
          type: 'success'
        });
      });
    }
  }
};
</script>

<style>
.photo {
  width: 100%;
  height: 150px;
  display: block;
}

.button {
  padding: 0;
  float: right;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}

.clearfix:after {
  clear: both;
}
</style>
