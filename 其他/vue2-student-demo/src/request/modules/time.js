

const time = {
    timePut(date) {
        // date=Wed Jul 13 2022 17:13:05 GMT+0800 (中国标准时间)
        let b = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let a = date.split(' ')
        let yu = b.indexOf(a[1]) + 1
        let format = `${a[3]}年${yu}月${a[2]}日-${a[4]}`;
        return format
    }
}
export default time