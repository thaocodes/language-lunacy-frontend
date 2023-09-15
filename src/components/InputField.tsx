import React from 'react'

interface props {
    language: string;
    setLanguage: React.Dispatch<React.SetStateAction<string>>; 
    handleLanguage: (e. React.FormEvent) => void;
}


const InputField = () => {

    return (
        <form
            className="input"
            onSubmit={(e) => {
                handleLanguage(e);
            }}
        >
            <input
                className="input-box"
                type="text"
                placeholder='Enter a Language'
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            />
            <button className="input-submit" type="submit">
                Submit
            </button>
        </form>
    )
}

export default InputField;


