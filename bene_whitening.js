










function calcStart(){
    console.log("debug");
    //変数を宣言(文字型を数字型に変換)
    var installtion_str = document.getElementById("installtion_number").value;
    var installtion = parseInt(installtion_str.replace(/,/g,""));

    var business_str = document.getElementById("business_number").value;
    var business = parseInt(business_str.replace(/,/g,""));

    var time_str = document.getElementById("business_hour").value;
    var time = parseInt(time_str.replace(/,/g,""));

    var percent_str = document.getElementById("operation_percent").value;
    var percent = parseInt(percent_str.replace(/,/g,""));

    var human_cost_str= document.getElementById("personnel_cost").value;
    var human_cost = parseInt(human_cost_str.replace(/,/g,""));

    var room_cost_str = document.getElementById("rent_cost").value;
    var room_cost = parseInt(room_cost_str.replace(/,/g,""));

    var monthly_maxtreatment_str = document.getElementById("max_treatment").value;
    var monthly_maxtreatment = parseInt(monthly_maxtreatment_str.replace(/,/g,""));

    var sufficiency_profit_str = String(sufficiency_profit_str);
    var sufficiency_profit = parseInt(sufficiency_profit_str.replace(/,/g,""));

    var month_str = String(month_str);
    var month = parseInt(month_str.replace(/,/g,""));

    var sufficiency_profit2_str = document.getElementById("monthly_profit2").value;
    var sufficiency_profit2 = parseInt(sufficiency_profit2_str.replace(/,/g,""));

    var month2_str = document.getElementById("sufficiency_month2").value;
    var month2 = parseInt(month2_str.replace(/,/g,""));

    //最大施術可能数
    monthly_maxtreatment = max(installtion,business,time);
    
    //月間粗利益見込み
    sufficiency_profit = profit(monthly_maxtreatment,percent);
    

    //初期費用充足期間
    month = prospect_month(installtion,sufficiency_profit);
    
    //月間売上見込み（人件費と家賃を除算）
    sufficiency_profit2 = profit2(sufficiency_profit,human_cost,room_cost);
    
    //初期費用充足期間（人件費と家賃を除算した月間売上見込みと導入数から計算
    month2 = prospect_month2(installtion,sufficiency_profit2);
    
    //数字型を文字型に変換（小数に変換）
    monthly_maxtreatment_str = monthly_maxtreatment.toLocaleString();
    document.getElementById("max_treatment").value = monthly_maxtreatment_str;

    human_cost_str = human_cost.toLocaleString();
    document.getElementById("personnel_cost").value = human_cost_str;

    room_cost_str = room_cost.toLocaleString();
    document.getElementById("rent_cost").value = room_cost_str;
    
    sufficiency_profit2_str = sufficiency_profit2.toLocaleString();
    document.getElementById("monthly_profit2").value = sufficiency_profit2_str;

    month2_str = month2.toLocaleString();
    document.getElementById("sufficiency_month2").value = month2_str;
}
   //表内の計算メソッド
    function max(installtion,business,time){
        return installtion * business * time;
    }

    function profit(monthly_maxtreatment,percent){
        return monthly_maxtreatment * 5000 * (percent/100);
    }

    function prospect_month(installtion,sufficiency_profit){
        month = (1540000 * installtion)/sufficiency_profit;
        month = month *10;
        month = Math.round(month);
        return month/10;
    }

    function profit2(sufficiency_profit,human_cost,room_cost){
        return sufficiency_profit - human_cost - room_cost;
    }

    function prospect_month2(installtion,sufficiency_profit2){
        month2 = (1540000 * installtion)/sufficiency_profit2;
        month2 = month2 *10;
        month2 = Math.round(month2);
        return month2/10;
    }

    //エラー発生時のメソッド
    function mistake(){
        //計算するための最低条件
        if(!human_cost){
           alert('必須項目を全て入力してください');
           return ;
        }
   
       if(!room_cost){
           alert('必須項目を全て入力してください');
           return ;
        }
   
       if(!business){
           alert('必須項目を全て入力してください');
           return ;
        }

       if(!percent){
        alert('必須項目を全て入力してください');
        return ;
        }

        if(!time){
            alert('必須項目を全て入力してください');
            return ;
        }

       if(installtion<0){
           alert('0より小さい数字は入力が出来ません')
           return ;
        }

       if(business<0){
        alert('0より小さい数字は入力が出来ません')
        return ;
        }

        if(time<0){
        alert('0より小さい数字は入力が出来ません')
        return ;
        }

        if(percent<0){
        alert('0より小さい数字は入力が出来ません')
        return ;
        }

        if(room_cost<0){
        alert('0より小さい数字は入力が出来ません')
        return ;
        }

        if(installtion>10){
        alert('')
        }
   
   }
   