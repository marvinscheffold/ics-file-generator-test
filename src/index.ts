import { createEvent } from "../node_modules/ics/dist/index";

const form = document.querySelector("form");
form?.addEventListener("submit", createAndDownloadEvent);
const inputTitle = document.querySelector("input");
const textarea = document.querySelector("textarea");
const inputDate = document.querySelector<HTMLInputElement>("[data-date]");

function createAndDownloadEvent(e) {
    e.preventDefault();
    const title = inputTitle?.value;
    const description = textarea?.value;
    const date = new Date(inputDate?.value!);

    createEvent(
        {
            title: title,
            description: description,
            busyStatus: "FREE",
            start: [
                date.getFullYear(),
                date.getMonth() + 1,
                date.getDay(),
                date.getHours(),
                date.getMinutes(),
            ],
            duration: { minutes: 50 },
            location: "Folsom Field, University of Colorado (finish line)",
            url: "http://www.bolderboulder.com/",
            geo: { lat: 40.0095, lon: 105.2669 },
            categories: ["10k races", "Memorial Day Weekend", "Boulder CO"],
            status: "CONFIRMED",
            organizer: { name: "Admin", email: "Race@BolderBOULDER.com" },
            attendees: [
                {
                    name: "Adam Gibbons",
                    email: "adam@example.com",
                    rsvp: true,
                    partstat: "ACCEPTED",
                    role: "REQ-PARTICIPANT",
                },
                {
                    name: "Brittany Seaton",
                    email: "brittany@example2.org",
                    dir: "https://linkedin.com/in/brittanyseaton",
                    role: "OPT-PARTICIPANT",
                },
            ],
        },
        (error, event) => {
            if (error) {
                console.log(error);
                return;
            }

            // Start file download.
            createAndDownloadFile("event.ics", event);
        }
    );
}

function createAndDownloadFile(filename, text) {
    const element = document.createElement("a");
    element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
