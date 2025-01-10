<x-modal id="modal-form" title="Form Buku">
    <form id="form-submit">
        @csrf

        <x-form-input type="hidden" name="id" />

        <div class="py-2">
            <x-form-label label="Kode Buku" />
            <x-form-input name="kode_buku" placeholder="Kode Buku" />
        </div>

        <div class="py-2">
            <x-form-label label="Judul Buku" />
            <x-form-input name="judul_buku" placeholder="Nama Buku" />
        </div>

        <div class="py-2">
            <x-form-label label="Pengarang" />
            <x-form-input name="pengarang" placeholder="Pengarang" />
        </div>


        <div class="py-2">
            <x-form-label label="Tahun" />
            <x-form-input name="tahun" id="yearpicker" placeholder="Tahun" />
        </div>

        <div class="py-2">
            <x-form-label label="Pilih Kategori" />
            <select class="form-control" name="kategori" id="kategori">
            </select>
        </div>

    </form>
</x-modal>
