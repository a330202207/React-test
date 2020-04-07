export default {

    //格式化时间
    formatDate(time) {
        if (!time) {
            return ''
        }

        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },

    //时间戳转换(10位)

    getTime(time) {
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
}