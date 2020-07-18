module.exports = function (string)
{
    // Chuyển hết sang chữ thường
    return string
    .toString()
    .toLowerCase() 
    .replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    .replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    .replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    .replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    .replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    .replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    .replace(/(đ)/g, 'd')
    // Xóa ký tự đặc biệt
    .replace(/([^0-9a-z-\s])/g, '')
    // Replace & with 'and'
    .replace(/&/g, "-and-")
    // Xóa khoảng trắng thay bằng ký tự -
    .replace(/(\s+)/g, '-')
    // xóa phần dự - ở đầu
    .replace(/^-+/g, '')
    // xóa phần dư - ở cuối
    .replace(/-+$/g, '')
}

// function slugify(string) {
//   const a =
//     "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
//   const b =
//     "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
//   const p = new RegExp(a.split("").join("|"), "g");

//   return string
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, "-") // Replace spaces with -
//     .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
//     .replace(/&/g, "-and-") // Replace & with 'and'
//     .replace(/[^\w\-]+/g, "") // Remove all non-word characters
//     .replace(/\-\-+/g, "-") // Replace multiple - with single -
//     .replace(/^-+/, "") // Trim - from start of text
//     .replace(/-+$/, ""); // Trim - from end of text
// }