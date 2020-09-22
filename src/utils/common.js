export function getOS() {
    if (navigator.userAgent.indexOf("Window") > 0) {
        return "Windows";
    } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {
        return "Mac ";
    } else if (navigator.userAgent.indexOf("Linux") > 0) {
        return "Linux";
    } else {
        return "NUll";
    }
}
