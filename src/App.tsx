import React, { useState } from 'react';
import './App.css';
import { Deck } from './components/types';
import SingleDeck from './components/SingleDeck';
import InputField from './components/InputField';
import axios from 'axios'; 
import Sidebar from './components/Sidebar';


const App: React.FC = () => {
    const [language, setLanguage] = useState<string>("");
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null); // no deck selected yet
    const [deckList, setDeckList] = useState<Deck[]>([]);
    
    const createDeck = (e: React.FormEvent) => {
        e.preventDefault();
        
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/${language}/${start}/${end}`)
            
            .then(response => {
                const newDeck: Deck = {
                    id: Date.now(),   // generate unique id
                    name: language,
                    flashcards: response.data   // response data is array of flashcards
                };

                console.log("Deck: ", newDeck)
                // add new deck to decklist
                // updates `decklist` state by using previous state `oldDeckList` to create a new state
                // `oldDeckList` = param name for callback we're passing to `setDeckList`
                // represents current state of `deckList` before this update is applied
                setDeckList(oldDeckList => [...oldDeckList, newDeck]);
                setError("");    // reset error state if successful response
                console.log("RESPONSE: ", response);
                console.log("RESPONSE.DATA: ", response.data);
            })
            .catch(error => {
                // extract error message from response & set it to error state
                // if left side falsy (undefined/null) return right side string
                setError(error.response?.data?.error || "An unexpected error occured")
                console.log("Error fetching data!", error)
            });
            console.log(language);

            // reset fields after submitting
            setLanguage("");    
            setStart("");
            setEnd("");
        };

        // helper that sets the selected deck
        // deck is a param of type `Deck` that function gets called with
        // gets set as selectedDeck when `setSelectedDecl(Deck)` is called 
        const handleSelectDeck = (deck: Deck) => {
            setSelectedDeck(deck)
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
                createDeck={createDeck}
            />
            {/* if error truthy, display error message */}
            {error && <div className="error-message">{error}</div>}
            <SingleDeck 
                selectedDeck={selectedDeck}
                setSelectedDeck={setSelectedDeck}
            />
            <Sidebar
                deckList={deckList}
                handleSelectDeck={handleSelectDeck}
            />
        </div>
    );
}

export default App;
