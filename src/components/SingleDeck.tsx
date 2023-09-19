import React from 'react'
import { Deck } from './types';
import SingleFlashcard from './SingleFlashcard';

type DeckProps = {
    selectedDeck: Deck | null;
    decklist: Deck[];
    language: string;
    flashcardIndex: number;
    setSelectedDeck: React.Dispatch<React.SetStateAction<Deck | null>>;
    onEasy: (flashcardId: number) => void;
    onHard: () => void;
    nextFlashcard: () => void;
}

const SingleDeck: React.FC<DeckProps> = ({ selectedDeck, decklist, language, flashcardIndex, setSelectedDeck, onEasy, onHard, nextFlashcard  }) => {

    if (selectedDeck) {
        const currentFlashcard = selectedDeck.flashcards[flashcardIndex];

        // check if currentFlashcardIndex within bounds
        if (flashcardIndex >= 0 && flashcardIndex < selectedDeck.flashcards.length) {

            return (
                <>
                    {/* flashcard counter */}
                    <div> Card {flashcardIndex + 1 } of {selectedDeck.flashcards.length}</div>
                    <SingleFlashcard
                        flashcard={currentFlashcard}
                        onEasy={onEasy}
                        onHard={onHard}
                        language={language}
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