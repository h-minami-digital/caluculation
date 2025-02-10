
function calcStart(){
    
    //手入力する数字の変数を宣言
    var dounyuu_str = document.getElementById("dounyuu_number").value;
    if(checkAndParseInputValue(dounyuu_str,"ベネホワイトニング機材導入数") == false){
        return;
    }
    var dounyuu = parseInt(dounyuu_str.replace(/,/g,""));
    
    var eigyoubi_str = document.getElementById("eigyou_number").value;
    if(checkAndParseInputValue(eigyoubi_str,"月間営業日数") == false){
        return;
    }
    var eigyoubi = parseInt(eigyoubi_str.replace(/,/g,""));

    var eigyoujikan_str = document.getElementById("eigyou_time").value;
    if(checkAndParseInputValue(eigyoujikan_str,"1日の営業時間") == false){
        return;
    }
    var eigyoujikan = parseInt(eigyoujikan_str.replace(/,/g,""));

    var premium_sejutsuhiritsu_str = document.getElementById("premium_hiritsu").value;
    if(checkAndParseInputValue(premium_sejutsuhiritsu_str,"プレミアムコース施術比率") == false){
        return;
    }
    var premium_sejutsuhiritsu = parseInt(premium_sejutsuhiritsu_str.replace(/,/g,""));

    var jinnkennhi_str= document.getElementById("personnel_cost").value;
    if(checkAndParseInputValue(jinnkennhi_str,"人件費") == false){
        return;
    }
    var jinnkennhi = parseInt(jinnkennhi_str.replace(/,/g,""));

    var yachin_str = document.getElementById("rent_cost").value;
    if(checkAndParseInputValue(yachin_str,"家賃") == false){
        return;
    }
    var yachin = parseInt(yachin_str.replace(/,/g,""));


    //以下、計算にて使用する変数宣言
    var gekkann_maxsejutsu;

    var syuueki_mikomi100_str = document.getElementById("kadou100").value;
    var syuueki_mikomi100 = parseInt(syuueki_mikomi100_str.replace(/,/g,""));

    var syuueki_mikomi80_str = document.getElementById("kadou80").value;
    var syuueki_mikomi80 = parseInt(syuueki_mikomi80_str.replace(/,/g,""));

    var syuueki_mikomi60_str = document.getElementById("kadou60").value;
    var syuueki_mikomi60 = parseInt(syuueki_mikomi60_str.replace(/,/g,""));


    var syuueki_mikomi40_str = document.getElementById("kadou40").value;
    var syuueki_mikomi40 = parseInt(syuueki_mikomi40_str.replace(/,/g,""));

    var syuueki_mikomi20_str = document.getElementById("kadou20").value;
    var syuueki_mikomi20 = parseInt(syuueki_mikomi20_str.replace(/,/g,""));

    //初期費用充足期間の変数宣言
    var juusoku100_str = document.getElementById("month100").value;
    var juusoku100 = parseInt(juusoku100_str.replace(/,/g,""));

    var juusoku80_str = document.getElementById("month80").value;
    var juusoku80 = parseInt(juusoku80_str.replace(/,/g,""));

    var juusoku60_str = document.getElementById("month60").value;
    var juusoku60 = parseInt(juusoku60_str.replace(/,/g,""));

    var juusoku40_str = document.getElementById("month40").value;
    var juusoku40 = parseInt(juusoku40_str.replace(/,/g,""));

    var juusoku20_str = document.getElementById("month20").value;
    var juusoku20 = parseInt(juusoku20_str.replace(/,/g,""));

    //計算する項目を入力する時点での条件
    if(checkInput_range(dounyuu,1,10,"ベネホワイトニング機材導入数") == false){
        return;
    }

    if(checkInput_range(eigyoubi,1,30,"月間営業日数") == false){
        return;
    }

    if(checkInput_range(eigyoujikan,1,24,"1日の営業時間") == false){
        return;
    }

    if(checkInput_range(premium_sejutsuhiritsu,1,100,"プレミアムコース施術比率") == false){
        return;
    }

    //最大施術可能数（非表示）
    gekkann_maxsejutsu = max_sejutsukanou(dounyuu,eigyoubi,eigyoujikan);
    
    //月間粗利益見込み（非表示）
    var gekkann_arari = arari_mikomi(gekkann_maxsejutsu,premium_sejutsuhiritsu);
    

    //月間収益見込みの計算（稼働率20～100%）
    syuueki_mikomi100 = syuueki_mikomicalc(100,gekkann_arari,yachin,jinnkennhi);

    syuueki_mikomi80 = syuueki_mikomicalc(80,gekkann_arari,yachin,jinnkennhi);
    
    syuueki_mikomi60 = syuueki_mikomicalc(60,gekkann_arari,yachin,jinnkennhi);

    syuueki_mikomi40 = syuueki_mikomicalc(40,gekkann_arari,yachin,jinnkennhi);

    syuueki_mikomi20 = syuueki_mikomicalc(20,gekkann_arari,yachin,jinnkennhi);

    //初期費用充足期間の計算（稼働率20～100%まで）＋計算結果をテキストボックスに表示
    juusoku100 = juusoku_kikan(dounyuu,syuueki_mikomi100);
    
    juusoku80 = juusoku_kikan(dounyuu,syuueki_mikomi80);
    
    juusoku60 = juusoku_kikan(dounyuu,syuueki_mikomi60);
    
    juusoku40 = juusoku_kikan(dounyuu,syuueki_mikomi40);
    
    juusoku20 = juusoku_kikan(dounyuu,syuueki_mikomi20);

    if(juusoku100<0){
        document.getElementById("month100").value = "";
    }
    else if(juusoku100>0){
        juusoku100_str = juusoku100.toLocaleString();
        document.getElementById("month100").value = juusoku100_str;
    }

    if(juusoku80<0){
        document.getElementById("month80").value = "";
    }
    else if(juusoku80>0){
        juusoku80_str = juusoku80.toLocaleString();
        document.getElementById("month80").value = juusoku80_str;
    }

    if(juusoku60<0){
        document.getElementById("month60").value = "";
    }
    else if(juusoku60>0){
        juusoku60_str = juusoku60.toLocaleString();
        document.getElementById("month60").value = juusoku60_str;
    }

    if(juusoku40<0){
        document.getElementById("month40").value = "";
    }
    else if(juusoku40>0){
        juusoku40_str = juusoku40.toLocaleString();
        document.getElementById("month40").value = juusoku40_str;
    }
    
    if(juusoku20<0){
        document.getElementById("month20").value = "";
    }
    else if(juusoku20>0){
        juusoku20_str = juusoku20.toLocaleString();
        document.getElementById("month20").value = juusoku20_str;
    }

    //計算結果をテキストボックスに表示
    jinnkennhi_str = jinnkennhi.toLocaleString();
    document.getElementById("personnel_cost").value = jinnkennhi_str;

    yachin_str = yachin.toLocaleString();
    document.getElementById("rent_cost").value = yachin_str;

    syuueki_mikomi100_str = syuueki_mikomi100.toLocaleString();
    document.getElementById("kadou100").value = syuueki_mikomi100_str;
    
    syuueki_mikomi80_str = syuueki_mikomi80.toLocaleString();
    document.getElementById("kadou80").value = syuueki_mikomi80_str;

    syuueki_mikomi60_str = syuueki_mikomi60.toLocaleString();
    document.getElementById("kadou60").value = syuueki_mikomi60_str;

    syuueki_mikomi40_str = syuueki_mikomi40.toLocaleString();
    document.getElementById("kadou40").value = syuueki_mikomi40_str;

    syuueki_mikomi20_str = syuueki_mikomi20.toLocaleString();
    document.getElementById("kadou20").value = syuueki_mikomi20_str;

}

    //入力値のチェック
    function checkAndParseInputValue(valuestr,columName){

        //計算する項目を入力する時点での条件
        if(valuestr==""){
            alert (columName + ' 必須項目を入力してください')
            return false;
        }

        var value = parseInt(valuestr.replace(/,/g,""));

        if(isNaN(value)){
            alert(columName + ' 必須項目を入力してください')
            return false;
        }

        if(value<0){
            alert(columName + ' 0以下の数字は入力出来ません');
            return false;
        }
        return true;
    }

   //表内の計算メソッド
    function max_sejutsukanou(dounyuu,eigyoubi,eigyoujikan){
        return dounyuu * eigyoubi * eigyoujikan;
    }

    function arari_mikomi(gekkann_maxsejutsu,premium_hiritsu){
        return 7000*(gekkann_maxsejutsu*(premium_hiritsu/100))+4000*(gekkann_maxsejutsu*(1-(premium_hiritsu/100)));
    }

    function syuueki_mikomicalc(value,gekkann_arari,yachin,jinnkennhi){
        return gekkann_arari*(value/100) - yachin - jinnkennhi; 
    }

    function juusoku_kikan(dounyuu,money){
        var month = (1540000*dounyuu)/money;
        month = month*10;
        month = Math.round(month);
        return month/10; 
    }
    
    //エラー発生時のメソッド
    function checkInput_range(value,min,max,columName){
        if(value>max || value<min){
            alert(columName + ' 範囲外の数字は入力出来ません');
            return false;
        }
        else{
            return true;
        }
    }

