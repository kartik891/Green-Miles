import '../styles/components/working.css';

function Working() {

    const workingSteps = [
        {
            title: "1. Find a nearby ride.",
            subtitle: "Locate an electric vehicle available near you."
        },
        {
            title: "2. Ride on your terms.",
            subtitle: "Pause, resume, and travel at your own pace."
        },
        {
            title: "3. End ride & earn impact.",
            subtitle: "Complete your trip and see your saved time and emissions."
        }
    ]

    return (
        <>
            <div id="working-section">
                <h3>How it works ?</h3>
                <div id="working-grid">
                    {workingSteps.map((step, index) => (
                        <div id="working-step" key={index}>
                            <p id="step-title">{step.title}</p>
                            <p id="step-subtitle">{step.subtitle}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Working;