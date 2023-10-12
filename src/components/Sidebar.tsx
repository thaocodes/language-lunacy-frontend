import React from 'react'
import { Deck } from './types';
import { FaTrash, FaPlus } from 'react-icons/fa';
import '../stylesheets/sidebar.css';


type Props = {
    deckList: Deck[];
    handleSelectDeck: (deck: Deck) => void;
    setDecklist: React.Dispatch<React.SetStateAction<Deck[]>>;
    setDeckForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShowFlashcardForm: React.Dispatch<React.SetStateAction<boolean>>;
    addFlashcard: (question: string, answer: string) => void;
}

// map over deckList to display each deck
const Sidebar: React.FC<Props> = ({ deckList, handleSelectDeck, setDecklist, setDeckForm, setShowFlashcardForm, addFlashcard }) => {
     // filters deckList to exclude deck with the given `id`
    const deleteDeck = (id: number) => {
        // if deck.id does not match id, return it
        setDecklist(deckList.filter((deck) => deck.id !== id)); 
    };

    // takes a string, uppercases first letter 
    const capitalizeDeckName = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1); // returns string from 1st index to the end
    }


    return (
        <div className="sidebar">
            <div className="sidebar-header">
                {/* show deck form when + button is clicked */}
                <FaPlus className="add-deck-button" onClick={() => setDeckForm(true)} />
                <h2>Decks</h2>
                <div className="deck-instruction">
                    {deckList.length > 0 ? 'Select a Deck to Start' : 'Create a Deck!'}
                </div>
                <ul className="deck-list">
                    {/* map takes a function & calls it on every item in the array */}
                    {deckList.map((deck) => (
                        // for every deck in deckList, create a list item
                        // when deck is clicked, handleSelectDeck function is called w/ the clicked deck as arg 
                        <li key={deck.id} className="deck-item" onClick={() => handleSelectDeck(deck)}>
                            {/* for each deck, display name, card count, delete button */}
                            <div className="deck-name">{capitalizeDeckName(deck.name)}</div>
                            <div className="card-count">({deck.flashcards.length} cards)</div>
                            <FaPlus className="add-flashcard-button" onClick={() => setShowFlashcardForm(true)} />
                            <button 
                                className="delete-button"
                                // prevent clicking delete button from also triggering `handleSelectDeck` 
                                // when clicked, calls deleteDeck func for that deck 
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