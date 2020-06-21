import Vue from 'vue';

const logData = {
	strict: process.env.NODE_ENV !== "production",
	state: {
        //缓存处理数据
        cookieData: {
        	jumpPageId: null,
        	logUserId: null,
        	createBy: null,
        	flag: null,
        	parentId: null,
			removeCookie: null,
			pageId: null			
        },
        aiteUserList: null,
        excitationUserList: null,
		excitationUserList1: null,
		logContent: null,
		commentContent: null
    },
    getters: {
    	
    },
    mutations: {
        //通过点击评论按钮传入值
        changeCookieData (state, payload){
        	console.log(state);
        	console.log(payload);
        	state.cookieData.jumpPageId = payload.jumpPageId;
        	state.cookieData.logUserId = payload.logUserId;
        	state.cookieData.createBy = payload.createBy;
        	state.cookieData.flag = payload.flag;
        	state.cookieData.parentId = payload.parentId;
			state.cookieData.removeCookie = payload.removeCookie;
			state.cookieData.pageId = payload.pageId;
       	},
       	changeList (state, payload) {
//     		console.log(state);
       		console.log(payload, "存通讯录选人对象的传过来的数据");
       		if (payload.excessiveFlg == "2") {
				state.aiteUserList = payload.list;
				console.log(state.aiteUserList);
       		}else if(payload.excessiveFlg == "3"){
       			state.excitationUserList = payload.list;
       		}else{
       			state.excitationUserList1 = payload.list;
       		}
		},
		clearList (state, payload) {
			state.aiteUserList = null;
			state.excitationUserList = null;
			state.excitationUserList1 = null;
		}
    },
    actions: {
		
    },
    modules: {
        
    }
}


export default logData;