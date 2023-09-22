import React from 'react'
import { Deck } from './types';
import { FaTrash } from 'react-icons/fa';
import '../stylesheets/sidebar.css';


type Props = {
    deckList: Deck[];
    handleSelectDeck: (deck: Deck) => void;
    setDecklist: React.Dispatch<React.SetStateAction<Deck[]>>;
}

// map over deckList to display each deck
const Sidebar: React.FC<Props> = ({ deckList, handleSelectDeck, setDecklist }) => {
     // if deck.id does not match id, return it
    const deleteDeck = (id: number) => {
        setDecklist(deckList.filter((deck) => deck.id !== id));
    };

    // takes a string, uppercases first letter 
    const capitalizeDeckName = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1); // returns string from 1st index to the end
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Decks</h2>
                <div className="deck-instruction">
                    {deckList.length > 0 ? 'Select a Deck to Start' : 'Create a Deck!'}
                </div>
                <ul className="deck-list">
                    {deckList.map((deck) => (
                        // when deck is clicked, handleSelectDeck will be called w/ the clicked deck as arg 
                        <li key={deck.id} className="deck-item" onClick={() => handleSelectDeck(deck)}>
                            <div className="deck-name">{capitalizeDeckName(deck.name)}</div>
                            <div className="card-count">({deck.flashcards.length} cards)</div>
                            {/* prevent clicking delete button from also triggering `handleSelectDeck` */}
                            <button 
                                className="delete-button"
                                onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id) }}
                            > 
                                <FaTrash />  {/* trash icon */}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;