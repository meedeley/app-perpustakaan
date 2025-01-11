let table = $("#tabel-anggota").DataTable({
    ajax: {
        url: baseUrl("/fetch/anggota"),
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
            render: (data, i, row, meta) => {
                return meta.row + 1;
            },
        },
        {
            data: "kode_anggota"
        },
        {
            data: "nama_anggota",
        },
        {
            data: "jenis_kelamin",
        },
        {
            data: "no_hp",
        },
        {
            data: "id",
            render: function (data, i, row) {
                let div = document.createElement("div");
                div.className = "d-flex gap-2 row-action";

                // => Create Edit Button
                let edit = document.createElement("button");
                edit.className = "btn btn-success action-edit";
                edit.innerHTML = "Edit";

                div.append(edit);

                let detail = document.createElement("button");
                detail.className = "btn btn-primary action-cetak";
                detail.innerHTML = "Cetak";

                div.append(detail);

                // => Create Delete Button
                let hapus = document.createElement("button");
                hapus.className = "btn btn-danger action-hapus";
                hapus.innerHTML = "Hapus";

                div.append(hapus);

                return div.outerHTML;
            },
        },
    ],
    createdRow: function (row, data) {
        $(".action-edit", row).on("click", function (e) {
            e.preventDefault();

            let jenis_kelamin = $("#jenis_kelamin");

            jenis_kelamin.empty();

            jenis_kelamin.append(`
                <option selected>-- Pilih Jenis Kelamin--</option>
                <option value='laki-laki'>Laki Laki</option>
                <option value='perempuan'>Perempuan</option>
            `);

            jenis_kelamin.val(data.jenis_kelamin);

            $("input[name='id']").val(data.id);
            $("input[name='username']").val(data.username);
            $("input[name='email']").val(data.email);
            $("input[name='password']").val(data.password);
            $("input[name='kode_anggota']").val(data.kode_anggota);
            $("input[name='nama_anggota']").val(data.nama_anggota);
            $("input[name='no_hp']").val(data.no_hp);

            $("#modal-form").modal("show");
        });

        $(".action-cetak", row).on("click", function (e) {

            $.httpRequest({
                url:baseUrl(`/print-modal/${data.id}`),
                method: "POST",
                contentType : "application/json",
                response : (res) => {
                    if(res.statusCode == 200) {

                        // console.log(res.data.);
                        let panjang =  $("#nama-anggota").text("AAAAAAAAAAAA");


                       $("#nama-anggota").text(res.data.nama_anggota);
                        $("#kode-anggota").text(res.data.kode_anggota);
                        $("#email-anggota").text(res.data.email);
                        $("#password").text(res.data.password);
                    }
                }
            });
            $("#modal-anggota").modal("show");
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
                        url: baseUrl(`/anggota/${data.id}`),
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

$("#set-modal").on("click", () => {
    let jenis_kelamin = $("#jenis_kelamin");

    jenis_kelamin.empty();
    jenis_kelamin.append(`
    <option selected>-- Pilih Jenis Kelamin--</option>
    <option value='laki-laki'>Laki Laki</option>
    <option value='perempuan'>Perempuan</option>
    `);

    $("input[name='id']").val("");
    $("input[name='username']").val("");
    $("input[name='email']").val("");
    $("input[name='password']").val("");
    $("input[name='kode_anggota']").val("");
    $("input[name='nama_anggota']").val("");
    $("input[name='no_hp']").val("");

    $("#modal-form").modal("show");
});

$("#form-submit").on("submit", (e) => {
    e.preventDefault();

    let id = $("input[name='id']").val();
    let url =
        id == undefined || id == ""
            ? baseUrl("/anggota/create")
            : baseUrl("/anggota/update");
    let method = id == undefined || id == "" ? "POST" : "PUT";

    $.httpRequest({
        url: url,
        method: method,
        contentType: "application/json",
        data: JSON.stringify({
            id: id,
            username: $("input[name='username']").val(),
            email: $("input[name='email']").val(),
            password: $("input[name='password']").val(),

            kode_anggota: $("input[name='kode_anggota']").val(),
            nama_anggota: $("input[name='nama_anggota']").val(),
            jenis_kelamin: $("select[name='jenis_kelamin']").val(),
            no_hp: $("input[name='no_hp']").val(),
        }),
        response: (res) => {
            if (res.statusCode == 200) {
                table.ajax.reload();
                $("#modal-form").modal("hide");
                if (method == "POST") {
                    swal("success", "Berhasil!", "Berhasil Membuat Data Buku!");
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
