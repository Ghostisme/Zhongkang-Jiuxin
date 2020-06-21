$('.del').click(function () {
    swal({
         title: "您确定要删除这条信息吗",
         text: "删除后将无法恢复，请谨慎操作！",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "删除",
         cancelButtonText: "取消",
         closeOnConfirm: false,
         closeOnCancel: false
     }, function(isConfirm) {
         if(isConfirm) {
             swal("删除成功！", "您已经永久删除了这条信息。", "success")
         } else {
             swal("已取消", "您取消了删除操作！", "error")
         }
     })
 });