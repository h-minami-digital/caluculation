
function calcStart(){
    console.log("kinki");
    //変数を宣言(文字型を数字型に変換)
    var dounyuu_str = document.getElementById("dounyuu_number").value;
    if(checkAndParseInputValue(dounyuu_str,"ベネホワイトニング機材導入数") == false){
        return;
    }
    var dounyuu = parseInt(dounyuu_str.replace(/,/g,""));
    
    var eigyoubi_str = document.getElementById("eigyou_number").value;
    if(checkAndParseInputValue(eigyoubi_str,"月間営業数") == false){
        return;
    }
    var eigyoubi = parseInt(eigyoubi_str.replace(/,/g,""));

    var eigyoujikan_str = document.getElementById("eigyou_time").value;
    if(checkAndParseInputValue(eigyoujikan_str,"日の営業時間") == false){
        return;
    }
    var eigyoujikan = parseInt(eigyoujikan_str.replace(/,/g,""));

    var kadouritsu_str = document.getElementById("operation_percent").value;
    if(checkAndParseInputValue(kadouritsu_str,"想定稼働率") == false){
        return;
    }
    var kadouritsu = parseInt(kadouritsu_str.replace(/,/g,""));

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

    if(checkInput_range(eigyoujikan,1,24,"日の営業時間") == false){
        return;
    }

    if(checkInput_range(kadouritsu,1,100,"想定稼働率") == false){
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

