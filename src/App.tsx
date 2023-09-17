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
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);
    
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
        // gets set as selectedDeck when `setSelectedDecl(deck)` is called 
        const handleSelectDeck = (deck: Deck) => {
            setSelectedDeck(deck);
            setCurrentFlashcardIndex(0); // reset flashcard index whenever new deck is selected
        }

        // make sure new flashcard index does not go out of bounds
        // passing callback function (also arrow) to `setCurrentFlashcardIndex`
        // Math.min takes 2 numbers & returns smaller number
        const nextFlashcard = () => {
            // safely check length of flashcards array
            // if `flashcards` is undefined (selectedDeck is null), return 1 to avoid errors
            setCurrentFlashcardIndex(prevCardIndex => Math.min(prevCardIndex + 1, (selectedDeck?.flashcards?.length  || 1) - 1));
        }

        // when clicked, removes flashcard from deck
        const onEasy = () => {
            // checks if selectedDeck is not null first
            if (selectedDeck) { 
                // splice removes items from an array
                // takes 2 args, start index (where to start removing items) & the # of items to remove
                selectedDeck.flashcards.splice(currentFlashcardIndex, 1);  // removes 1 item at index `currentFlashcardIndex`
                // updates current flashcard index
                // Math.min ensures new index doesn't go beyond last index of updated flashcards array
                setCurrentFlashcardIndex(prevCardIndex => Math.min(prevCardIndex, selectedDeck.flashcards.length - 1));
            }
        }

        const onHard = () => {
            nextFlashcard();  // move to next flashcard
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
                decklist={deckList}
                currentFlashcardIndex={currentFlashcardIndex}
                // pass callback functions 
                onEasy={onEasy}
                onHard={onHard}
                nextFlashcard={nextFlashcard}
                
            />
            <Sidebar
                deckList={deckList}
                setDecklist={setDeckList}
                selectedDeck={selectedDeck}
                handleSelectDeck={handleSelectDeck}
            />
        </div>
    );
}

export default App;
