import React, { useState } from 'react';
import './App.css';
import { mockDeck } from './mock-service/MockDecks';
import { Deck } from './components/types';
import FlashcardDeck from './components/FlashcardDeck';
import InputField from './components/InputField';

const App: React.FC = () => {
    const [language, setLanguage] = useState<string>("");
    const [deck, setDeck] = useState<Deck>(mockDeck);  // 1 deck, set initial state to mockDeck

    const handleLanguage = (e: React.FormEvent) => {
        e.preventDefault();

        if(language) {
            if (language.toLowerCase() === mockDeck.flashcards[0].language) {
                setDeck(mockDeck);   // set state to mock deck data
                console.log(mockDeck);
            }
            console.log(language);

            setLanguage("");    // reset language state 
        }
    }
    


    return (
        <div className="App">
            <span className="heading">Language Lunacy</span>
            <InputField 
                language={language}
                setLanguage={setLanguage}
                handleLanguage={handleLanguage}
            />
            <FlashcardDeck deck={deck} />
        </div>
    );
}

export default App;
