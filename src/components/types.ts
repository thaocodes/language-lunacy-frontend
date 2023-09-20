
export interface Flashcard {
    id: number;
    number: number;
    english: string;
    difficulty: string;
    [key: string]: string | number;   // allows for dynamic language property, adding an index signature 
}

export interface Deck {
    id: number;
    name: string;      // Name of deck, language name or user-defined?
    flashcards: Flashcard[];     // Array of words/flashcards
}