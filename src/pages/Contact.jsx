import { ContactBlock } from "../components/ContactBlock.jsx";
import { TrustSections } from "../components/TrustSections.jsx";
import "../styles/contact.css";

export default function Contact() {
    return (
        <main id="main" tabIndex={-1} className="page-contact">
            <ContactBlock as="h1" id="contact" />
            <TrustSections />
        </main>
    );
}
