let table = $("#tabel-peminjam").DataTable({
    ajax: {
        url: baseUrl("/fetch/pinjam"),
        headers: {
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        dataSrc: "data",
        type: "GET",
    },
    processing: true,
    serverSide: true,
    paging: true,
    lengthChange: true,
    searching: true,
    ordering: true,
    order: [],
    info: true,
    autoWidth: false,
    columns: [
        {
            name: "",
            render: (data, i, row, meta) => {
                return meta.row + 1;
            },
        },
        {
            data: "kode_peminjaman",
        },
        {
            data: "tanggal_pinjam",
        },
        {
            data: "jatuh_tempo",
        },
        {
            data: "judul_buku",
        },
        {
            data: "nama_anggota",
        },
    ],
});

$("#set-pinjam").on("click", (e) => {
    e.preventDefault();

    $("input[name='kode_pinjam']").val('');
    $("input[name='tanggal_pinjam']").val('');
    $("input[name='jatuh_tempo']").val('');
    $("#buku").empty();
    $("#anggota").empty();

    $.httpRequest({
        url: baseUrl("/select/buku"),
        method: "GET",
        contentType: "application/json",
        response: (res) => {
            if (res.statusCode == 200) {
                let select = $("#buku");

                select.append(`<option selected>-- Pilih Buku --</option>`);

                res.data.forEach((data) => {
                    select.append(
                        `<option value="${data.id}">${data.judul_buku}</option>`
                    );
                });
            }
        },
    });

    $.httpRequest({
        url: baseUrl("/select/anggota"),
        method: "GET",
        contentType: "application/json",
        response: (res) => {
            if (res.statusCode == 200) {
                let select = $("#anggota");

                select.append(`<option selected>-- Pilih Anggota --</option>`);

                res.data.forEach((data) => {
                    select.append(
                        `<option value="${data.id}">${data.nama_anggota}</option>`
                    );
                });
            }
        },
    });
    $("#modal-form").modal("show");
});

$("#form-submit").on("submit", (e) => {
    e.preventDefault();

    $.httpRequest({
        url: baseUrl("/pinjam/create"),
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            kode_pinjam: $("input[name='kode_pinjam']").val(),
            tanggal_pinjam: $("input[name='tanggal_pinjam']").val(),
            jatuh_tempo: $("input[name='jatuh_tempo']").val(),
            buku: $("#buku").val(),
            anggota: $("#anggota").val(),
        }),
        response: (res) => {
            if (res.statusCode == 200) {
                table.ajax.reload();

                swal("success", "Sukses!", "Sukses menambahkan data pinjaman");
                $("#modal-form").modal("hide");
            } else {
                console.log(res);
                table.ajax.reload();

                swal("error", "Gagal!", "Gagal menambahkan data pinjaman");
                $("#modal-form").modal("hide");
            }
        },
    });
});

$("#simpan").on("click", (e) => {
    $("#form-submit").trigger("submit");
});
