// => Helper HttpRequest AJAX
$.httpRequest = function ({
    url,
    method,
    data = null,
    contentType = false,
    processData = false,
    response: cb,
}) {
    $.ajax({
        url: url,
        type: method,
        headers: { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") },
        data: data,
        dataType: "json",
        processData: processData,
        contentType: contentType,
        async: true,
    }).always((res) => {
        typeof res["responseJSON"] === "undefined"
            ? cb(res)
            : cb(res.responseJSON);
    });
};

// => Helper Get Cookie
const getCookie = (key) => {
    const name = key + "=";
    const decode = decodeURIComponent(document.cookie); //to be careful
    const arrResult = decode.split("; ");
    let result;

    arrResult.forEach((val) => {
        if (val.indexOf(name) === 0) result = val.substring(name.length);
    });

    return result;
};

// => BaseURL Helper ORIGIN
const baseUrl = (uri) => {
    let url = window.location.origin;
    let prefix = "/administrator";
    return url + prefix + uri;
};

const swal = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500
    });
}
