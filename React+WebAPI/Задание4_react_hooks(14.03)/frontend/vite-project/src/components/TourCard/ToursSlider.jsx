import { useTourFilters} from "../../hooks/useTourFilters";
import TourCard from "./TourCard";

function ToursSlider(){
    const {tours,loading} = useTourFilters();
    return (
        <>
            <main className="main-content">
                <div className="container" style={{ paddingLeft: 0 }}>
                    <h2 className="section-title" id="remove_search">
                        Туры в Турцию: найдено {tours.length} предложений
                    </h2>

                    <div className="hot-tours-container">
                    <div className="tours-slider" id="hot-tours-slider" style={{ overflowX: 'hidden', display: 'block' }}>
                        {tours.map((tour) => (
                        <TourCard key={tour.id} tour={tour}/>
                        ))}
                    </div>
                    </div>
                </div>
            </main>
             
        </>  
    );
}

export default ToursSlider;