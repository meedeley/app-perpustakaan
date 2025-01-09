let table = $("#tabel-kategori").DataTable({
    ajax: {
        url: baseUrl("/fetch"),
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

        $(".action-hapus", row).click(function (e) {
            e.preventDefault();
            Swal.fire({
                icon : "error",
                title: "Peringatan !",
                text: `Anda yakin akan menghapus data ini ??`,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#993333",
                cancelButtonColor: "#5d5d5d",
                cancelButtonText: "Tidak",
                confirmButtonText: "Hapus",
            }).then(
                function () {
                    $.httpRequest({
                        url: baseUrl(`/kategori/${data.id}`),
                        method: "DELETE",
                        response: (res) => {
                            if (res.statusCode == 200) {
                                swal("success", "Berhasil!" ,res.message);
                                table.ajax.reload();
                            }
                        },
                    });
                },
                function (dismiss) {
                    if (dismiss === "cancel") {
                    }
                }
            );
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

    let id = $("input[name='id']").lenght;
    let url =
        id > 0  || id == undefined ? baseUrl("/kategori/create") : baseUrl("/kategori/update");
    let method = url > 0 || id == undefined ? "POST" : "PUT";

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

                swal("success", "Berhasil!", res.message);
            } else {
                table.ajax.reload();
                swal("error", "Gagal", res.message);
                $("#modal-form").modal("hide");
            }
        },
    });
});

$("#simpan").on("click", (e) => {
    $("#form-submit").trigger("submit");
});
