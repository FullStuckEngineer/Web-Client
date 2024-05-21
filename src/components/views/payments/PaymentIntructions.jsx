import React, { useState } from "react";

const PaymentInstructions = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="flex flex-col w-full py-10">
      <h1 className="md:text-xl text-lg font-bold mb-6">Cara Pembayaran</h1>
      <div id="accordion-open" data-accordion="open">
        <h2 id="accordion-open-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right  border border-b-0  rounded-t-xl focus:ring-4 focus:ring-color-grey hover:bg-color-grey gap-3"
            onClick={() => toggleAccordion(1)}
            aria-expanded={openAccordion === 1}
            aria-controls="accordion-open-body-1"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
              ATM
            </span>
            <svg
              className={`w-3 h-3 transform ${
                openAccordion === 1 ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-1"
          className={`${
            openAccordion === 1 ? "" : "hidden"
          } w-full max-w-[33rem]`}
          aria-labelledby="accordion-open-heading-1"
        >
          <div
            className="p-5 border border-b-0 border-gray-200 dark:border-gray-700"
            style={{ wordWrap: "break-word" }}
          >
            <ol className="flex flex-col justify-start items-start gap-1 text-sm">
              <li className="flex gap-4">
                <span className="list-number">1.</span> Masukkan Kartu ATM BCA &
                PIN
              </li>
              <li className="flex gap-3">
                <span className="list-number">2.</span> Pilih menu Transaksi
                Lainnya Transfer ke Rekening BCA Virtual Account
              </li>
              <li className="flex gap-3">
                <span className="list-number">3.</span> Masukkan 5 angka kode
                perusahaan untuk Tokopedia (80777) dan Nomor HP yang terdaftar
                di akun Tokopedia Anda (Contoh: 80777100048738922)
              </li>
              <li className="flex gap-3">
                <span className="list-number">4.</span> Di halaman konfirmasi,
                pastikan detil pembayaran sudah sesuai seperti No VA, Nama,
                Perus/Produk dan Total Tagihan
              </li>
              <li className="flex gap-3">
                <span className="list-number">5.</span> Masukkan Jumlah Transfer
                sesuai dengan Total Tagihan
              </li>
              <li className="flex gap-3">
                <span className="list-number">6.</span> Ikuti instruksi untuk
                menyelesaikan transaksi Simpan struk transaksi sebagai bukti
                pembayaran
              </li>
            </ol>
          </div>
        </div>
        <h2 id="accordion-open-heading-2">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right  border border-b-0 focus:ring-4 focus:ring-color-grey hover:bg-color-grey  gap-3"
            onClick={() => toggleAccordion(2)}
            aria-expanded={openAccordion === 2}
            aria-controls="accordion-open-body-2"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>
              m-Banking
            </span>
            <svg
              className={`w-3 h-3 transform ${
                openAccordion === 2 ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-2"
          className={`${
            openAccordion === 2 ? "" : "hidden"
          } w-full max-w-[33rem]`}
          aria-labelledby="accordion-open-heading-2"
        >
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <ol className="flex flex-col justify-start items-start gap-1 text-sm">
              <li className="flex gap-4">
                <span className="list-number">1.</span> Masukkan Kartu ATM BCA &
                PIN
              </li>
              <li className="flex gap-3">
                <span className="list-number">2.</span> Pilih menu Transaksi
                Lainnya Transfer ke Rekening BCA Virtual Account
              </li>
              <li className="flex gap-3">
                <span className="list-number">3.</span> Masukkan 5 angka kode
                perusahaan untuk Tokopedia (80777) dan Nomor HP yang terdaftar
                di akun Tokopedia Anda (Contoh: 80777100048738922)
              </li>
              <li className="flex gap-3">
                <span className="list-number">4.</span> Di halaman konfirmasi,
                pastikan detil pembayaran sudah sesuai seperti No VA, Nama,
                Perus/Produk dan Total Tagihan
              </li>
              <li className="flex gap-3">
                <span className="list-number">5.</span> Masukkan Jumlah Transfer
                sesuai dengan Total Tagihan
              </li>
              <li className="flex gap-3">
                <span className="list-number">6.</span> Ikuti instruksi untuk
                menyelesaikan transaksi Simpan struk transaksi sebagai bukti
                pembayaran
              </li>
            </ol>
          </div>
        </div>
        <h2 id="accordion-open-heading-3">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right border focus:ring-4 focus:ring-color-grey hover:bg-color-grey gap-3"
            onClick={() => toggleAccordion(3)}
            aria-expanded={openAccordion === 3}
            aria-controls="accordion-open-body-3"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 me-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>{" "}
              Internet Banking
            </span>
            <svg
              className={`w-3 h-3 transform ${
                openAccordion === 3 ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-3"
          className={`${
            openAccordion === 3 ? "" : "hidden"
          } w-full max-w-[33rem]`}
          aria-labelledby="accordion-open-heading-3"
        >
          <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
            <ol className="flex flex-col justify-start items-start gap-1 text-sm">
              <li className="flex gap-4">
                <span className="list-number">1.</span> Masukkan Kartu ATM BCA &
                PIN
              </li>
              <li className="flex gap-3">
                <span className="list-number">2.</span> Pilih menu Transaksi
                Lainnya Transfer ke Rekening BCA Virtual Account
              </li>
              <li className="flex gap-3">
                <span className="list-number">3.</span> Masukkan 5 angka kode
                perusahaan untuk Tokopedia (80777) dan Nomor HP yang terdaftar
                di akun Tokopedia Anda (Contoh: 80777100048738922)
              </li>
              <li className="flex gap-3">
                <span className="list-number">4.</span> Di halaman konfirmasi,
                pastikan detil pembayaran sudah sesuai seperti No VA, Nama,
                Perus/Produk dan Total Tagihan
              </li>
              <li className="flex gap-3">
                <span className="list-number">5.</span> Masukkan Jumlah Transfer
                sesuai dengan Total Tagihan
              </li>
              <li className="flex gap-3">
                <span className="list-number">6.</span> Ikuti instruksi untuk
                menyelesaikan transaksi Simpan struk transaksi sebagai bukti
                pembayaran
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInstructions;
