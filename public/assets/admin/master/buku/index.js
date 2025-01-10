let table = $("#tabel-buku").DataTable({
    ajax: {
        url: baseUrl("/fetch/buku"),
        headers: {
            "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
        },
        dataSrc: "data",
        type: "POST",
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
            render: function (data, i, row, meta) {
                return meta.row + 1;
            },
        },
        {
            data: "kode_buku",
        },
        {
            data: "judul_buku",
        },
        {
            data: "pengarang",
        },
        {
            data: "tahun",
        },
        {
            data: "kategori",
        },
        {
            data: "id",
            render: function () {
                // => Create Container Button
                let div = document.createElement("div");
                div.className = "d-flex gap-2 row-action";

                // => Create Edit Button
                let edit = document.createElement("button");
                edit.className = "btn btn-success action-edit";
                edit.innerHTML = "Edit";

                div.append(edit);

                // => Create Delete Button
                let hapus = document.createElement("button");
                hapus.className = "btn btn-danger action-hapus";
                hapus.innerHTML = "Hapus";

                div.append(hapus);

                return div.outerHTML;
            },
        },
    ],
    createdRow: (row, data) => {
        $(".action-edit", row).on("click", function (e) {
            e.preventDefault();

            $("input[name='id']").val(data.id);
            $("input[name='kode_buku']").val(data.kode_buku),
                $("input[name='judul_buku']").val(data.judul_buku),
                $("input[name='pengarang']").val(data.pengarang),
                $("input[name='tahun']").val(data.tahun),
                $("#kategori").val(data.kategori_id),

                $.httpRequest({
                    url: baseUrl("/select/kategori"),
                    method: "GET",
                    contentType: "application/json",
                    response: (res) => {
                        if (res.statusCode == 200) {
                            let select = $("#kategori");

                            res.data.forEach((data) => {
                                select.append(
                                    `<option value="${data.id}">${data.nama}</option>`
                                );
                            });
                        }
                    },
                });

            $("#modal-form").modal("show");
        });

        $(".action-hapus", row).on("click", function (e) {
            e.preventDefault();
            Swal.fire({
                icon: "error",
                title: "Peringatan !",
                text: `Anda yakin akan menghapus data ini ??`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#993333",
                cancelButtonColor: "#5d5d5d",
                cancelButtonText: "Tidak",
                confirmButtonText: "Hapus",
            }).then((result) => {
                if (result.isConfirmed) {
                    $.httpRequest({
                        url: baseUrl(`/buku/${data.id}`),
                        method: "DELETE",
                        response: (res) => {
                            if (res.statusCode == 200) {
                                swal("success", "Berhasil!", res.message);
                                table.ajax.reload();
                            }
                        },
                    });
                } else {
                    swal("info", "Batal", "Aksi Hapus Di Batalkan");
                }
            });
        });
    },
});

$("#set-buku").on("click", () => {
    $("input[name='kode_buku']").val(""),
        $("input[name='judul_buku']").val(""),
        $("input[name='pengarang']").val(""),
        $("tahun[name='tahun']").val(""),
        // => GET KODE BUKU
        $.httpRequest({
            url: baseUrl("/kode-buku"),
            method: "GET",
            contentType: "application/json",
            response: (res) => {
                if (res.statusCode == 200) {
                    $("input[name='kode_buku']").val(res.code);
                }
            },
        });

    // => GET DATA KATEGORI
    $.httpRequest({
        url: baseUrl("/select/kategori"),
        method: "GET",
        contentType: "application/json",
        response: (res) => {
            if (res.statusCode == 200) {
                let select = $("#kategori");

                select.empty();
                select.append("<option selected>-- Pilih Kategori --</option>");

                res.data.forEach((data) => {
                    select.append(
                        `<option value="${data.id}">${data.nama}</option>`
                    );
                });
            }
        },
    });

    // => Year Picker
    $("input[name='tahun']").yearpicker();

    $("#modal-form").modal("show");
});

$("#form-submit").on("submit", (e) => {
    e.preventDefault();

    let id = $("input[name='id']").val();
    let url =
        id == undefined || id == ""
            ? baseUrl("/buku/create")
            : baseUrl("/buku/update");
    let method = id == undefined || id == "" ? "POST" : "PUT";

    $.httpRequest({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            id: id,
            kode_buku: $("input[name='kode_buku']").val(),
            judul_buku: $("input[name='judul_buku']").val(),
            pengarang: $("input[name='pengarang']").val(),
            tahun: $("input[name='tahun']").val(),
            kategori: $("select[name='kategori']").val(),
        }),
        response: (res) => {
            if (res.statusCode == 200) {
                table.ajax.reload();
                $("#modal-form").modal("hide");
                if (method == "POST") {
                    swal(
                        "success",
                        "Berhasil!",
                        "Berhasil Membuat Data Buku!"
                    );
                } else {
                    swal(
                        "success",
                        "Berhasil!",
                        "Berhasil Mengupdate Data Buku!"
                    );
                }
            } else {
                if (res.statusCode == 409) {
                    table.ajax.reload();
                    swal("error", "Gagal", "Mohon isi form dengan benar");
                    $("#modal-form").modal("hide");
                } else {
                    table.ajax.reload();
                    swal("error", "Gagal", res.message);
                    $("#modal-form").modal("hide");
                }
            }
        },
    });
});

$("#simpan").on("click", (e) => {
    $("#form-submit").trigger("submit");
});



