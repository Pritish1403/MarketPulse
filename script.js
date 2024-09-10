async function fetchStockInfo() {
    const stockName = document.getElementById('stock-name-input').value.trim();
    
    if (!stockName) {
        alert('Please enter a stock name.');
        return;
    }

    const url = `https://indian-stock-exchange-api2.p.rapidapi.com/stock?name=${encodeURIComponent(stockName)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a182d80801msh61848f774793515p14c9b3jsn87519cbaa5b0',
            'x-rapidapi-host': 'indian-stock-exchange-api2.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();

        // Extracting necessary information
        const companyName = result.companyName || 'N/A';
        const companyProfile = result.companyProfile.companyDescription || 'N/A';
        const bsePrice = result.currentPrice.BSE || 'N/A';
        const nsePrice = result.currentPrice.NSE || 'N/A';
        const industry = result.industry || 'N/A';

        // Updating the DOM
        document.getElementById('company-name').textContent = companyName;
        document.getElementById('company-profile').textContent = companyProfile;
        document.getElementById('bse-price').textContent = `₹${bsePrice}`;
        document.getElementById('nse-price').textContent = `₹${nsePrice}`;
        document.getElementById('industry-name').textContent = industry;

    } catch (error) {
        console.error(error);
        document.getElementById('company-name').textContent = 'Error fetching data';
        document.getElementById('company-profile').textContent = '';
        document.getElementById('bse-price').textContent = '';
        document.getElementById('nse-price').textContent = '';
        document.getElementById('industry-name').textContent = '';
    }
}
