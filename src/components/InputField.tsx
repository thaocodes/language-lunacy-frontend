import React from 'react'
import '../stylesheets/inputfield.css';

interface props {
    language: string;
    start: string;
    end: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    setStart: React.Dispatch<React.SetStateAction<string>>;
    setEnd: React.Dispatch<React.SetStateAction<string>>;
    createDeck: (e: React.FormEvent) => void; 
}


const InputField: React.FC<props> = ({ language, start, end, setLanguage, setStart, setEnd, createDeck }) => {

    return (
        <form
            className="input"
            onSubmit={(e) => createDeck(e)}
        >
            <input
                className="language-input"
                type="text"
                placeholder='Enter a Language'
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            />
            <input
                className="start-input"
                type="number"
                placeholder='start number'
                value={start}
                onChange={(e) => setStart(e.target.value)}
            />
            <input
                className="end-input"
                type="number"
                placeholder='end number'
                value={end}
                onChange={(e) => setEnd(e.target.value)}
            />
            <button className="input-submit" type="submit">
                Submit
            </button>
        </form>
    )
}

export default InputField;


