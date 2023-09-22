import React from 'react'
import { Deck } from './types';
import '../stylesheets/sidebar.css';
import { MDBBtn, MDBIcon, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

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

    return (
        <div className="sidebar">
            <h2>Decks</h2>
            <MDBListGroup className="list-group-flush">
                {deckList.map((deck) => (
                    // when deck is clicked, handleSelectDeck will be called w/ the clicked deck as arg 
                    <MDBListGroupItem key={deck.id} className="deck-item" onClick={() => handleSelectDeck(deck)}>
                        <span>{deck.name} ({deck.flashcards.length} cards)</span>
                        {/* prevent clicking delete button from also triggering `handleSelectDeck` */}
                        <MDBBtn 
                            floating 
                            tag='a' 
                            color='danger'
                            size='sm'
                            className='ml-1'
                            onClick={(e) => { e.stopPropagation(); deleteDeck(deck.id) }}
                        >
                            <MDBIcon fas icon='trash' /> 
                        </MDBBtn>
                    </MDBListGroupItem>
                ))}
            </MDBListGroup>
        </div>
    );
};

export default Sidebar;