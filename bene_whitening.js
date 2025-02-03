
function calcStart(){
    
    //変数を宣言(文字型を数字型に変換)
    var installtion_str = document.getElementById("installtion_number").value;
    var installtion = parseInt(installtion_str.replace(/,/g,""));
    if(checkInputValue(installtion,"ベネホワイトニング機材導入数") == false){
        return;
    }

    var business_str = document.getElementById("business_number").value;
    var business = parseInt(business_str.replace(/,/g,""));
    if(checkInputValue(business,"月間営業数") == false){
        return;
    }

    var time_str = document.getElementById("business_hour").value;
    var time = parseInt(time_str.replace(/,/g,""));
    if(checkInputValue(time,"日の営業時間") == false){
        return;
    }

    var percent_str = document.getElementById("operation_percent").value;
    var percent = parseInt(percent_str.replace(/,/g,""));
    if(checkInputValue(percent,"想定稼働率") == false){
        return;
    }

    var human_cost_str= document.getElementById("personnel_cost").value;
    var human_cost = parseInt(human_cost_str.replace(/,/g,""));
    if(checkInputValue(human_cost,"人件費")==false){
        return;
    }

    var room_cost_str = document.getElementById("rent_cost").value;
    var room_cost = parseInt(room_cost_str.replace(/,/g,""));
    if(checkInputValue(room_cost,"家賃") == false){
        return;
    }

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

    //計算する項目を入力する時点での条件
    if(over(installtion,1,10,"ベネホワイトニング機材導入数") == false){
        return;
    }

    if(over(business,1,30,"月間営業数") == false){
        return;
    }

    if(over(time,2,24,"日の営業時間") == false){
        return;
    }

    if(over(percent,10,100,"想定稼働率") == false){
        return;
    }

    //最大施術可能数
    monthly_maxtreatment = max_t(installtion,business,time);
    
    //初期費用充足期間の計算に使用する月間粗利益見込み
    sufficiency_profit = profit(monthly_maxtreatment,percent);
    
    //初期費用充足期間に使う計算
    month = prospect_month(installtion,sufficiency_profit);
    
    //月間売上見込み（人件費と家賃を除算）
    sufficiency_profit2 = profit2(sufficiency_profit,human_cost,room_cost);
    
    //初期費用充足期間（人件費と家賃を除算した月間売上見込みと導入数から計算
    month2 = prospect_month2(installtion,sufficiency_profit2);

    //計算結果がマイナスになった時の条件分岐
    if(minus(sufficiency_profit2,month2) == false){
        alert ('計算結果がマイナスのため、表示出来ません')
        return;
    }

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
    //入力値のチェック
    function checkInputValue(value,columName){

        //計算する項目を入力する時点での条件
        if(value == 0){
            alert(columName + ' 0は入力出来ません')
            return false;
        }

        if(!value){
            alert (columName + ' 必須項目を入力してください')
            return false;
        }

        if(value<0){
            alert(columName + ' 0以下の数字は入力出来ません')
            return false;
        }

        return true;
    }

   //表内の計算メソッド
    function max_t(installtion,business,time){
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
    function over(value,min,max,columName){
        if(value>max || value<min){
            alert(columName + ' 範囲外の数字は入力出来ません');
            return false;
        }
        else{
            return true;
        }
    }

    function minus(sufficiency_profit2,month2){
        if(sufficiency_profit2<0 || month2<0){
            return false;
        }
        else{
            return true;
        }
    }
