<template>

  <div  class="app-container documentation-container" style="width:100%;height:700px;padding-top:0px;">
    <div class="nav" style="height: 40px;width: 100%;top:-2px;">
    <div class="nav-a" style="width:100%;">
      <ul class="nav-a-ul" style="position: absolute;z-index: 100;width:100%;background: #F0F7FF;border-bottom:1px solid #CDD2D9;">
        <iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
        <li class="nav-a-li" :class="classA == index ? 'active' : '' "  @click="selected(index)"  v-for="(item,index) in configNav">
          <div :to='item.path' class="nav-a-text" @click="showToggle(index)">{{item.name}}</div>
          <ul class="menu_ul" :class="{'active' :index===isShow}"v-if="index==0" :style="{'left':index*90+0+'px'}">
            <iframe src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
            <li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">
              <div class="menu_ul_text" v-on:click="newFile()">新建</div>
            </li>
            <li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">
              <div class="menu_ul_text positionDiv" v-on:click="openFile()">打开</div>
              <!--<input type="file" id="openFile" name="image" class="getImgUrl_file" @change="preview($event)">-->
            </li>
            <li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">
              <div class="menu_ul_text"v-on:click="saveAsFile()">另存为</div>
            </li>
            <li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">
              <div class="menu_ul_text"v-on:click="print()">打印</div>
            </li>
            <li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">
              <div class="menu_ul_text"v-on:click="singleCheck()">单选</div>
            </li>

          </ul>
          <ul class="menu_ul" :class="{'active' :index===isShow}"v-else-if="index==8" :style="{'left':index*66+30+'px'}">
            <iframe src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
            <li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">
              <div class="menu_ul_text positionDiv">图像</div>
              <input type="file" id="insertImg" name="image" class="getImgUrl_file" @change="insertFile($event)">
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
    <!--快捷工具栏-->
    <div class="nav" style="height: 60px;width: 100%;top: 55px;background: #F0F7FF;border-bottom:1px solid #CDD2D9;">
      <div class="nav-a" style="width:100%;">
        <ul class="nav-a-ul" style="position: absolute;z-index: 60;width:100%;background: #F0F7FF;">
          <iframe id="iframe11" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
          <li class="nav-a-li"  v-for="(item,index) in configToolbar">
            <div style="text-align: center;">
              <img class="pic-404__parent" :src='item.icon'  style="width: 50%;height: 20px;">
            </div>
            <div :to='item.path' class="nav-a-text" @click="showToggle(index)" style="height: auto;line-height: inherit">{{item.name}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!--<button v-on:click="newFile()">新建</button>-->
    <!--<input type="file" id="openFile" name="image" class="getImgUrl_file" @change="preview($event)">-->
    <!--<button v-on:click="saveAsFile()">另存为</button>-->
    <!--<button v-on:click="print()">打印</button>-->
    <!--<button v-on:click="singleCheck()">单选</button>-->
    <!--<input type="file" id="insertImg" name="image" class="getImgUrl_file" @change="insertFile($event)">-->
    <div style="width:100%;height:700px;">
      <iframe id="iframe11" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
      <div class="modal" style="position: absolute;top: 0;z-index:150;width:100%;height:100%;left:20%;top:20%;" v-show="isShowModel">
        <div class="modalNav">
          <iframe id="iframe2" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>
          <div class="closeBtn" v-on:click="closeModal()">×</div>
        </div>
        <div class="iframeBox" style="width:860px;height:443px;margin-top:40px;">
          <iframe v-bind:src=hisJspUrl width="860px" height="420px" frameborder="0" scrolling="no" ></iframe>
        </div>

      </div>

      <div class="leftPositionCon">
        <div class="patientInfo">
            <div class="title">患者信息
              <!--<button v-on:click="showModal()">选择患者</button>-->
              <img class="pic-404__parent"  v-on:click="showModal()" src='@/assets/ocx-toolbar/chosePatient.png' style="margin:10px 20px 0px 0px;float: right;">
            </div>
            <div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">姓名：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">性别：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">年龄：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">科室：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">床位：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">病历：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">住院号：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">主治医师：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
              <div style="display: flex;" class="borderBottom">
                <div class="leftTitles borderRight fontPadding">入院日期：</div>
                <div v-if="patientInfo" class="fontPadding">{{patientInfo.PAT_NAME}}</div>
              </div>
            </div>
        </div>
        <div class="emrListBox">
          <div class="title">病历文书
            <!--<button v-on:click="showModal()">选择患者</button>-->
          </div>
          <div style="width: 100%;height: 100%;">
            <div @click="handleExport">
              病历首页
            </div>
            <iframe v-bind:src=emrPatUrl width="100%" height="417px" frameborder="0" scrolling="no"></iframe>
          </div>
        </div>
      </div>
      <object classid="clsid:9BD6DD4F-3784-4C6D-A83A-4B9CA9FF4510" id="preview" width="88%" height="100%"  name="preview" value="transparent" style="position: relative;z-index: 10;top: 118px;left:0%;">	<param name="wmode" value="transparent">
      </object>
    </div>
    <!--<el-button  size="mini" @click="handleExport(scope.row)" v-show="false">导出</el-button>-->
  </div>

</template>

<script>
  export default {
    name: 'ocx',
    data(){
      return {
        show: false,
        classA: 0,
        classB: 0,
        isShow: 0,
        downloadUrl:null,
        isShowModel:false,
        linkClick: "",
        userInfo:{hosArea:'43563145-0',deptCode:'01030100',userId:'PM',IdNo:'000001390548',visitId:'1',stationCode:'0103010002'},
        hisJspUrl:null,
        emrPatUrl:null,
        patientInfo:JSON.parse(localStorage.getItem('patInfos')),
        configToolbar:[
          {
            name: "关闭",
            path:'/',
            icon:require('@/assets/ocx-toolbar/icon_close.png')
          },
          {
            name: "编辑",
            path:'/',
            icon:require('@/assets/ocx-toolbar/icon_edit.png')
          },
          {
            name: "保存",
            path:'/',
            icon:require('@/assets/ocx-toolbar/icon_preserve.png')
          },
          {
            name: "删除",
            path:'/',
            icon:require('@/assets/ocx-toolbar/icon_delete.png')
          },
          ],
        configNav: [
          {

            name: "文件",
            path:'/',
            subItems:[
              { fun:'newFile()',text: '新建'},
              { fun:'/yingxiaozhaosheng',text: '打开文件' },
              { fun:'saveAsFile()',text: '另存为' },
              { fun:'print()',text: '打印' },
              { fun:'',text: '插入图片' }
            ]
          },
          {
            name: "编辑",
            path:'',
//            subItems:[
//              { fun:'/education',text: '教学管理系统'},
//              { fun:'/yingxiaozhaosheng',text: '营销招生系统' },
//              { fun:'',text: '视频直播系统' },
//              { fun:'',text: '个性化定制服务' }
//            ]
          },
          {
            name: "查看",
            path:'/',
          },
          {
            name: "格式",
            path:'/',
          },
          {
            name: "段落",
            path:'/',
          },
          {
            name: "表格",
            path:'/',
          },
          {
            name: "工具",
            path:'/',
          },
          {
            name: "编程",
            path:'/',
          },
          {
            name: "插入",
            path:'/',
          },
        ]
      }
    },
    created (){
      this.hisJspUrl="http://192.31.10.85:8081/215his/BedCard.jsp?HOSP_AREA="+this.userInfo.hosArea+"&DEPT_CODE="+this.userInfo.deptCode+"&USER_ID="+this.userInfo.userId+"&STATION_CODE="+this.userInfo.stationCode;
      this.emrPatUrl="http://192.31.10.85:8081/215his/EMRFile.jsp?HOSP_AREA=43563145-0&USER_ID=PM&CASE_NO=20200404000356&ID_NO=000001390548";
    },
    mounted () {
//      let ocxobj = document.getElementById('preview');
//      ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
//      ocxobj.FileNew();
      let that=this;
      window.addEventListener('storage', function (e) {
//          console.log('监听本地存储',this.patientInfo);
          that.onitPatient();
      });
    },
    activated() {
        this.onitPatient();
    },
    methods: {
//      初始化本地数据库数据
      onitPatient(){
        this.patientInfo=JSON.parse(localStorage.getItem('patInfos'))
        console.log('patInfo',this.patientInfo);
      },
      onitDateBase(){
        var conn = new ActiveXObject("ADODB.Connection");
        conn.Open("Provider=SQLOLEDB.1; Data Source=:Localhost:2638?ServiceName=LDB; User ID=dba; "
          +"Password=sql; Initial Catalog=DESKTOP-MQ7VF7KLDB");
        var rs = new ActiveXObject("ADODB.Recordset");
        var sql="select id,name from Category";
        rs.open(sql, conn);
        alert(rs(0));//取出第一个来
        rs.close();
        rs = null;
        conn.close();
        conn = null;
      },
      handleExport () {
        // Dynamic settings download link
        this.downloadUrl = 'http://192.31.10.85:8081/215his/EMR/20200616.emt'
        console.log('下载');
          var elemIF = document.createElement('iframe')
          elemIF.src = this.downloadUrl
          elemIF.style.display = 'none'
          document.body.appendChild(elemIF)
      },
      showModal(){
        this.isShowModel=true;
      },
      closeModal(){
        this.isShowModel=false;
      },
      //菜单开始
      selected: function(index) {
        this.classA = index;
      },
      menuselected: function(nav) {
        this.classB = nav;
      },
      showToggle: function(index) {
        this.isShow = index;
      },
      treeNavSwitch: function(nav) {
        this.linkClick = nav.link;
      },
      //菜单结束
      preview(event){//保存文件
        let files = document.getElementById('openFile').files[0];
        console.log(document.getElementById('openFile').value);
        this.openFile(document.getElementById('openFile').value);
      },
      insertFile(){//插入图片
        let files = document.getElementById('insertImg').files[0];
        this.insertImg(document.getElementById('insertImg').value);
      },
      callBack (){//回调
        console.log('ocx事件')
      },
      saveImg() {
        //将服务器上图片存放到本地的方法
        this.saveAs();
      },
      saveAsFor(){
//        var fileSave = new ActiveXObject("MSComDlg.CommonDialog");
//
//        fileSave.Filter = "Scripts|*.vbs;*.hta;*.wsf;*.js|Text Files|*.txt|All files|*.*";
//        fileSave.FilterIndex = 2;
//
//        // 必须设置MaxFileSize. 否则出错
//        fileSave.MaxFileSize = 128;
//        fileSave.ShowSave();
//        var fileName = fileSave.FileName;
//        var filePath = fileName.substring(0,fileName.lastIndexOf('\\')+1);
//        alert('文件名：' + fileName + '\n路径名：' + filePath);
        let ocxSaveobj = document.getElementById('saveAsTemplate');
        ocxSaveobj.ShowSave();
      },
      BrowseFolder(){
        var Message = "<input type='text'>";

        var Shell  = new ActiveXObject( "Shell.Application" );
        var Folder = Shell.BrowseForFolder(0,Message,0x0040,0x11);
        if(Folder != null)
        {
          Folder = Folder.items(); // 返回 FolderItems 对象
          Folder = Folder.item();  // 返回 Folderitem 对象
          Folder = Folder.Path;  // 返回路径
          var varFolder=Folder;
          if(Folder.charAt(varFolder.length-1) != "\\"){
            Folder = varFolder + "\\";
          }

          return Folder;
        }
      },
      saveAsFile(){
        this.BrowseFolder();
        console.log(this.BrowseFolder());
//        let ocxobj = document.getElementById('preview');
//        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
//        this.saveAsFor()
//        document.execCommand('SaveAs');
//        document.execCommand('open')
//        ocxobj.FileSaveAs('D:\\住院病历.emr',1,0);
//        ocxobj.FileSaveAs('D:\\病历文件.emt',0,0);
//        console.log(ocxobj.FileSaveAs('C:\Users\DELL\Desktop\emrtest.emr',1,0))
      },
      newFile(){
        let ocxobj = document.getElementById('preview');
        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
        ocxobj.FileNew();
        console.log(ocxobj.FileNew());
      },
      openFile(fileurl){
        let ocxobj = document.getElementById('preview');
        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
//        ocxobj.FileOpen(fileurl,0);
        ocxobj.FileOpen('C:\\Users\\DELL\\Downloads\\20200616.emt',0);
//        ocxobj.FileOpen('C:\\Users\\DELL\\Desktop\\emrtest.emr',0);
        console.log(ocxobj.FileOpen('C:\\Users\\DELL\\Downloads\\20200616.emt',0));
      },
      insertImg(imgUrl){//插入图片
        let ocxobj = document.getElementById('preview');
//        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
//        ocxobj.FileInsert(imgUrl,0);
        console.log(imgUrl);
        ocxobj.UniversalBoolFunction(imgUrl,"",93,1)
//        console.log(ocxobj.FileInsert(imgUrl,0));
      },
      print(){
        let ocxobj = document.getElementById('preview');
        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR", "", 98,25130824);
        ocxobj.Print(0);
      },
      singleCheck(){//单选
//        let ocxobj = document.getElementById('preview');
//        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
//        ocxobj.UniversalBoolFunction("","","","","","16");
      }
    }
  }
</script>
<style scoped>
  .nav {
    width: 80%;
    min-width: 1300px;
    height: auto;
    margin: 0px auto;
    position: absolute;
    border-bottom: none;
    /*line-height: 40px;*/
  }
  .nav-a {
    cursor: pointer;
    float: left;
    /*margin-left: 50px;*/
    letter-spacing: 4px;
    position: relative;
  }
  .nav-a-ul {
    list-style: none;
    padding:0px;
  }
  .nav-a-li {
    display: inline-block;
    margin-left: 30px;
    height: 40px;
  }
  .nav-a-text {
    font-size: 12px;
    color: #36506B;
    line-height: 40px;
    text-decoration: none;
  }
  .menu_ul {
    width: 130px;
    list-style: none;
    background: #fff;
    border-radius: 3px;
    z-index: 999;
    position: absolute;
    top: 40px;
    left: 27px;
    display: none;
  }
  .menu_li {
    height: 30px;
    line-height: 30px;
    /*padding-left: 12px;*/
  }
  .menu_ul_text {
    font-size: 14px;
    color: #666;
    letter-spacing: 0;
    line-height: 30px;
    text-decoration: none;
    padding-left: 6px;
  }
  .nav-a-li:hover {
    border-bottom: 2px solid #fff;
  }
  .nav-a-li.active {
    /*border-bottom: 2px solid #fff;*/
    font-weight:bold;
  }
  /* .nav-a-li:active {
    border-bottom: 2px solid #fff;
  } */
  .nav-a-li:hover .menu_ul {
    display: block;
  }
  .menu_ul_text:hover {
    color: #2589ff;
  }
  .menu_li.active .menu_ul_text{
    /*color: #2589ff;*/
  }
  /*打开文件样式*/
  .getImgUrl_file{
    position: absolute;
    left: 0px;
    height: 30px;
    opacity: 0;
    z-index: 1;
    outline: none;
    color:transparent;
  }
  .positionDiv{
    position: absolute;
    z-index: 0;
  }
  .leftPositionCon{
    float: left;
    /*background: #0a76a4;*/
    width:12%;
    height:100%;
    margin-top:115px;
    border:1px solid #CDD2D9;
  }
  .title{
    background: linear-gradient(180deg,rgba(111,166,227,1) 0%,rgba(44,93,147,1) 100%);
    color: #fff;
    padding-left: 20px;
    font-size:12px;
    height:30px;
    line-height: 30px;
  }
  .closeBtn{
    color: #fff;
    font-size:18px;
    font-weight:bold;
  }
  .modalNav{
    width:860px;
    height: 40px;
    line-height: 40px;
    background: #7199C9;
    position: absolute;
    z-index: 70;
    padding-right: 20px;
    text-align: right;
  }
  .app-container{
    padding: 0px;
  }
  .borderRight{
    border-right:1px solid #CDD2D9;
    padding-left: 20px;
  }
  .borderBottom{
    border-bottom:1px solid #CDD2D9;
    font-size: 12px;
  }
  .fontPadding{
    padding:5px 0px 5px 20px;
  }
  .leftTitles{
    width:40%;
  }
</style>

