/**
 * 处理服务器文件路径
 * 
 * @param {string} name 文件名称带后缀
 * @param {number} type 文件类型1.图片 2.音频 3.视频
 * @returns 拼接好的url
 */
function fileServerPath(name,type){
    let path = localStorage.getItem('fileServerPath');
    let url;
    if (type == 1) {
        url = path + '/photo/' + name;
    } else if(type == 2) {
        url = path + '/audio/' + name;
    } else if(type == 3) {
        url = path + '/video/' + name;
    }else{
        url = '';
    }
    return url;
};

export {fileServerPath}