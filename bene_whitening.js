
function calcStart(){
    
    //変数を宣言(文字型を数字型に変換)
    var dounyuu_str = document.getElementById("dounyuu_number").value;
    var dounyuu = parseInt(dounyuu_str.replace(/,/g,""));
    if(checkInputNan(dounyuu,"ベネホワイトニング機材導入数") == false){
        return;
    }
    if(checkInputValue(dounyuu,"ベネホワイトニング機材導入数") == false){
        return;
    }
    
    var eigyoubi_str = document.getElementById("eigyou_number").value;
    var eigyoubi = parseInt(eigyoubi_str.replace(/,/g,""));
    if(checkInputNan(eigyoubi,"月間営業数") == false){
        return;
    }
    if(checkInputValue(eigyoubi,"月間営業数") == false){
        return;
    }

    var eigyoujikan_str = document.getElementById("eigyou_time").value;
    var eigyoujikan = parseInt(eigyoujikan_str.replace(/,/g,""));
    if(checkInputNan(eigyoujikan,"日の営業時間") == false){
        return;
    }
    if(checkInputValue(eigyoujikan,"日の営業時間") == false){
        return;
    }

    var kadouritsu_str = document.getElementById("operation_percent").value;
    var kadouritsu = parseInt(kadouritsu_str.replace(/,/g,""));
    if(checkInputNan(kadouritsu,"想定稼働率") == false){
        return;
    }
    if(checkInputValue(kadouritsu,"想定稼働率") == false){
        return;
    }

    var jinnkennhi_str= document.getElementById("personnel_cost").value;
    var jinnkennhi = parseInt(jinnkennhi_str.replace(/,/g,""));
    if(checkInputNan(jinnkennhi,"人件費") == false){
        return;
    }
    if(checkInputValue(jinnkennhi,"人件費") == false){
        return;
    }
   

    var yachin_str = document.getElementById("rent_cost").value;
    var yachin = parseInt(yachin_str.replace(/,/g,""));
    if(checkInputNan(yachin,"家賃") == false){
        return;
    }
    if(checkInputValue(yachin,"家賃") == false){
        return;
    }

    var gekkann_maxsejutsu_str = document.getElementById("max_sejutsu").value;
    var gekkann_maxsejutsu = parseInt(gekkann_maxsejutsu_str.replace(/,/g,""));

    var gekkann_arari_str = String(gekkann_arari_str);
    var gekkann_arari = parseInt(gekkann_arari_str.replace(/,/g,""));

    var month_str = String(month_str);
    var month = parseInt(month_str.replace(/,/g,""));

    var gekkann_rieki_str = document.getElementById("monthly_rieki").value;
    var gekkan_rieki = parseInt(gekkann_rieki_str.replace(/,/g,""));

    var juusoku_kikan_str = document.getElementById("juusoku_month").value;
    var juusoku_kikan = parseInt(juusoku_kikan_str.replace(/,/g,""));

    //計算する項目を入力する時点での条件
    if(checkInput_range(dounyuu,1,10,"ベネホワイトニング機材導入数") == false){
        return;
    }

    if(checkInput_range(eigyoubi,1,30,"月間営業数") == false){
        return;
    }

    if(checkInput_range(eigyoujikan,2,24,"日の営業時間") == false){
        return;
    }

    if(checkInput_range(kadouritsu,10,100,"想定稼働率") == false){
        return;
    }

    //最大施術可能数
    gekkann_maxsejutsu = max_sejutsukanou(dounyuu,eigyoubi,eigyoujikan);
    
    //初期費用充足期間の計算に使用する月間粗利益見込み
    gekkann_arari = arari_mikomi(gekkann_maxsejutsu,kadouritsu);
    
    //初期費用充足期間に使う計算
    month = juusoku(dounyuu,gekkann_arari);
    
    //月間売上見込み（人件費と家賃を除算）
    gekkan_rieki = rieki_mikomi(gekkann_arari,jinnkennhi,yachin);
    
    //初期費用充足期間（人件費と家賃を除算した月間売上見込みと導入数から計算
    juusoku_kikan = syokitoushi_juusoku(dounyuu,gekkan_rieki);

    //計算結果がマイナスになった時の条件分岐
    if(gekkan_rieki<0 || juusoku_kikan<0){
        alert ('計算結果がマイナスのため、表示出来ません')
        return;
    }

    //数字型を文字型に変換（小数に変換）
    gekkann_maxsejutsu_str = gekkann_maxsejutsu.toLocaleString();
    document.getElementById("max_sejutsu").value = gekkann_maxsejutsu_str;

    jinnkennhi_str = jinnkennhi.toLocaleString();
    document.getElementById("personnel_cost").value = jinnkennhi_str;

    yachin_str = yachin.toLocaleString();
    document.getElementById("rent_cost").value = yachin_str;
    
    gekkan_rieki_str = gekkan_rieki.toLocaleString();
    document.getElementById("monthly_rieki").value = gekkan_rieki_str;

    juusoku_kikan_str = juusoku_kikan.toLocaleString();
    document.getElementById("juusoku_month").value = juusoku_kikan_str;

}

    function checkInputNan(value,columName){
    if(!value){
        true;
    }
    else if(!isNaN(value))
        true;
    else{
        alert(columName +" 数値以外は入力出来ません");
        return false;
        }
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
    function max_sejutsukanou(dounyuu,eigyoubi,eigyoujikan){
        return dounyuu * eigyoubi * eigyoujikan;
    }

    function arari_mikomi(gekkann_maxsejutsu,kadouritsu){
        return gekkann_maxsejutsu * 5000 * (kadouritsu/100);
    }

    function juusoku(dounyuu,gekkann_arari){
        month = (1540000 * dounyuu)/gekkann_arari;
        month = month *10;
        month = Math.round(month);
        return month/10;
    }

    function rieki_mikomi(gekkann_arari,jinnkennhi,yachin){
        return gekkann_arari - jinnkennhi - yachin;
    }

    function syokitoushi_juusoku(dounyuu,gekkan_rieki){
        juusoku_kikan = (1540000 * dounyuu)/gekkan_rieki;
        juusoku_kikan = juusoku_kikan *10;
        juusoku_kikan = Math.round(juusoku_kikan);
        return juusoku_kikan/10;
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

