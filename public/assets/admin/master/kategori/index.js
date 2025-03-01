let table = $("#tabel-kategori").DataTable({
    ajax: {
        url: baseUrl("/fetch/kategori"),
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
            width: "20px",
        },
        {
            data: "nama",
            width: "50px",
        },
        {
            data: "id",
            render: function (data, i, row) {
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
            width: "45px",
        },
    ],
    createdRow: function (row, data) {
        $(".action-edit", row).on("click", function (e) {
            e.preventDefault();

            $("input[name='id']").val(data.id);
            $("input[name='nama']").val(data.nama);

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
                        url: baseUrl(`/kategori/${data.id}`),
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

// => Tambah Kategori
$("#set-kategori").on("click", function () {
    $("#modal-form").modal("show");
    $("input[name='nama']").val("");
});

$("#form-submit").on("submit", (e) => {
    e.preventDefault();

    let id = $("input[name='id']").val();
    let url =
        id == undefined || id == ""
            ? baseUrl("/kategori/create")
            : baseUrl("/kategori/update");
    let method = id == undefined || id == "" ? "POST" : "PUT";

    $.httpRequest({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            id: $("input[name='id']").val(),
            nama: $("input[name='nama']").val(),
        }),
        response: (res) => {
            if (res.statusCode == 200) {
                table.ajax.reload();
                $("#modal-form").modal("hide");
                if (method == "POST") {
                    swal(
                        "success",
                        "Berhasil!",
                        "Berhasil Membuat Data Kategori!"
                    );
                } else {
                    swal(
                        "success",
                        "Berhasil!",
                        "Berhasil Mengupdate Data Kategori!"
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
