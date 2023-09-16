import React, { useState } from 'react';
import './App.css';
import { mockDeck } from './mock-service/MockDecks';
import { Deck } from './components/types';
import FlashcardDeck from './components/SingleDeck';
import InputField from './components/InputField';
import axios from 'axios'; 


const App: React.FC = () => {
    const [language, setLanguage] = useState<string>("");
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [deck, setDeck] = useState<Deck>(mockDeck);  // 1 deck, set initial state to mockDeck
    const [error, setError] = useState<string>("");

    const handleLanguage = (e: React.FormEvent) => {
        e.preventDefault();

        console.log("baseURL: ", process.env.REACT_APP_API_BASE_URL);
        
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/${language}/${start}/${end}`)
            
            .then(response => {
                setDeck(response.data);
                setError("");    // reset error state if successful response
                console.log("RESPONSE: ", response);
                console.log("RESPONSE.DATA: ", response.data);
            })
            .catch(error => {
                // extract error message from response & set it to error state
                setError(error.response?.data?.error || "An unexpected error occured")
                console.log("Error fetching data!", error)
            });
            console.log(language);

            // reset fields after submitting
            setLanguage("");    
            setStart("");
            setEnd("");
    }



    return (
        <div className="App">
            <span className="heading">Language Lunacy</span>
            <InputField 
                language={language}
                start={start}
                end={end}
                setLanguage={setLanguage}
                setStart={setStart}
                setEnd={setEnd}
                handleLanguage={handleLanguage}
            />
            {/* display error message if there is one */}
            {error && <div className="error-message">{error}</div>}
            <FlashcardDeck deck={deck} />
        </div>
    );
}

export default App;
