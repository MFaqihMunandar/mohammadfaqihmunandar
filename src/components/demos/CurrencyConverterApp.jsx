import React, { useState, useEffect } from 'react';

export default function CurrencyConverterApp() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRate = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRate(data.rates[toCurrency]);
        }
      } catch (err) {
        console.error('Gagal mengambil kurs mata uang:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
  }, [fromCurrency, toCurrency]);

  const convertedAmount = exchangeRate ? (amount * exchangeRate).toLocaleString('id-ID') : '0';

  return (
    <div>
      <h4 className="fw-bold mb-3">💱 Konversi Mata Uang Foreign Exchange</h4>
      <p className="text-muted small mb-4">
        Kalkulasi konversi mata uang realtime menggunakan REST API nilai tukar global.
      </p>

      <div className="row g-3 align-items-center mb-4">
        <div className="col-md-4">
          <label className="form-label fw-medium small">Jumlah</label>
          <input
            type="number"
            min="1"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-medium small">Dari</label>
          <select
            className="form-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="SGD">SGD - Singapore Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="IDR">IDR - Indonesian Rupiah</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-medium small">Ke</label>
          <select
            className="form-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="IDR">IDR - Indonesian Rupiah</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="SGD">SGD - Singapore Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </div>
      </div>

      <div className="card bg-primary text-white p-4 text-center rounded-3 shadow-sm">
        <span className="small text-white-50">Hasil Konversi Estimated</span>
        <h3 className="fw-bold mt-1 mb-0">
          {loading ? 'Menghitung...' : `${convertedAmount} ${toCurrency}`}
        </h3>
        {exchangeRate && !loading && (
          <span className="small text-white-50 mt-2 d-block">
            1 {fromCurrency} = {exchangeRate.toLocaleString('id-ID')} {toCurrency}
          </span>
        )}
      </div>
    </div>
  );
}