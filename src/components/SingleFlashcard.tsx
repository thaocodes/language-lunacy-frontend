import React from 'react'
import { Flashcard } from './types';

// receives flashcard object, 2 callback functions
type SingleFlashcardProps = {
    flashcard: Flashcard;
    onEasy: () => void;
    onHard: () => void;
}

const SingleFlashcard: React.FC<SingleFlashcardProps> = ({ flashcard, onEasy, onHard }) => {


    return (
    <div>
        <div>Number: {flashcard.number}</div>
        <div>Language: {flashcard.language}</div>
        <div>English: {flashcard.english}</div>
        <button onClick={onEasy}>Easy</button>
        <button onClick={onHard}>Hard</button>
    </div>
    )
}

export default SingleFlashcard;
