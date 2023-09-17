import React from 'react'
import { Deck } from './types';
import SingleFlashcard from './SingleFlashcard';

type DeckProps = {
    selectedDeck: Deck | null;
    decklist: Deck[];
    currentFlashcardIndex: number;
    setSelectedDeck: React.Dispatch<React.SetStateAction<Deck | null>>;
    onEasy: () => void;
    onHard: () => void;
    nextFlashcard: () => void;
}

const SingleDeck: React.FC<DeckProps> = ({ selectedDeck, decklist, currentFlashcardIndex, setSelectedDeck, onEasy, onHard, nextFlashcard  }) => {

    if (selectedDeck) {
        const currentFlashcard = selectedDeck.flashcards[currentFlashcardIndex];

        // check if currentFlashcardIndex within bounds
        if (currentFlashcardIndex >= 0 && currentFlashcardIndex < selectedDeck.flashcards.length) {

            return (
                <>
                    {/* flashcard counter */}
                    <div> Card {currentFlashcardIndex + 1 } of {selectedDeck.flashcards.length}</div>
                    <SingleFlashcard
                        flashcard={currentFlashcard}
                        onEasy={onEasy}
                        onHard={onHard}
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