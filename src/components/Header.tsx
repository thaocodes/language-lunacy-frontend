import React from 'react'
import InputField from './InputField';
import '../stylesheets/header.css';


interface Props {
    language: string;
    start: string;
    end: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    setStart: React.Dispatch<React.SetStateAction<string>>;
    setEnd: React.Dispatch<React.SetStateAction<string>>;
    createDeck: (e: React.FormEvent) => void; 
}

const Header: React.FC<Props> = ( { language, start, end, setLanguage, setStart, setEnd, createDeck }) => {
    return (
        <div className="header">
            <h1 className="app-title">Language Lunacy</h1>
            <p className="app-instruction">Enter a language and optionally, a range to create a flashcard deck from the most common words!</p>
            <InputField 
                language={language}
                start={start}
                end={end}
                setLanguage={setLanguage}
                setStart={setStart}
                setEnd={setEnd}
                createDeck={createDeck}
            />
        </div>
    )
}

export default Header