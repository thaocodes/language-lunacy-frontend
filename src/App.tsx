import React, { useState } from 'react';
import './App.css';
import { mockDeck } from './mock-service/MockDecks';
import { Deck } from './components/types';
import FlashcardDeck from './components/FlashcardDeck';

const App: React.FC = () => {
    const [deck, setDeck] = useState<Deck>(mockDeck);  // 1 deck, set initial state to mockDeck




    return (
        <div className="App">
            <FlashcardDeck deck={deck} />
        </div>
    );
}

export default App;
