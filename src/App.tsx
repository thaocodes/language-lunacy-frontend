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
    const [deckList, setDeckList] = useState<Deck[]>([]);
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [flashcardIndex, setFlashcardIndex] = useState<number>(0); // flashcards shown 1 by 1, first in deck is at index 0
    const [error, setError] = useState<string>(""); 

    // inputting language/start/end creates a new deck
    const createDeck = (e: React.FormEvent) => {
        e.preventDefault();

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/${language}/${start}/${end}`)
            .then(response => {
                const newDeck: Deck = {
                    id: Date.now(),  // generate unique id 
                    name: language,
                    flashcards: response.data   // response data is array of flashcards
                };
                console.log("Deck: ", newDeck);
                console.log("Language @ deck creation: ", language);

                // add new deck to decklist
                setDeckList(deckList => [...deckList, newDeck]);
                setError("");
                console.log("RESPONSE: ", response);
                console.log("RESPONSE.DATA: ", response.data);
            })
            .catch(error => {
                setError(error.response?.data?.error || "An unexpected error occurred!")
                console.log("Error fetching data!", error)
            });
            // reset fields after submission
            setLanguage("");
            setStart("");
            setEnd("");
        };

    // sets selected deck to this deck
    const handleSelectDeck = (deck: Deck) => {
        setSelectedDeck(deck);
        // reset flashcard index whenever new deck is selected
        setFlashcardIndex(0);   
    }

    // prevFlashcard holds state of flashcard before update
    const nextFlashcard = () => {
        if (selectedDeck) {
            // if `flashcards` undefined (selectedDeck is null) return 1 to avoid errors
            setFlashcardIndex(prevFlashcard => Math.min(prevFlashcard + 1, (selectedDeck?.flashcards?.length || 1) -1));
        }
    }

    // when clicked, removes flashcard from deck
    const onEasy = (flashcardId: number) => {
        if (selectedDeck) {
            console.log(flashcardId);

            // remove flashcard with that id
            const updatedFlashcards = selectedDeck.flashcards.filter(flashcard => flashcard.id !== flashcardId);  
            
            // update `selectedDeck` 
            setSelectedDeck(prevDeck => {
                if (prevDeck) {  // makes sure prev state isn't null
                    // returns new state object where `flashcards` is updated
                    return { ...prevDeck, flashcards: updatedFlashcards };
                }
                // if `prevDeck` is null, return null
                return null;
            });
            // updates `flashcardIndex`, makes sure it doesn't go out of bounds
            // after removing a flashcard 
            setFlashcardIndex(prevFlashcard => Math.min(prevFlashcard, updatedFlashcards.length - 1));
        }
    };
    

    // keeps card in deck, moves to next card
    const onHard = () => {
        if (selectedDeck) {
            nextFlashcard();
        }
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
                language={language}
                selectedDeck={selectedDeck}
                setSelectedDeck={setSelectedDeck}
                decklist={deckList}
                flashcardIndex={flashcardIndex}
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











