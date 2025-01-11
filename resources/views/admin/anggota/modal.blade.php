<x-modal id="modal-form" title="Form Anggota">
    <form id="form-submit">
        @csrf

        <x-form-input type="hidden" name="id" />

        <div class="row">
            <div class="col-6">
                <div>
                    <x-form-label label="Username" />
                    <x-form-input name="username" placeholder="Username Anggota" />
                </div>
            </div>

            <div class="col-6">
                <div>
                    <x-form-label label="Email" />
                    <x-form-input type="email" name="email" placeholder="Email Anggota" />
                </div>
            </div>

            <div class="col-12 py-2">
                <div>
                    <x-form-label label="Password" />
                    <x-form-input name="password" placeholder="Password" />
                </div>
            </div>
        </div>


        <div class="py-2">
            <x-form-label label="Kode Anggota" />
            <x-form-input name="kode_anggota" placeholder="Kode Anggota" />
        </div>

        <div class="py-2">
            <x-form-label label="Nama Anggota" />
            <x-form-input name="nama_anggota" placeholder="Nama Anggota" />
        </div>

        <div class="py-2">
            <x-form-label label="Jenis Kelamin" />
            <select class="form-control" name="jenis_kelamin" id="jenis_kelamin">
                <option selected>-- Pilih Jenis Kelamin ---</option>
            </select>
        </div>

        <div class="py-2">
            <x-form-label label="No HP" />
            <x-form-input type="tel" name="no_hp" placeholder="No HP" />
        </div>
    </form>
</x-modal>
