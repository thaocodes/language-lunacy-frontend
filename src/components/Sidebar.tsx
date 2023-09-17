import React from 'react'
import { Deck } from './types';
import '../stylesheets/flashcard.css';

type Props = {
    deckList: Deck[];
    selectedDeck: Deck | null;
    handleSelectDeck: (deck: Deck) => void;
    setDecklist: React.Dispatch<React.SetStateAction<Deck[]>>;
}

// map over deckList to display each deck
// when a deck is clicked, handleSelectDeck will be called with the clicked deck as the arg
// to select that deck

const Sidebar: React.FC<Props> = ({ deckList, selectedDeck, handleSelectDeck, setDecklist }) => {
     // if deck.id does not match id, return it
    const deleteDeck = (id: number) => {
        setDecklist(deckList.filter((deck) => deck.id !== id));
    };

    return (
        <div className="sidebar">
            <h2>Decks</h2>
            {deckList.map((deck) => (
                <div key={deck.id} className="deck-item">
                    <div className="deck-name" onClick={() => handleSelectDeck(deck)}>
                        {deck.name} ({deck.flashcards.length} cards)
                    </div>
                    {/* prevent clicking delete button from also triggering `handleSelectDeck` */}
                <button className="delete-button" onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id) }}>
                    Delete
                </button>
            </div>
            ))}
        </div>
    );
};

export default Sidebar;