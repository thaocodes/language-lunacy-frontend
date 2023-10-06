import React from 'react'
import { Deck } from './types';
import SingleFlashcard from './SingleFlashcard';
import '../stylesheets/deck.css';

type DeckProps = {
    selectedDeck: Deck | null;
    flashcardIndex: number;
    onEasy: (flashcardId: number) => void;
    onHard: () => void;
}

const SingleDeck: React.FC<DeckProps> = ({ selectedDeck, flashcardIndex, onEasy, onHard }) => {

    if (selectedDeck) {
         // if deck runs out of cards, display message
        if (selectedDeck.flashcards.length === 0)
            return <div className="no-more-cards">No more Flashcards!</div>;

        const currentFlashcard = selectedDeck.flashcards[flashcardIndex];

        const isLastCard = flashcardIndex >= selectedDeck.flashcards.length;

        return (
            <>
                {/* flashcard counter */}
                <div className="card-counter"> 
                    Card {flashcardIndex + 1 } of {selectedDeck.flashcards.length}
                </div>
                <SingleFlashcard
                    flashcard={currentFlashcard}  // pass current flashcard in the iteration
                    onEasy={onEasy}
                    onHard={onHard}
                    language={selectedDeck.name}   // pass name of deck as language prop
                    noMoreFlashcards={isLastCard}
                />
            </>
        );
    } else {
        return null;
    }
};

export default SingleDeck;