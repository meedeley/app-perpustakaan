<x-modal id="modal-form" title="Form Peminjaman">
    <form id="form-submit">
        @csrf

        <x-form-input type="hidden" name="id" />

        <div class="py-2">
            <x-form-label label="Kode Pinjam" />
            <x-form-input name="kode_pinjam" placeholder="Kode Peminjaman" />
        </div>

        <div class="py-2">
            <x-form-label label="Tanggal Pinjam" />
            <x-form-input type="date" name="tanggal_pinjam" placeholder="Tanggal Pinjam" />
        </div>

        <div class="py-2">
            <x-form-label label="Jatuh Tempo" />
            <x-form-input type="date" name="jatuh_tempo" placeholder="Jatuh Tempo" />
        </div>

        <div class="py-2">
            <x-form-label label="Pilih Buku" />
            <select class="form-control" name="buku" id="buku">
            </select>
        </div>

        <div class="py-2">
            <x-form-label label="Pilih Anggota" />
            <select class="form-control" name="anggota" id="anggota">
            </select>
        </div>

    </form>
</x-modal>
