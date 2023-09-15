
export interface Flashcard {
    id: number;
    number: number;
    language: string;
    english: string;
    difficulty: string;
    [key: string]: string | number;   // adding an index signature 
}

export interface Deck {
    id: number;
    name: string;      // Name of deck, language name or user-defined?
    flashcards: Flashcard[];     // Array of words/flashcards
}