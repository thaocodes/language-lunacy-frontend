
export interface Flashcard {
    id: number;
    number: number;
    english: string;
    difficulty: string;
    // allows for dynamic language property, adding an index signature
    [key: string]: string | number | undefined;    // add undefined so userQuestion doesn't error
    userQuestion?: string;  // optional property
}

export interface Deck {
    id: number;
    name: string;      // Name of deck, language name or user-defined?
    flashcards: Flashcard[];     // Array of words/flashcards
}