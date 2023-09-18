import React, {useState} from 'react'
import { Flashcard } from './types';
import { 
    MDBCol, MDBContainer, MDBRow, MDBCard, 
    MDBCardText, MDBCardBody, MDBCardImage, 
    MDBTypography, MDBIcon, MDBBtn 
} from 'mdb-react-ui-kit';
import '../stylesheets/flashcard.css';


// receives flashcard object, 2 callback functions
interface FlashcardProps  {
    flashcard?: Flashcard;
    onEasy: (flashcardId: number) => void;
    onHard: () => void;
}

const SingleFlashcard: React.FC<FlashcardProps> = ({ flashcard, onEasy, onHard }) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false); // initial state shows {language} word

    console.log("Flashcard: ", flashcard); 
    console.log("Is Flipped: ", isFlipped);
    
    if (!flashcard) {
        console.log("NO FLASHCARD!!!?!?!?")
        return null;    // return null or loading spinner, placeholder content

    }
        
    return (
        <section className="vh-100">
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="6" className="mb-4 mb-lg-0">
                        <MDBCard className="mb-3">
                            <MDBRow className="g-0">
                                <MDBCol md="4" className="gradient-custom">
                                    <MDBCardImage 
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" 
                                        alt="Avatar" 
                                        className="my-5" 
                                        fluid 
                                    />
                                    <MDBTypography tag="h5">Marie Horwitz</MDBTypography>
                                    <MDBCardText>Web Designer</MDBCardText>
                                    <MDBIcon far icon="edit mb-5" />
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody className="p-4">
                                        <MDBTypography tag="h6">FlashCard Question</MDBTypography>
                                        {/* set isFlipped to true to show English translation */}
                                        <MDBIcon icon="redo" className="float-end" onClick={() => setIsFlipped(!isFlipped)} />
                                        <hr className="mt-0 mb-4" />
                                        <MDBRow className="pt-1">
                                            <MDBCol size="12" className="mb-3">
                                                <MDBCardText className="text-muted">
                                                    {/* if `isFlipped` is true, display English, else display language
                                                        check if those properties exist on flashcard object */}
                                                    {isFlipped ? flashcard?.english : flashcard?.language}
                                                </MDBCardText>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBIcon icon="arrow-right" className="float-end" onClick={() => setIsFlipped(!isFlipped)} />
                                        <div className="d-flex justify-content-start">
                                            <MDBBtn onClick={() => onEasy(flashcard.id)}>Easy</MDBBtn>
                                            <MDBBtn onClick={onHard}>Hard</MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}

export default SingleFlashcard;
