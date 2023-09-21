import React, { useState, useEffect } from 'react';
import './App.css';
import { Deck, Flashcard } from './components/types';
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
    const [flashcardIndex, setFlashcardIndex] = useState<number>(0); 
    const [error, setError] = useState<string>(""); 


    // retrieves persisted decks through local storage
    useEffect(() => {
        const data = localStorage.getItem("deck-list");
        if (data) {
        setDeckList(JSON.parse(data));
        } else {
        setDeckList([]);  // empty deck list?
        }
    }, []);

    // persists decks to local storage
    useEffect(() => {
        localStorage.setItem("deck-list", JSON.stringify(deckList));
    });
    

    // inputting language/start/end creates a new deck
    const createDeck = (e: React.FormEvent) => {
        e.preventDefault();

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/${language}/${start}/${end}`)
            .then(response => {
                const newDeck: Deck = {
                    id: Date.now(),  // generate unique id 
                    name: language.toLowerCase(),
                    // response data is array of flashcards
                    flashcards: response.data.map((flashcard: any, index: number) => 
                        ({ 
                            id: index,
                            number: flashcard.number,
                            english: flashcard.english,
                            difficulty: flashcard.difficulty,
                            
                            // adds new property to flashcard
                            // key = name of `language` & value = translated word in that `language`
                            [language.toLowerCase()]: flashcard[language.toLowerCase()] 
                        })) as Flashcard[]
                };

                // spread all deck objects from deckList, then add new deck to end of list
                setDeckList(deckList => [...deckList, newDeck]);
                setError("");
                
                console.log("RESPONSE DATA: ", response.data);
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
    const onEasy = (id: number) => {
        if (selectedDeck) {
            console.log("FLASHCARD ID: ", id);
            // remove flashcard with that id
            const updatedFlashcards = selectedDeck.flashcards.filter(flashcard => flashcard.id !== id);  
            
            // update `selectedDeck` 
            setSelectedDeck(prevDeck => {
                // make sure prev state isn't null
                if (prevDeck) {  
                    // returns new state object where `flashcards` is updated
                    return { ...prevDeck, flashcards: updatedFlashcards };
                }
                // if `prevDeck` is null, return null
                return null;
            });
            // update `flashcardIndex`, make sure this isn't out of bounds
            // after removing a flashcard 
            if (updatedFlashcards.length === 0) {
                alert("No more flashcards in deck! Please create a new deck :D");
                setFlashcardIndex(0);  // reset to first flashcard if deck is empty 
            } else {
                setFlashcardIndex(prevFlashcard => Math.min(prevFlashcard, updatedFlashcards.length - 1) || 0); 
            }
        }
    };
    
    // keeps card in deck, moves to next card
    const onHard = () => {
        if (selectedDeck) {
                if (flashcardIndex >= (selectedDeck?.flashcards?.length || 1) - 1) {
                    setFlashcardIndex(0);  // reset to first flashcard if it was the last card
                } else {
                    nextFlashcard();
                }
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
                selectedDeck={selectedDeck}
                flashcardIndex={flashcardIndex}
                onEasy={onEasy}
                onHard={onHard}
            />
            <Sidebar
                deckList={deckList}
                setDecklist={setDeckList}
                handleSelectDeck={handleSelectDeck}
            />
        </div>
    );
}

export default App;











