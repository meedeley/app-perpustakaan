<x-app-layout>

    <h1 class="text-2xl font-semibold"># Halaman Buku</h1>

    @include('admin.master.buku.modal')

    <div class="container pt-5">

        <div class="d-flex justify-content-end pb-4">
            <button id="set-buku" class="btn btn-primary">Tambah Buku</button>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card py-4 px-4">
                    <table id="tabel-buku" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Buku</th>
                                <th>Judul Buku</th>
                                <th>Pengarang</th>
                                <th>Tahun</th>
                                <th>Kategori</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('assets/admin/master/buku/index.js') }}"></script>
</x-app-layout>
