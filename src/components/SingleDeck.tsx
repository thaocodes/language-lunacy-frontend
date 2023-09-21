import React from 'react'
import { Deck } from './types';
import SingleFlashcard from './SingleFlashcard';

type DeckProps = {
    selectedDeck: Deck | null;
    flashcardIndex: number;
    onEasy: (flashcardId: number) => void;
    onHard: () => void;
}

const SingleDeck: React.FC<DeckProps> = ({ selectedDeck, flashcardIndex, onEasy, onHard }) => {

    if (selectedDeck) {
        const currentFlashcard = selectedDeck.flashcards[flashcardIndex];

        // check if currentFlashcardIndex within bounds
        if (flashcardIndex >= 0 && flashcardIndex < selectedDeck.flashcards.length) {

            return (
                <>
                    {/* flashcard counter */}
                    <div> Card {flashcardIndex + 1 } of {selectedDeck.flashcards.length}</div>
                    <SingleFlashcard
                        flashcard={currentFlashcard}  // pass current flashcard in the iteration
                        onEasy={onEasy}
                        onHard={onHard}
                        language={selectedDeck.name}   // pass name of deck as language prop
                    />
                </>
            );
        } else {
            return <div>No more flashcards!</div>;
        } 
    } else {
        return <div>Select a deck to start</div>;
    }
};

export default SingleDeck;