import React, {useState} from 'react'
import { Flashcard } from './types';
import { FaReply } from 'react-icons/fa';
import '../stylesheets/flashcard.css';


// receives flashcard object, 2 callback functions
interface FlashcardProps  {
    flashcard?: Flashcard;
    language: string;
    onEasy: (flashcardId: number) => void;
    onHard: () => void;
    noMoreFlashcards: boolean;
}

const SingleFlashcard: React.FC<FlashcardProps> = ({ flashcard, language, onEasy, onHard, noMoreFlashcards }) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false); // initial state shows {language} word

    console.log("Flashcard: ", flashcard); 
    console.log("Is Flipped: ", isFlipped);

    console.log("flashcard?.english: ", flashcard?.english);
    console.log("flashcard?.[language]: ", flashcard?.[language]); // access property dynamically 

    if (noMoreFlashcards) {
        return <div className="no-more-flashcards">No more Flashcards!</div>;
    }
    
    if (!flashcard) {
        console.log("NO FLASHCARD!!")
        return null;    // return null or loading spinner, placeholder content

    }
        

    return (
        <div className="flashcard-container">
            <div className="flashcard-header">
                <span className="language">{language}</span>
        
            </div>
            <div className="flashcard">
                <FaReply className="flip-icon" onClick={() => setIsFlipped(!isFlipped)} /> 
                <div className="flashcard-content">
                    {isFlipped ? flashcard.english : flashcard[language]}
                </div>
                <div className="flashcard-actions">
                    <button className="easy-button" onClick={() => onEasy(flashcard.id)}>Easy</button>
                    <button className="hard-button" onClick={onHard}>Hard</button>
                </div>
            </div>
        </div>
    );
}

export default SingleFlashcard;
