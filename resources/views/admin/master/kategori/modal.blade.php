<x-modal id="modal-form" title="Form Kategori">
    <form id="form-submit">
        @csrf
        <x-form-input type="hidden" name="id"/>
        <x-form-label label="Nama Kategori" />
        <x-form-input name="nama" id="name" placeholder="Nama Kategori" />
    </form>
</x-modal>
