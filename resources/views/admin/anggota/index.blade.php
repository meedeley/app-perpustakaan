<x-app-layout>

    <h1 class="text-2xl font-semibold"># Halaman Buku</h1>

    @include('admin.anggota.modal')
    @include('admin.anggota.kartu')

    <div class="container pt-5">

        <div class="d-flex justify-content-end pb-4">
            <button id="set-modal" class="btn btn-primary">Tambah Anggota</button>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card py-4 px-4">
                    <table id="tabel-anggota" class="table table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Kode Anggota</th>
                                <th>Nama Anggota</th>
                                <th>Jenis Kelamin</th>
                                <th>No HP</th>
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

    <script src="{{ asset('assets/admin/anggota/index.js') }}"></script>
</x-app-layout>
