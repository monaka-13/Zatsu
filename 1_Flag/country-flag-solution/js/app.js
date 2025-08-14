// implement the code
const { useState } = React;

const countries = [
    {
        "id": "a1b2c3d4",
        "flags": "https://flagcdn.com/w320/tg.png",
        "name": "Togo",
        "capital": "Lomé",
        "population": 8278737
    },
    {
        "id": "e5f6g7h8",
        "flags": "https://flagcdn.com/w320/yt.png",
        "name": "Mayotte",
        "capital": "Mamoudzou",
        "population": 226915
    },
    {
        "id": "i9j0k1l2",
        "flags": "https://flagcdn.com/w320/ge.png",
        "name": "Georgia",
        "capital": "Tbilisi",
        "population": 3714000
    },
    {
        "id": "m3n4o5p6",
        "flags": "https://flagcdn.com/w320/vu.png",
        "name": "Vanuatu",
        "capital": "Port Vila",
        "population": 307150
    },
    {
        "id": "q7r8s9t0",
        "flags": "https://flagcdn.com/w320/kg.png",
        "name": "Kyrgyzstan",
        "capital": "Bishkek",
        "population": 6591600
    },
    {
        "id": "u1v2w3x4",
        "flags": "https://flagcdn.com/w320/ne.png",
        "name": "Niger",
        "capital": "Niamey",
        "population": 24206636
    },
    {
        "id": "y5z6a7b8",
        "flags": "https://flagcdn.com/w320/cn.png",
        "name": "China",
        "capital": "Beijing",
        "population": 1402112000
    },
    {
        "id": "c9d0e1f2",
        "flags": "https://flagcdn.com/w320/tv.png",
        "name": "Tuvalu",
        "capital": "Funafuti",
        "population": 11792
    },
    {
        "id": "g3h4i5j6",
        "flags": "https://flagcdn.com/w320/km.png",
        "name": "Comoros",
        "capital": "Moroni",
        "population": 869595
    },
    {
        "id": "k7l8m9n0",
        "flags": "https://flagcdn.com/w320/ba.png",
        "name": "Bosnia and Herzegovina",
        "capital": "Sarajevo",
        "population": 3280815
    },
    {
        "id": "o1p2q3r4",
        "flags": "https://flagcdn.com/w320/bh.png",
        "name": "Bahrain",
        "capital": "Manama",
        "population": 1701583
    },
    {
        "id": "s5t6u7v8",
        "flags": "https://flagcdn.com/w320/so.png",
        "name": "Somalia",
        "capital": "Mogadishu",
        "population": 15893219
    },
    {
        "id": "w9x0y1z2",
        "flags": "https://flagcdn.com/w320/bl.png",
        "name": "Saint Barthélemy",
        "capital": "Gustavia",
        "population": 4255
    },
    {
        "id": "a3b4c5d6",
        "flags": "https://flagcdn.com/w320/lv.png",
        "name": "Latvia",
        "capital": "Riga",
        "population": 1901548
    },
    {
        "id": "e7f8g9h0",
        "flags": "https://flagcdn.com/w320/ky.png",
        "name": "Cayman Islands",
        "capital": "George Town",
        "population": 65720
    },
    {
        "id": "i1j2k3l4",
        "flags": "https://flagcdn.com/w320/nl.png",
        "name": "Netherlands",
        "capital": "Amsterdam",
        "population": 16655799
    },
    {
        "id": "m5n6o7p8",
        "flags": "https://flagcdn.com/w320/ls.png",
        "name": "Lesotho",
        "capital": "Maseru",
        "population": 2142252
    },
    {
        "id": "q9r0s1t2",
        "flags": "https://flagcdn.com/w320/ve.png",
        "name": "Venezuela",
        "capital": "Caracas",
        "population": 28435943
    },
    {
        "id": "u3v4w5x6",
        "flags": "https://flagcdn.com/w320/ke.png",
        "name": "Kenya",
        "capital": "Nairobi",
        "population": 53771300
    },
    {
        "id": "y7z8a9b0",
        "flags": "https://flagcdn.com/w320/tr.png",
        "name": "Turkey",
        "capital": "Ankara",
        "population": 84339067
    },
    {
        "id": "c1d2e3f4",
        "flags": "https://flagcdn.com/w320/fj.png",
        "name": "Fiji",
        "capital": "Suva",
        "population": 896444
    },
    {
        "id": "g5h6i7j8",
        "flags": "https://flagcdn.com/w320/tt.png",
        "name": "Trinidad and Tobago",
        "capital": "Port of Spain",
        "population": 1399491
    },
    {
        "id": "k9l0m1n2",
        "flags": "https://flagcdn.com/w320/hn.png",
        "name": "Honduras",
        "capital": "Tegucigalpa",
        "population": 9904608
    },
    {
        "id": "o3p4q5r6",
        "flags": "https://flagcdn.com/w320/je.png",
        "name": "Jersey",
        "capital": "Saint Helier",
        "population": 100800
    },
    {
        "id": "s7t8u9v0",
        "flags": "https://flagcdn.com/w320/dj.png",
        "name": "Djibouti",
        "capital": "Djibouti",
        "population": 988002
    },
    {
        "id": "w1x2y3z4",
        "flags": "https://flagcdn.com/w320/re.png",
        "name": "Réunion",
        "capital": "Saint-Denis",
        "population": 840974
    },
    {
        "id": "a5b6c7d8",
        "flags": "https://flagcdn.com/w320/sz.png",
        "name": "Eswatini",
        "capital": "Mbabane",
        "population": 1160164
    },
    {
        "id": "e9f0g1h2",
        "flags": "https://flagcdn.com/w320/tj.png",
        "name": "Tajikistan",
        "capital": "Dushanbe",
        "population": 9537642
    },
    {
        "id": "i3j4k5l6",
        "flags": "https://flagcdn.com/w320/sa.png",
        "name": "Saudi Arabia",
        "capital": "Riyadh",
        "population": 34813867
    },
    {
        "id": "m7n8o9p0",
        "flags": "https://flagcdn.com/w320/bm.png",
        "name": "Bermuda",
        "capital": "Hamilton",
        "population": 63903
    },
    {
        "id": "q1r2s3t4",
        "flags": "https://flagcdn.com/w320/nz.png",
        "name": "New Zealand",
        "capital": "Wellington",
        "population": 5084300
    },
    {
        "id": "u5v6w7x8",
        "flags": "https://flagcdn.com/w320/by.png",
        "name": "Belarus",
        "capital": "Minsk",
        "population": 9398861
    },
    {
        "id": "y9z0a1b2",
        "flags": "https://flagcdn.com/w320/cx.png",
        "name": "Christmas Island",
        "capital": "Flying Fish Cove",
        "population": 2072
    },
    {
        "id": "c3d4e5f6",
        "flags": "https://flagcdn.com/w320/gm.png",
        "name": "Gambia",
        "capital": "Banjul",
        "population": 2416664
    },
    {
        "id": "g7h8i9j0",
        "flags": "https://flagcdn.com/w320/pf.png",
        "name": "French Polynesia",
        "capital": "Papeetē",
        "population": 280904
    },
    {
        "id": "k1l2m3n4",
        "flags": "https://flagcdn.com/w320/cd.png",
        "name": "DR Congo",
        "capital": "Kinshasa",
        "population": 108407721
    },
    {
        "id": "o5p6q7r8",
        "flags": "https://flagcdn.com/w320/cr.png",
        "name": "Costa Rica",
        "capital": "San José",
        "population": 5094114
    },
    {
        "id": "s9t0u1v2",
        "flags": "https://flagcdn.com/w320/mw.png",
        "name": "Malawi",
        "capital": "Lilongwe",
        "population": 19129955
    },
    {
        "id": "w3x4y5z6",
        "flags": "https://flagcdn.com/w320/cg.png",
        "name": "Republic of the Congo",
        "capital": "Brazzaville",
        "population": 5657000
    },
    {
        "id": "a7b8c9d0",
        "flags": "https://flagcdn.com/w320/om.png",
        "name": "Oman",
        "capital": "Muscat",
        "population": 5106622
    },
    {
        "id": "e1f2g3h4",
        "flags": "https://flagcdn.com/w320/iq.png",
        "name": "Iraq",
        "capital": "Baghdad",
        "population": 40222503
    },
    {
        "id": "i5j6k7l8",
        "flags": "https://flagcdn.com/w320/nu.png",
        "name": "Niue",
        "capital": "Alofi",
        "population": 1470
    },
    {
        "id": "m9n0o1p2",
        "flags": "https://flagcdn.com/w320/sn.png",
        "name": "Senegal",
        "capital": "Dakar",
        "population": 16743930
    },
    {
        "id": "q3r4s5t6",
        "flags": "https://flagcdn.com/w320/lb.png",
        "name": "Lebanon",
        "capital": "Beirut",
        "population": 6825442
    },
    {
        "id": "u7v8w9x0",
        "flags": "https://flagcdn.com/w320/ao.png",
        "name": "Angola",
        "capital": "Luanda",
        "population": 32866268
    },
    {
        "id": "y1z2a3b4",
        "flags": "https://flagcdn.com/w320/ir.png",
        "name": "Iran",
        "capital": "Tehran",
        "population": 83992953
    },
    {
        "id": "c5d6e7f8",
        "flags": "https://flagcdn.com/w320/ec.png",
        "name": "Ecuador",
        "capital": "Quito",
        "population": 17643060
    },
    {
        "id": "g9h0i1j2",
        "flags": "https://flagcdn.com/w320/la.png",
        "name": "Laos",
        "capital": "Vientiane",
        "population": 7275556
    },
    {
        "id": "k3l4m5n6",
        "flags": "https://flagcdn.com/w320/lk.png",
        "name": "Sri Lanka",
        "capital": "Sri Jayawardenepura Kotte",
        "population": 21919000
    },
    {
        "id": "o7p8q9r0",
        "flags": "https://flagcdn.com/w320/aw.png",
        "name": "Aruba",
        "capital": "Oranjestad",
        "population": 106766
    },
    {
        "id": "s1t2u3v4",
        "flags": "https://flagcdn.com/w320/st.png",
        "name": "São Tomé and Príncipe",
        "capital": "São Tomé",
        "population": 219161
    },
    {
        "id": "w5x6y7z8",
        "flags": "https://flagcdn.com/w320/gd.png",
        "name": "Grenada",
        "capital": "St. George's",
        "population": 112519
    },
    {
        "id": "a9b0c1d2",
        "flags": "https://flagcdn.com/w320/ms.png",
        "name": "Montserrat",
        "capital": "Plymouth",
        "population": 4922
    },
    {
        "id": "e3f4g5h6",
        "flags": "https://flagcdn.com/w320/eh.png",
        "name": "Western Sahara",
        "capital": "El Aaiún",
        "population": 510713
    },
    {
        "id": "i7j8k9l0",
        "flags": "https://flagcdn.com/w320/gn.png",
        "name": "Guinea",
        "capital": "Conakry",
        "population": 13132792
    },
    {
        "id": "m1n2o3p4",
        "flags": "https://flagcdn.com/w320/vg.png",
        "name": "British Virgin Islands",
        "capital": "Road Town",
        "population": 30237
    },
    {
        "id": "q5r6s7t8",
        "flags": "https://flagcdn.com/w320/pa.png",
        "name": "Panama",
        "capital": "Panama City",
        "population": 4314768
    },
    {
        "id": "u9v0w1x2",
        "flags": "https://flagcdn.com/w320/ye.png",
        "name": "Yemen",
        "capital": "Sana'a",
        "population": 29825968
    },
    {
        "id": "y3z4a5b6",
        "flags": "https://flagcdn.com/w320/ee.png",
        "name": "Estonia",
        "capital": "Tallinn",
        "population": 1331057
    },
    {
        "id": "c7d8e9f0",
        "flags": "https://flagcdn.com/w320/gy.png",
        "name": "Guyana",
        "capital": "Georgetown",
        "population": 786559
    },
    {
        "id": "g1h2i3j4",
        "flags": "https://flagcdn.com/w320/lu.png",
        "name": "Luxembourg",
        "capital": "Luxembourg",
        "population": 632275
    },
    {
        "id": "k5l6m7n8",
        "flags": "https://flagcdn.com/w320/na.png",
        "name": "Namibia",
        "capital": "Windhoek",
        "population": 2540916
    }
]


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

    const [countriesList, setCountriesList] = useState(shuffleArray(countries, 9));

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
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);