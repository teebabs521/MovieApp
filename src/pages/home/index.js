import { useEffect, useState } from "react";
import { NavbarFooterIncluded, MovieContainer } from "layouts";
import {
  getUpcomingMovies,
} from "services/api";
import { Carousel } from "components";

const Homepage = () => {
  const [upcomingMovies, setUpcomingMovies] = useState();
  const [carouselMovies, setCarouselMovies] = useState();

  useEffect(() => {
    (async function () {
      const { results: upcomingMovieResults } = await getUpcomingMovies();

      upcomingMovieResults &&
        setCarouselMovies(upcomingMovieResults.slice(0, 5));
      upcomingMovieResults &&
        setUpcomingMovies(upcomingMovieResults.slice(0, 10));
    })();
  }, []);

  return (
    <>
      <NavbarFooterIncluded>
        <Carousel moviesList={carouselMovies} />
        <div className="pt-10">
          <MovieContainer
            sectionTitle="Featured Movies"
            moviesList={upcomingMovies}
          />
          
        
        </div>
      </NavbarFooterIncluded>
    </>
  );
};

export default Homepage;
