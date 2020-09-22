//获取当前时间
export function getTime(time) {
    let time1 = time * 1000;// 13位不用乘1000
    let time2 = new Date(time1);
    var year = time2.getFullYear();
    var month = time2.getMonth() + 1;
    var date = time2.getDate();
    var hour = time2.getHours();
    var minute = time2.getMinutes();
    var second = time2.getSeconds();
    return year + "年" + month + "月" + date + "日   " + hour + ":" + minute + ":" + second;
}

//格式化时间
export function formatDate(time) {
    if (!time) {
        return "";
    }

    let date = new Date(time);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

//时间戳转换日期
export function timestampToTime(time) {
    var date = new Date((time) * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + "-";
    var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    var h = date.getHours() + ":";
    var m = date.getMinutes() + ":";
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}

//日期转换时间戳（默认13位）
export function timeToTimestamp(data, num) {
    const date = new Date(data);
    let timestamp = date.getTime();

    //10位时间戳
    if (num === 10) {
        timestamp = timestamp / 1000;
    }
    return timestamp;
}
