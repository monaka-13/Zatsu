const { useState, useEffect } = React;

function shuffleArray(array, n = 9) {
    // Create a shallow copy to ensure the original array passed to selectRandomItems is not mutated
    let newArray = [...array];
    let currentIndex = newArray.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [newArray[currentIndex], newArray[randomIndex]] = [
            newArray[randomIndex],
            newArray[currentIndex],
        ];
    }

    newArray = newArray.slice(0, n); // Limit the shuffled array to the first n items

    return newArray
}

function Card(props) {
    return (
        <div className="country" onDoubleClick={() => props.onRemove(props.id)}>
            <h3 className="country-name">{props.country}</h3>
            <img className="country-flag" src={props.flag} />
            <div className="content">
                <h3>Capital</h3>
                <p>{props.capital}</p>
                <h3>Population</h3>
                <p>{props.population}</p>
            </div>
        </div>
    );
}

const App = () => {

    const [countriesList, setCountriesList] = useState([]);
    const [totalpopulation, setTotalPopulation] = useState(0);

    useEffect(() => {
        console.log('useEffect called!');
        fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,ccn3')
            .then(res => res.json())
            .then(data => {
                const mappedData = data.map(country => ({
                    id: country.ccn3,
                    name: country.name.common,
                    capital: country.capital ? country.capital[0] : 'N/A',
                    population: country.population,
                    flags: country.flags.svg
                }));

                setCountriesList(shuffleArray(mappedData, 9));

            })
            .catch(err => console.log('Oh noes!', err));
    }, []);

    useEffect(() => {
        console.log('useEffect for total population called!');

        let total = 0; // Initialize a variable to hold the sum

        for (const country of countriesList) {
            total += country.population; // Add each country's population to the total
        }

        // const total = countriesList.reduce((acc, country) => acc + country.population, 0);
        setTotalPopulation(total);
        console.log('Total population:', total);
    }, [countriesList]);

    const removeCountry = (id) => {
        setCountriesList(countriesList.filter(c => c.id !== id));
    };

    return (
        <div>
            <h1>Flag Explorer</h1>
            <div className='countries'>
                {countriesList.map(country => (
                    <Card
                        key={country.id}
                        id={country.id}
                        country={country.name}
                        flag={country.flags}
                        capital={country.capital}
                        population={country.population}
                        onRemove={removeCountry} />
                ))}
            </div>
            <br />
            <div className='countries'>
                <h2>Total Population: {totalpopulation}</h2>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);