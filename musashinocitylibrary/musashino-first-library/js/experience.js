const confirm = document.getElementById('confirmdate');
const yourname = document.getElementById('yourname');
const grade = document.querySelector('select');
const email = document.getElementById('email');
const tel1 = document.getElementById('tel1');
const tel2 = document.getElementById('tel2');
const tel3 = document.getElementById('tel3');
const teltype = document.getElementById('teltype1');
const postal = document.getElementById('zipcode');
const prefecture = document.getElementById('prefecture');
const city = document.getElementById('city');
const address = document.getElementById('address');


const func1 = () => {
    const nameval = yourname.value;
    const gradeval = grade.value;
    const emailval = email.value;
    const postalval = postal.value;
    const addressval = prefecture.value + city.value + address.value;
    const telval1 = tel1.value;
    const telval2 = tel2.value;
    const telval3 = tel3.value;
    let teltypeval;
        if(teltype.checked){
        teltypeval = '自宅';
    }else{
        teltypeval = '保護者携帯';
    }

    let str = "";
    const date = document.getElementsByName("date1");

    for (let i = 0; i < date.length; i++){
        if(date[i].checked){
            str = date[i].value;
            break;
        }
    }
    confirm.innerHTML = "<ul><li>名前：" + nameval + "</li><li>学年：" + gradeval + "</li><li>郵便番号：" + postalval + "</li><li>住所：" + addressval + "</li><li>メールアドレス：" + emailval + "</li><li>電話番号：" + telval1 + "-" + telval2 + "-" + telval3 + "（" + teltypeval + "）</li><li>日程：" + str + "</li></ul>";
    console.log(confirm.innerHTML);
};

//住所検索

//読み込み完了後に実行する
$(function() {
    //#btnがクリックされたとき
    $('#btn').on('click', function(){
        $.ajax({
            //リクエスト先のURLを設定
            url: "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + $('#zipcode').val(),
            //レスポンスのデータ形式を設定
            dataType : 'jsonp',
        }).done(function(data){
            //通信が成功したときの処理
            if(data.results){
                //データが取得できたとき、setData関数を呼び出す
                setData(data.results[0]);
            }else{
                alert("該当するデータが見つかりませんでした");
            }
        }).fail(function(data){
            //通信が失敗したときの処理
            alert("通信に失敗しました");
        });
    });
});

function setData(data){
    //取得データを各HTML要素に代入

    $('#prefecture').val(data.address1);
    $('#city').val(data.address2);
    $('#address').val(data.address3);

}