import React, { useState } from 'react';
import '../stylesheets/deckform.css';


type Props = {
    addDeck: (title: string) => void;
}

const DeckForm: React.FC<Props> = ({ addDeck }) => {
    const [title, setTitle] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // checks if `title` isn't an empty string
        if (title) { 
            // call function to add deck
            addDeck(title);
            setTitle("")    // reset title after submission
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="deck-title">Deck Title</label>
            <input
                type="text"
                id="deck-title"
                value={title} // binds input to `title` state
                // updates title state when user types 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter deck title"
            />
            <button type="submit">Submit</button>
        </form>
    );
}


export default DeckForm;