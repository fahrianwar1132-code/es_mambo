// ============================================
// ES MAMBO
// JAVASCRIPT
// ============================================


// ============================================
// PENGATURAN
// ============================================

// GANTI NOMOR INI DENGAN NOMOR WHATSAPP TUJUAN
// Contoh Indonesia:
// 081234567890
// menjadi:
// 6281234567890

const nomorWhatsApp = "628983822849";


// Harga semua Es Mambo

const hargaEsMambo = 2000;


// Tempat menyimpan pesanan

let pesanan = {};


// ============================================
// TAMBAH PESANAN
// ============================================

function tambahPesanan(rasa) {

    // Kalau rasa belum ada

    if (!pesanan[rasa]) {

        pesanan[rasa] = 1;

    } else {

        // Kalau sudah ada,
        // tambah jumlahnya

        pesanan[rasa]++;

    }

    tampilkanPesanan();

    // Scroll otomatis ke bagian pesanan

    document
        .getElementById("pesanan")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ============================================
// KURANGI PESANAN
// ============================================

function kurangiPesanan(rasa) {

    if (!pesanan[rasa]) {
        return;
    }

    pesanan[rasa]--;

    // Kalau jumlah sudah 0,
    // hapus rasa tersebut

    if (pesanan[rasa] <= 0) {

        delete pesanan[rasa];

    }

    tampilkanPesanan();
}


// ============================================
// TAMPILKAN PESANAN
// ============================================

function tampilkanPesanan() {

    const daftar =
        document.getElementById(
            "daftarPesanan"
        );

    const totalHarga =
        document.getElementById(
            "totalHarga"
        );


    // Ambil semua rasa

    const semuaRasa =
        Object.keys(pesanan);


    // Kalau belum ada pesanan

    if (semuaRasa.length === 0) {

        daftar.innerHTML = `
            <div class="kosong">
                Belum ada pesanan 🍧
            </div>
        `;

        totalHarga.innerText = "Rp0";

        return;
    }


    // Kosongkan daftar

    daftar.innerHTML = "";


    let total = 0;


    // Tampilkan setiap rasa

    semuaRasa.forEach(function(rasa) {

        const jumlah =
            pesanan[rasa];


        const subtotal =
            jumlah * hargaEsMambo;


        total += subtotal;


        daftar.innerHTML += `

            <div class="item-pesanan">

                <div class="nama-rasa">
                    🍧 ${rasa}
                </div>


                <div class="quantity">

                    <button
                        onclick="kurangiPesanan('${rasa}')">

                        −

                    </button>


                    <span>
                        ${jumlah}
                    </span>


                    <button
                        onclick="tambahPesanan('${rasa}')">

                        +

                    </button>

                </div>


                <div class="harga-item">

                    Rp${subtotal.toLocaleString("id-ID")}

                </div>

            </div>

        `;

    });


    // Tampilkan total

    totalHarga.innerText =
        "Rp" +
        total.toLocaleString("id-ID");
}


// ============================================
// HAPUS SEMUA PESANAN
// ============================================

function hapusSemua() {

    pesanan = {};

    tampilkanPesanan();

}


// ============================================
// PESAN VIA WHATSAPP
// ============================================

function pesanWhatsApp() {

    const semuaRasa =
        Object.keys(pesanan);


    // Kalau belum pilih produk

    if (semuaRasa.length === 0) {

        alert(
            "🍧 Pilih Es Mambo terlebih dahulu!"
        );

        return;
    }


    let total = 0;


    // Pesan awal

    let pesan =
        "🍧 *PESANAN ES MAMBO*";


    pesan += "\n\n";


    // Daftar pesanan

    semuaRasa.forEach(function(rasa) {

        const jumlah =
            pesanan[rasa];


        const subtotal =
            jumlah * hargaEsMambo;


        total += subtotal;


        pesan +=
            "🍧 " +
            rasa +
            " × " +
            jumlah +
            " = Rp" +
            subtotal.toLocaleString("id-ID");


        pesan += "\n";

    });


    // Total

    pesan += "\n";


    pesan +=
        "💰 *TOTAL: Rp" +
        total.toLocaleString("id-ID") +
        "*";


    // Pesan tambahan

    pesan += "\n\n";

    pesan +=
        "Halo, saya mau pesan Es Mambo sesuai pesanan di atas.";


    // Ubah pesan menjadi format URL

    const pesanEncoded =
        encodeURIComponent(pesan);


    // Buat link WhatsApp

    const linkWhatsApp =
        "https://wa.me/" +
        nomorWhatsApp +
        "?text=" +
        pesanEncoded;


    // Buka WhatsApp

    window.open(
        linkWhatsApp,
        "_blank"
    );

}