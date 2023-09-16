import React from 'react'

interface props {
    language: string;
    start: string;
    end: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>;
    setStart: React.Dispatch<React.SetStateAction<string>>;
    setEnd: React.Dispatch<React.SetStateAction<string>>;
    handleLanguage: (e: React.FormEvent) => void; 
}


const InputField: React.FC<props> = ({ language, start, end, setLanguage, setStart, setEnd, handleLanguage }) => {

    return (
        <form
            className="input"
            onSubmit={(e) => handleLanguage(e)}
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


