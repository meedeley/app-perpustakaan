<x-app-layout>

    <h1 class="text-2xl font-semibold"># Halaman Peminjaman</h1>

    @include('admin.pinjaman.modal')

    <div class="container pt-5">

        <div class="d-flex justify-content-end pb-4">
            <button id="set-pinjam" class="btn btn-primary">Tambah Peminjaman</button>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card py-4 px-4">
                    <table id="tabel-peminjam" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Pinjam</th>
                                <th>Tanggal Pinjam</th>
                                <th>Jatuh Tempo</th>
                                <th>Judul Buku</th>
                                <th>Anggota</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/admin/peminjam/index.js') }}"></script>
</x-app-layout>
