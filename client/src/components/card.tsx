import '../styles/components/card.css';

function Card() {

    const cardInfo = [
        {
            title: "Effortless Short Trips.",
            subtitle: "Skip traffic and expensive rides for everyday 4-5 km commutes."
        },
        {
            title: "Affordable & Flexible Rides.",
            subtitle: "Electric vehicles available when you need them — no long-term commitment."
        },
        {
            title: "Earn as a Host.",
            subtitle: "Deliver the package on the way and earn extra income."
        }
    ]

    return (
        <>
            <div id="value-grid">
                {cardInfo.map((card, index) => (
                    <div id="value-card" key={index}>
                        <p id='value-title'>{card.title}</p>
                        <p id='value-subtitle'>{card.subtitle}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Card;