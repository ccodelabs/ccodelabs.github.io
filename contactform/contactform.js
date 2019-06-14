jQuery(document).ready(function ($) {
  "use strict";

  //Contact
  $("form.contactForm").submit(function () {
    var f = $(this).find(".form-group"),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children("input").each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case "email":
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case "checked":
            if (!i.is(":checked")) {
              ferror = ierror = true;
            }
            break;

          case "regexp":
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror ?
            i.attr("data-msg") !== undefined ?
            i.attr("data-msg") :
            "wrong Input" :
            ""
          )
          .show("blind");
      }
    });
    f.children("textarea").each(function () {
      // run all inputs

      var i = $(this); // current input
      var rule = i.attr("data-rule");

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(":", 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case "required":
            if (i.val() === "") {
              ferror = ierror = true;
            }
            break;

          case "minlen":
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next(".validation")
          .html(
            ierror ?
            i.attr("data-msg") != undefined ?
            i.attr("data-msg") :
            "wrong Input" :
            ""
          )
          .show("blind");
      }
    });

    // Make visible loading screen
    $("#loadingScreen").fadeIn(300);

    var url = this.attr("action");
    var formData = $(this).serializeArray();
    $.post(url, formData).done(function (data) {
      $("#loadingScreen").fadeOut(300);
      toastr.success("Email successfully sent", {
        timeOut: 2000
      });
    });

    /*var str = $(this).serializeArray();
    var postData = new FormData();
    $.each(str, function (i, val) {
      postData.append(val.name, val.value);
    });

    $.ajax({
      type: "POST",
      url: "contactform/contactEmail.php",
      data: postData,
      cache: false,
      contentType: false,
      processData: false,
      success: function (result) {
        try {
          if ($.parseJSON(result).status === "success") {
            // Display an success toast
            $("#loadingScreen").fadeOut(300);
            toastr.success("Email successfully sent", {
              timeOut: 2000
            });
          } else {
            // Display an error toast
            $("#loadingScreen").fadeOut(300);
            toastr.error("Error sending the e-mail", {
              timeOut: 2000
            });
          }
        } catch (e) {
          $("#loadingScreen").fadeOut(300);
          toastr.error(e.toString(), {
            timeOut: 2000
          });
        }
        document.getElementById("ContactForm").reset();
        $("#modalContact").modal("hide");
      },
      error: function (err) {
        console.log(err);
        // Display an error toast
        $("#loadingScreen").fadeOut(300);
        toastr.error("Error sending the e-mail", {
          timeOut: 2000
        });
        document.getElementById("ContactForm").reset();
        $("#modalContact").modal("hide");
      }
    });
    return false;*/
  });
});