import { ArrowRight } from "lucide-react";
import { navigateTo } from "../../hooks/useRoutePath";

function DeckCard({ route }) {
    return (
        <a
            className={`route-deck-card ${route.tone === "primary" ? "primary" : ""}`}
            href={route.path}
            onClick={(event) => {
                event.preventDefault();
                navigateTo(route.path);
            }}
        >
            <span>{route.eyebrow}</span>
            <strong>{route.label}</strong>
            <p>{route.body}</p>
            <ArrowRight aria-hidden="true" />
        </a>
    );
}

export function RouteDeck({ routes, secondaryRoutes }) {
    return (
        <section className="home-route-deck" aria-labelledby="route-deck-title">
            <div className="route-deck-head">
                <p className="eyebrow">Next route</p>
                <h2 id="route-deck-title">Chọn cửa vào phù hợp.</h2>
            </div>

            <div className="route-deck-grid">
                {routes.map((route) => (
                    <DeckCard key={route.id} route={route} />
                ))}
            </div>

            {secondaryRoutes?.length ? (
                <div className="route-deck-secondary" aria-label="Secondary home routes">
                    {secondaryRoutes.map((route) => (
                        <a
                            key={route.id}
                            href={route.path}
                            onClick={(event) => {
                                event.preventDefault();
                                navigateTo(route.path);
                            }}
                        >
                            {route.label}
                        </a>
                    ))}
                </div>
            ) : null}
        </section>
    );
}
