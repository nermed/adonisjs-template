const toastrMin = require("../views/layout/plugins/toastr/toastr.min");

$(document).ready(function () {
  $("#add-access").on("click", function () {
    const select = $("#access-form select").val();
    // console.log(select);
    const dataToSend = [];
    const inputCheckbox = $("#access-form input[type=checkbox]");
    for (let i = 0; i < inputCheckbox.length; i++) {
      const input = inputCheckbox[i];
      dataToSend.push(`${input.id}-${input.checked}`);
    }
    $.ajax({
      url: "http://127.0.0.1:3333/access",
      method: "POST",
      dataType: "json",
      data: { dataToSend, select },
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
  $("#access-form select").on("change", function () {
    const selectValue = $("#access-form select").val();
    $("#access-form input[type=checkbox]").attr("checked", false);
    $.ajax({
      url: "http://127.0.0.1:3333/access/getAccess",
      method: "POST",
      dataType: "json",
      data: { groupId: selectValue },
      success: function (data) {
        console.log(data);
        const inputCheckbox = $("#access-form input[type=checkbox]");
        for (let i = 0; i < inputCheckbox.length; i++) {
          const input = inputCheckbox[i];
          if(data.some(dt => dt.permission_id == input.id.split('-')[0])) {
            input.setAttribute('checked', true)
          }
        }
      },
      error: function (error) {
        console.log(error);
      },
    });
  });
  setUserActif = (itemId) => {
    $.ajax({
      url: "http://127.0.0.1:3333/user/changeStatus",
      method: "POST",
      dataType: "json",
      data: { userId: itemId },
      success: function (data) {
        console.log(data);
        toastrMin.success("Success.", "Success", {
          positionClass: "toast-top-right",
          duration: 5000,
          style: "info",
        });
      },
      error: function (error) {
        console.log(error);
        toastrMin.error("Success.", "Error", {
          positionClass: "toast-top-right",
          duration: 5000,
          style: "info",
        });
      },
    });
  };
});
