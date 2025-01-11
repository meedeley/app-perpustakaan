<x-modal id="modal-anggota">
    <div class="card">
        <div class="card-header py-3">
            <h4 class="my-0">Kartu Anggota Perpustakaan</h4>
        </div>
        <div class="card-body">
            <h5 class="card-title text-center mb-4">Perpustakaan SDN 3 Katekan</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Nama:</span>
                    <span id="nama-anggota">Nama Contoh</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Kode Anggota:</span>
                    <span id="kode-anggota">12345678</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span class="fw-bold">Email:</span>
                    <span id="email-anggota">email@example.com</span>
                </li>
            </ul>
            <div class="mt-3 text-center">
                <span class="fw-bold">Passsword:</span>
                <small class="text-muted" id="password-anggota">password123</small>
            </div>
        </div>
        <div class="card-footer text-center">
            <small>Berlaku Selama Menjadi Siswa/Siswi SDN 3 Katekan</small>
        </div>
        <div class="card-footer text-center">
            <a href="#" class="btn btn-primary" onclick="printCard()">CETAK KARTU</a>
        </div>
    </div>

    <script>
        function printCard() {
            const printContent = document.querySelector('#modal-anggota .card'); // Ambil elemen yang ingin dicetak
            const printWindow = window.open('', '_blank'); // Buka window baru untuk mencetak

            printWindow.document.write(`
                <html>
                    <head>
                        <title>Cetak Kartu</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 20px;
                            }
                            .card {
                                border: 1px solid #000;
                                padding: 20px;
                                width: 300px;
                                margin: auto;
                            }
                            .header {
                                text-align: center;
                            }
                            .details {
                                margin-top: 10px;
                            }
                        </style>
                    </head>
                    <body>${printContent.outerHTML}</body>
                </html>
            `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print(); // Cetak konten
            printWindow.close(); // Tutup jendela setelah mencetak
        }
    </script>
</x-modal>
