<template>
    <div class="details" id="details">
        <div class="listBox" v-for="(item, index) in datalist" :key="index">
            <div class="list_left_item">
                <!-- <div class="item_name">
                    名字
                    {{ item.excitationUserName }}
                    奖or惩
                    {{ item.excitationCategory | excitationCategory }}
                    积分or红包
                    {{ item.excitationUnit | excitationUnit }}
                </div> -->
                <div class="item_name">{{ item.excitationUserName }}{{ item.excitationCategory | excitationCategory }}{{ item.excitationUnit | excitationUnit }}</div>
                <div class="item_time">{{ item.createDate }}</div>
            </div>
            <div class="list_right_item" v-if="item.excitationCategory == 1">
                <div class="item_price greenFont">{{ item.excitationCategory | excitationCategoryCode }}{{ item.excitationAmount }}</div>
            </div>
            <div class="list_right_item" v-else>
                <div class="item_price redFont">{{ item.excitationCategory | excitationCategoryCode }}{{ item.excitationAmount }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import storejs from 'storejs';
    import util from '@/libs/util';
    import { Toast } from 'vux';

    export default {
        data() {
            return {
                datalist: [],
                userId:''
            } 
        },
        methods: {
            getData() {
                let api = "taskExcitation/list";
                // let userId = 7188;
//                let userId = 7190;
                util.getList(api, {
                    userId: this.userId
                }).then(res => {
                    console.log(res);
                    this.datalist = res.data.result;
                    // console.log(this.datalist, "1");
                }).catch(error => {
                    console.log('Error', error.message);
                });
            },
            handleTest(e){
                let file = e.target.files;
                let formData = new FormData();
                formData.append('fileName', file[0]);
                this.$vux.toast.text(file, 'middle');
            }
        },
        mounted() {

        },
        created() {
          const userList = JSON.parse(storejs.get("loginUserInfo"));
          this.userId = userList.userId;
            this.getData();
        },
        computed: {

        },
        filters: {
            excitationCategory(value) {
                console.log(value);
                // 1是奖 2是惩
                if(value == 1){
                    return "打赏";
                }else{
                    return "惩罚";
                };
            },
            excitationUnit(value){
                console.log(value);
                // 1是积分 2是红包
                if(value == 1){
                    return "积分";
                }else{
                    return "红包";
                };
            },
            excitationCategoryCode(value){
                if(value == 1){
                    return "+";
                }else{
                    return "-";
                };
            }
        }
    }
</script>

<style lang="less" scoped>
    .details{
        background-color: #FFF;
        height: 100%;
        font-family: PingFangSC-Regular,PingFang SC;
        .listBox{
            height: 60px;
            border-bottom: 0.5px solid #EEE;
            padding: 0;
            margin: 0 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // line-height: 50px;
            .list_left_item{
                .item_name{
                    font-size: 16px;
                    font-weight: 400;
                    color: #333;
                    // color: #666;
                }
                .item_time{
                    font-size: 14px;
                    font-weight: 400;
                    color: #666;
                    // color: #999;
                }
            }
            .list_right_item{
                line-height: 40px;
                font-size: 18px;
                font-weight: 400;
                .greenFont{
                    color: #42BE1C;
                }
                .redFont{
                    color: #F16965;
                }
            }
        }
    }
</style>
