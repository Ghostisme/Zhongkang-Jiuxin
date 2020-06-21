<template>

  <div  class="app-container documentation-container" style="width:100%;height:800px;padding-top:0px;margin-top:10px;">
    <!--<div class="nav" style="height: 40px;width: 100%;">-->
      <!--<div class="nav-a" style="width:100%;">-->
        <!--<ul class="nav-a-ul" style="position: absolute;z-index: 100;width:100%;background: #4C86EA;">-->
          <!--<iframe id="iframe1" src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>-->
          <!--<li class="nav-a-li" :class="classA == index ? 'active' : '' "  @click="selected(index)"  v-for="(item,index) in configNav">-->
            <!--<div :to='item.path' class="nav-a-text" @click="showToggle(index)">{{item.name}}</div>-->
            <!--<ul class="menu_ul" :class="{'active' :index===isShow}"v-if="index==0" :style="{'left':index*90+30+'px'}">-->
              <!--<iframe src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>-->
              <!--<li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">-->
                <!--<div class="menu_ul_text" v-on:click="newFile()">新建</div>-->
              <!--</li>-->
              <!--<li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">-->
                <!--<div class="menu_ul_text positionDiv">打开</div>-->
                <!--<input type="file" id="openFile" name="image" class="getImgUrl_file" @change="preview($event)">-->
              <!--</li>-->
              <!--<li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">-->
                <!--<div class="menu_ul_text"v-on:click="saveAsFile()">另存为</div>-->
              <!--</li>-->
              <!--<li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">-->
                <!--<div class="menu_ul_text"v-on:click="print()">打印</div>-->
              <!--</li>-->
              <!--<li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">-->
                <!--<div class="menu_ul_text"v-on:click="singleCheck()">单选</div>-->
              <!--</li>-->

            <!--</ul>-->
            <!--<ul class="menu_ul" :class="{'active' :index===isShow}"v-else-if="index==8" :style="{'left':index*66+30+'px'}">-->
              <!--<iframe src="about:blank" frameBorder="0" marginHeight="0" marginWidth="0" style="position:absolute; visibility:inherit; top:0px;right:0px;width:100%; height:100%;z-index:-1; filter:alpha(opacity=0);"></iframe>-->
              <!--<li class="menu_li" :class="classB == nav ? 'active' : '' "  @click="menuselected(nav)">-->
                <!--<div class="menu_ul_text positionDiv">图像</div>-->
                <!--<input type="file" id="insertImg" name="image" class="getImgUrl_file" @change="insertFile($event)">-->
              <!--</li>-->
            <!--</ul>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
    <!--<button v-on:click="newFile()">新建</button>-->
    <!--<input type="file" id="openFile" name="image" class="getImgUrl_file" @change="preview($event)">-->
    <!--<button v-on:click="saveAsFile()">另存为</button>-->
    <!--<button v-on:click="print()">打印</button>-->
    <!--<button v-on:click="singleCheck()">单选</button>-->
    <!--<input type="file" id="insertImg" name="image" class="getImgUrl_file" @change="insertFile($event)">-->
    <iframe v-bind:src=hisJspUrl width="100%" height="100%" frameborder="0" scrolling="auto"></iframe>
    <!--<object classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93" codebase="share/software/jre-6u26-windows-i586.exe#version=1,6,0,26"id="preview" width="100%" height="100%"  name="preview" value="transparent" style="position: relative;z-index: 10;top: 20px;">-->
      <!--<param name=code value="http://192.31.10.85:8081/215his/PharmacyResident.jsp">-->
      <!--<param name=codebase value="./lib">-->
      <!--<param name="separate_jvm" value="true" >-->
      <!--<param name="java_arguments" value="-Xmx512m -Dsun.java2d.noddraw=true">-->
      <!--<param name=archive" value="jhBase.jar,jbClient.jar,medicare.jar,pinyin4j-2.5.0.jar,jna.jar,mp3spi1.9.4.jar,tritonus_share.jar,jl1.0.jar,jconn3.jar">-->
      <!--<param name="tag" value="UI">-->
      <!--<param name="config" value="%ROOT%/UI/oereg/ym/ReserveMainPanelUI.ui">-->
      <!--<param name="panelValue" value="<%=HOSP_AREA%>|<%=DEPT_CODE%>|<%=USER_ID%>">-->
      <!--<param name="configColor" value="%ROOT%\config\system\TColor.x">-->
      <!--<param name="configClass" value="%ROOT%\config\system\TClass.x">-->
    <!--</object>-->
    <!--<htmlpanel :url.asyc="url1"></htmlpanel>-->
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
        linkClick: "",
        url1: '',
        url2: '',
        userInfo:{hosArea:'43563145-0',deptCode:'01030100',userId:'PM',IdNo:'000001390548',visitId:'1'},
        hisJspUrl:null,
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
    created () {
//      let obj=new ActiveXObject();
//      let ocxobj = document.getElementById('preview');
//      ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824)
//      ocxobj.FileNew();
//      ocxobj.viewtoolbar();
//      ocxobj.addEventListener('DetectCallBack',this.callBack)
//      console.log(ocxobj.viewtoolbar());
//      this.newFile()
//      this.hisJspUrl="http://192.31.10.85:8081/215his/PharmacyResident.jsp?HOSP_AREA="+this.userInfo.hosArea+"&DEPT_CODE="+this.userInfo.deptCode+"&USER_ID="+this.userInfo.userId+"&ID_NO="+this.userInfo.IdNo+"&VISIT_ID="+this.userInfo.visitId
      this.hisJspUrl="http://192.31.10.85:8081/215his/main.jsp?USER_ID="+this.userInfo.userId;
      console.log(this.hisJspUrl);
    },
    methods: {
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
      saveAs(){
        if(frame.readyState!="complete"){
          //'Saveas'表示打开“文件另存为”对话框命令
          frame.document.execCommand('SaveAs');
        }
      },
      saveAsFile(){
        let ocxobj = document.getElementById('preview');
        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
//        ocxobj.FileSaveAs('D:\\住院病历.emr',1,0);
        ocxobj.FileSaveAs('D:\\病历文件.emt',0,0);
        console.log(ocxobj.FileSaveAs('C:\Users\DELL\Desktop\emrtest.emr',1,0))
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
        ocxobj.FileOpen(fileurl,0);
//        ocxobj.FileOpen('C:\\Users\\DELL\\Desktop\\emrtest.emr',0);
//        console.log(ocxobj.FileOpen('C:\\Users\\DELL\\Desktop\\emrtest.emr',0));
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
        ocxobj.universalboolfunction("O9481C-NNR5HA-EE0E9E-EO22PR","",98,25130824);
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
    line-height: 40px;
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
  }
  .nav-a-li {
    display: inline-block;
    margin-left: 30px;
    height: 40px;
  }
  .nav-a-text {
    font-size: 14px;
    color: #fff;
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
    padding-left: 12px;
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
    border-bottom: 2px solid #fff;
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
    color: #2589ff;
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
</style>

