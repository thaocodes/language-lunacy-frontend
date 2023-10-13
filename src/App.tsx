import React, { useState, useEffect } from 'react';
import './App.css';
import { Deck, Flashcard } from './components/types';
import SingleDeck from './components/SingleDeck';
import axios from 'axios'; 
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DeckForm from './components/DeckForm';
import FlashcardForm from './components/FlashcardForm';


const App: React.FC = () => {
    const [language, setLanguage] = useState<string>("");
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [flashcardIndex, setFlashcardIndex] = useState<number>(0); 
    const [error, setError] = useState<string>(""); 
     // toggle deck form visibility 
    const [deckForm, setDeckForm] = useState<boolean>(false);
    const [showFlashcardForm, setShowFlashcardForm] = useState<boolean>(false);


    // ====    RETRIEVE DATA from Local Storage   ==== // 
    // call useState & pass it function instead of default value
    const [deckList, setDeckList] = useState<Deck[]>(() => {
        // fetches data associated w/ key "deck-list"
        const localData = localStorage.getItem("deck-list")
        if (localData == null) return [] // if no value: we don't have any decks, return empty deckList

        // otherwise parse what's in local storage & return it as default value
        return JSON.parse(localData) 
    });


    // ====    STORE DATA in Local Storage   ==== //
    // useEffect returns nothing, takes function as arg
    useEffect(() => {   // everytime deckList changes, call this function
        // set deck-list key to JSON stringified version of deckList
        localStorage.setItem("deck-list", JSON.stringify(deckList))
    }, [deckList])


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
                setFlashcardIndex(0);  // reset to first flashcard if deck is empty 
            } else {
                setFlashcardIndex(prevFlashcard => Math.min(prevFlashcard, updatedFlashcards.length - 1) || 0); 
            }
        }
    };
    
    // keeps card in deck, moves to next card
    const onHard = () => {
        if (selectedDeck) {
                // check if current flashcard is the last one in deck
                // logical OR operator, if value on left || undefined/0/null: default to `1`
                if (flashcardIndex >= (selectedDeck?.flashcards?.length || 1) - 1) {
                    setFlashcardIndex(0);  // reset to first flashcard if it was the last card
                } else {
                    nextFlashcard();
                }
            }
        }

    // user created deck
    const addDeck = (title: string) => {
        // create new userDeck object w/ the given title
        const userDeck: Deck = {
            id: Date.now(),
            name: title,
            flashcards: [],
        }

        // add new deck to deckList
        setDeckList(deckList => [...deckList, userDeck]);
    }

    // user created flashcard
    const addFlashcard = (question: string, answer:string) => {
        if (selectedDeck) {
            // create new flashcard object
            const userFlashcard: Flashcard = {
                id: Date.now(),
                // assign number to flashcard based on order added
                number: selectedDeck.flashcards.length + 1, 
                english: question,
                difficulty: "",
                [language.toLowerCase()]: answer, 
            };
            console.log("QUESTION: ", question)
            console.log("ANSWER: ", answer)

            // update `selectedDeck`'s flashcards to include new card
            const updatedFlashcards = [...selectedDeck.flashcards, userFlashcard];
            
            // update state of selected deck w/ newly added flashcard
            setSelectedDeck(prevDeck => {
                if (prevDeck) {
                    return { ...prevDeck, flashcards: updatedFlashcards };
                }
                return null;
            });

            // update deckList to reflect changes
            setDeckList(prevDeckList => {
                // find index of selected deck in deckList
                // if match found, gives index of the deck otherwise findIndex returns -1
                const deckIndex = prevDeckList.findIndex(deck => deck.id === selectedDeck.id); 

                // if found, update that specific deck
                if (deckIndex > -1) { // > -1 means deck was found
                    const updatedDeckList = [...prevDeckList];    // create copy of prevDeckList
                    // updates deck at the index found in our copy
                    // takes all properties of `selectedDeck` & updates it's `flashcards` w/ newly added flashcard
                    updatedDeckList[deckIndex] = { ...selectedDeck, flashcards: updatedFlashcards };
                    return updatedDeckList; 
                }
                // if not found, return original deckList
                return prevDeckList;
            })
        }
    }


    return (
        <div className="app-container">
            <span className="heading"></span>
            <Header 
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
            <div className="content">
                <Sidebar
                    deckList={deckList}
                    setDecklist={setDeckList}
                    handleSelectDeck={handleSelectDeck}
                    setDeckForm={setDeckForm}
                    setShowFlashcardForm={setShowFlashcardForm}
                    addFlashcard={addFlashcard}
                />
                <div className="main-content">
                    {/* only render DeckForm if `showForm` is true */}
                    {deckForm && <DeckForm addDeck={addDeck} />}
                    {showFlashcardForm && <FlashcardForm addFlashcard={addFlashcard} />}
                    <SingleDeck 
                        selectedDeck={selectedDeck}
                        flashcardIndex={flashcardIndex}
                        onEasy={onEasy}
                        onHard={onHard}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;











