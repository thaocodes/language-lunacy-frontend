import React, { useState } from 'react'


type Props = {
    addFlashcard: (question: string, answer: string) => void;
}

const FlashcardForm: React.FC<Props> = ({ addFlashcard }) => {
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        // remove white spaces from both ends
        if (question.trim() && answer.trim()) { 
            addFlashcard(question, answer);
            setQuestion("");
            setAnswer("");
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="question">Question:</label>
            <input
                value={question}
                type="text"
                placeholder="Type Question"
                onChange={e => setQuestion(e.target.value)}
            />
            <label htmlFor="answer">Answer:</label>
            <input
                value={answer}
                type="text"
                placeholder="Type Answer"
                onChange={e => setAnswer(e.target.value)}
            />
            <button type="submit">Done</button>
        </form>
    
    )
}

export default FlashcardForm;