import React, { useEffect } from "react";

const ChangeAddress = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  const [addresses, setAddresses] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpdateAddress, setShowUpdateAddress] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const itemsPerPage = 2;

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await findAllAddress();
        const cityData = await findWithNoLimit();
        setAddresses(data);
        setCities(cityData);
        setLoading(false);
        console.log("INI DATA CITY", cityData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const getCityName = (cityId) => {
    const city = cities.find((city) => city.id === cityId);
    return city ? city.name : "Unknown City";
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startPage = (currentPage - 1) * itemsPerPage;
  const selectedAddress = addresses.slice(startPage, startPage + itemsPerPage);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="fixed inset-0 bg-gray-500 flex items-center justify-center z-50">
        <div className="border bg-color-accent rounded-lg p-8 shadow-lg w-1/2">
          <h2 className="text-2xl mb-4">Ganti Alamat</h2>
          <form>
            {/* Form fields for changing address */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Nama Penerima</label>
              <input type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Telepon</label>
              <input type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Alamat</label>
              <input type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Kode Pos</label>
              <input type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Kota</label>
              <input type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Provinsi</label>
              <input type="text" className="border p-2 rounded w-full" />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-500 text-white p-2 rounded mr-2"
                onClick={onClose}
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeAddress;
