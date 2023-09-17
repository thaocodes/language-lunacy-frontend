import React from 'react'
import { Deck } from './types';

type Props = {
    deckList: Deck[];
    handleSelectDeck: (deck: Deck) => void;
}

// map over deckList to display each deck
// when a deck is clicked, handleSelectDeck will be called with the clicked deck as the arg
// to select that deck

const Sidebar: React.FC<Props> = ({ deckList, handleSelectDeck }) => {
    return (
        <div className="sidebar">
            <h2>Decks</h2>
            {deckList.map((deck, index) => (
                <div key={index} onClick={() => handleSelectDeck(deck)}>
                    {deck.name}
                </div>
            ))}
        </div>
    )
};

export default Sidebar;