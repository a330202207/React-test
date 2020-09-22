//base64转file
export function base64toFile(base64Data, filename) {
    let arr = base64Data.split(","), mime = arr[0].match(/:(.*?);/)[1],
        blobStr = atob(arr[1]), n = blobStr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = blobStr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type: mime});
}

//base64转blob
export function base64toBlob(base64Data) {
    let arr = base64Data.split(","),
        fileType = arr[0].match(/:(.*?);/)[1],
        blobStr = atob(arr[1]),
        l = blobStr.length,
        u8Arr = new Uint8Array(l);

    while (l--) {
        u8Arr[l] = blobStr.charCodeAt(l);
    }
    return new Blob([u8Arr], {
        type: fileType
    });
}

//blob转file
export function blobToFile(newBlob, fileName) {
    newBlob.lastModifiedDate = new Date();
    newBlob.name = fileName;
    return newBlob;
}
