class Crypt extends React.Component {
  render() {
    return (
      <div>reactApp</div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>Cryptocurrency Market Tracker</h1>
      <h2>Total Market Cap of Displayed Cryptos: ${props.total}</h2>
    </div>
  );
}

const App = () => {
  const [cryptoList, setCryptoList] = useState([]);
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
  })
    .then(res => {
      if (!res.ok) { // Check if the network request was successful
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json(); // Parse the JSON response
    })
    .then(data => {
      // For now, let's just log the raw data to see if it works
      console.log('Raw API data:', data);
      // We'll process and set cryptoList in the next step
    })
    .catch(err => console.error('Error fetching crypto:', err)); // Catch any errors during fetch
  return (
    <div>
      <Header total={3000} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);