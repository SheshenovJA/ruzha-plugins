//(function (jQuery, undefinde) {

jQuery(document).ready(function () {
    jQuery(document).on('click', '.popup .close_order, .overlay', function () {
        jQuery('.popup, .overlay').css({'opacity': '0', 'visibility': 'hidden'});
        jQuery('#contactform input:checkbox').removeAttr("checked");
        jQuery('#contactform input[type=hidden].valTrFal').val('valTrFal_disabled');
    });

    jQuery(function () {
        jQuery('#contactform input:checkbox').change(function () {
            if (jQuery(this).is(':checked')) {
                jQuery('#contactform input[type=hidden].valTrFal').val('valTrFal_true');
            } else {

                jQuery('#contactform input[type=hidden].valTrFal').val('valTrFal_disabled');
            }
        });
    });
    //Доп сообщение

    jQuery(document).on('click', '.popummessage .close_message, .overlay_message', function () {
        jQuery('.popummessage, .overlay_message').css({'opacity': '0', 'visibility': 'hidden'});

    });
});
//Обработка клика по кнопке
// Для формы - отправка в ajax class
function saveButton(text, url, objThis) {

    jQuery.ajax({
        type: "POST",
        url: url,
        async: true,
        data: {
            action: 'buybuttonform',
            text: text
        },
        success: function (response) {
            var obj = JSON.parse(response);
            if (obj.num == "1") { //Действие по умолчанию
                jQuery(".buyButtonOkForm").after("<span>" + obj.result + "</span>");
            }
            if (obj.num == "2") { // Закрытие формы через action мил сек
                jQuery(".buyButtonOkForm").after("<span>" + obj.result + "</span>");
                jQuery('.popup, .overlay').fadeOut(obj.action);


            }
            if (obj.num == "3") { // Показать сообщение action
                jQuery('.popup, .overlay').hide();
                // console.log(jQuery(objThis).next());
                jQuery('.popummessage, .overlay_message').css('opacity', '1');
                jQuery('.popummessage, .overlay_message').css('visibility', 'visible');
                //alert("Готово");

            }
            if (obj.num == "4") { // Сделать редирект action
                jQuery(".buyButtonOkForm").after("<span>" + obj.result + "</span>");
                self.location = obj.action;
            }
            //alert(obj.num);

            //jQuery(".buyButtonOkForm").after("<span>" + obj.result + "</span>");

        }
    });

}

function getAjaxUrl() {

    return buyone_ajax.ajaxurl;
}


jQuery(document).ready(function () {

    jQuery(document).on('click', '#contactform .buyButtonOkForm', function (e) {
//НА странице появляется две кнопки TODO
        e.preventDefault();
        var objButton = this;
        var parentForm = jQuery(this).parent('#contactform');

        var allRequired;
        var errorSending = "no";
        var txtname = jQuery(parentForm).find("input[name=txtname]").val();
        var txtphone = jQuery(parentForm).find("input[name=txtphone]").val();
        var txtemail = jQuery(parentForm).find("input[name=txtemail]").val();
        var message = jQuery(".buymessage").val();
        var buy_nametovar = jQuery(parentForm).find("input[name=buy_nametovar]").val();
        var buy_pricetovar = jQuery(parentForm).find("input[name=buy_pricetovar]").val();
        var buy_idtovar = jQuery(parentForm).find("input[name=buy_idtovar]").val();
        var custom=jQuery(objButton).attr('data-custom');

       // jQuery(".b1c-form").find(".buyvalide").each(function () {
         //   if (jQuery(this).attr("required") != undefined) { // если хотя бы одно поле обязательно
          //     allRequired = "no";
			//
      //      }

			//console.log(txtname)
       // });
       function drawError() {
         var alertMsgMsg = "Заповніть усі поля(е)"
         var styler = document.createElement("div");
         styler.setAttribute("style",
         "position:fixed;border: solid 1px Red;width:200px;height:50px;top: 17%; left: 50%; margin-top: -40px; margin-left: -100px; text-align: center;background-color:#444;color:Silver;z-index:999999");
         styler.innerHTML = alertMsgMsg;
         setTimeout(function()
         {
           styler.parentNode.removeChild(styler);
         },3000);
         document.body.appendChild(styler);

       }
                  //text

			if(txtname==""){
        jQuery(".b1c-form").find("input[name=txtname]").css('border','1px solid red');
				allRequired = "no"
        drawError();
					}else{
				jQuery(".b1c-form").find(".buyvalide").css('border','0px');
					}


                //phone
          if(txtphone==""){
            jQuery(".b1c-form").find("input[name=txtphone]").css('border','1px solid red');
            allRequired = "no"
            drawError();
              }else{
            jQuery(".b1c-form").find(".buyvalide").css('border','0px');
              }
                  //email
              if(txtemail==""){
                jQuery(".b1c-form").find("input[name=txtemail]").css('border','1px solid red');
                allRequired = "no"
                  drawError();
                  }else{
                jQuery(".b1c-form").find(".buyvalide").css('border','0px');
                  }


                        //message
                  if(message==""){
                    jQuery(".buymessage").css('border','1px solid red');
                    allRequired = "no"
                      drawError();
                      }else{
                    jQuery(".b1c-form").find(".buyvalide").css('border','0px');
                      }

        jQuery(".b1c-form").find(".buyvalide").each(function () {  // проверяем заполенность полей

            if (jQuery(this).val().length < 1) {

                if (allRequired == "no" && jQuery(this).attr("required") != undefined) {

                    errorSending = 1;
                }
                if (allRequired == 1) {

                    errorSending = 1;
                }
            }
        });

        function drawUspeh() {
          var alertMsgMsg = "Дякуємо! Ваше замавлення у процесі обробки, ми зв'яжемось з Вами найблищим часом!"
          var styler = document.createElement("div");
          styler.setAttribute("style",
          "position:fixed;border: solid 1px Red;width:400px;height:65px;top: 15%; left: 50%; margin-top: -40px; margin-left: -100px; text-align: center;background-color:#444;color:Silver;z-index:999999");
          styler.innerHTML = alertMsgMsg;
          setTimeout(function()
          {
            styler.parentNode.removeChild(styler);
          },6000);
          document.body.appendChild(styler);

        }



        if (errorSending === "no") {
            drawUspeh();
        //  alert("Замовлення створено");

            var infozakaz = {
                txtname: txtname,
                txtphone: txtphone,
                txtemail: txtemail,
                message: message,
                nametovar: buy_nametovar,
                pricetovar: buy_pricetovar,
                idtovar: buy_idtovar,
                custom: custom,
            };

            var zixnAjaxUrl = getAjaxUrl();
            saveButton(infozakaz, zixnAjaxUrl, objButton);

        }

    });

});
//Форма рисователь
jQuery(document).ready(function () {
    jQuery(document).on('click', 'a.clickBuyButton', function (e) {
        e.preventDefault();
        var zixnAjaxUrl = getAjaxUrl();
        var butObj = this;

        var urlpost = window.location.href;
        var productid = jQuery(butObj).attr('data-productid');
        //alert(productid);

        jQuery.ajax({
            type: "POST",
            url: zixnAjaxUrl,
            async: true,
            data: {
                action: 'getViewForm',
                urlpost: urlpost,
                productid: productid
            },
            success: function (response) {
                //console.log(response);
                jQuery('#formOrderOneClick').remove();
                jQuery(butObj).after(response);
                jQuery('#formOrderOneClick .popup, #formOrderOneClick .overlay').css('opacity', '1');
				jQuery('#formOrderOneClick .popup, #formOrderOneClick .overlay').css('visibility', 'visible');

            }
        });
    });
    jQuery(document).on('click', 'a.clickBuyButtonCustom', function (e) {
        e.preventDefault();
        var zixnAjaxUrl = getAjaxUrl();
        var butObj = this;

        var urlpost = window.location.href;
        var productid = jQuery(butObj).attr('data-productid');
        var name = jQuery(butObj).attr('data-name');
        var count = jQuery(butObj).attr('data-count');
        var price = jQuery(butObj).attr('data-price');

        jQuery.ajax({
            type: "POST",
            url: zixnAjaxUrl,
            async: true,
            data: {
                action: 'getViewFormCustom',
                urlpost: urlpost,
                productid: productid,
                name: name,
                count: count,
                price: price,
            },
            success: function (response) {
                // console.log(response);
                jQuery('#formOrderOneClick').remove();
                jQuery(butObj).after(response);
                jQuery('.popup, .overlay').css('opacity', '1');
                jQuery('.popup, .overlay').css('visibility', 'visible');


            }
        });
    });
});
