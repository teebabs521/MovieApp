import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTv, FaFilm, FaCalendarAlt, FaStar, FaHome, FaTools, FaTree, FaHamburger } from "react-icons/fa";

/**
 * Components and layouts...
 */
import {
  MaxWidthLayout,
  NavbarFooterIncluded,
  OtherSection,
  TopSection,
  MovieContainer,
} from "layouts";
import {
  getSingleMovie,
  getSingleMovieCredits,
  getSimilarMovies,
} from "services/api";
import { truncateString } from "utils/truncateString";
import { extractImgPoster } from "utils/extractImg";
import { BsStarFill } from "react-icons/bs";

const SingleMovie = () => {
  const [singleMovie, setSingleMovie] = useState();
  const [singleMovieCredits, setSingleMovieCredits] = useState();
  const [similarMovies, setSimilarMovies] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    (async function () {
      const result = await getSingleMovie(movieId);
      const creditResult = await getSingleMovieCredits(movieId);
      const { results: similarMoviesResult } = await getSimilarMovies(movieId);

      result && setSingleMovie(result);
      creditResult && setSingleMovieCredits(creditResult);
      similarMoviesResult && setSimilarMovies(similarMoviesResult.slice(0, 10));
    })();
  }, [movieId]);

  if (!singleMovie) return null;

  return (
    <NavbarFooterIncluded>
      <div className="container-fluid">
        <div className="flex flex-row space-x-4">
          {/* Sidebar - 3 columns */}
          <div className="w-1/4 bg-white p-4">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              
            </div>
            
            {/* Sidebar content */}
            <div className="text-black">
              <h2 className="text-xl font-semibold" style={{ padding: '50px 10px 0' }}>Links</h2>
              <ul className="list-none ml-4 mt-2 space-y-2">
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaHome className="text-pink-500 mr-2" />
                  <span className="font-semibold">Home</span>
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaFilm className="text-pink-500 mr-2" />
                  <span className="font-semibold">Movies</span>
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaTv className="text-pink-500 mr-2" />
                  <span className="font-semibold">TV Series</span>{" "}
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaCalendarAlt className="text-pink-500 mr-2" />
                  <span className="font-semibold">Upcoming</span>{" "}
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaTools className="text-pink-500 mr-2" />
                  <span className="font-semibold">Top Rated</span>{" "}
                </li>
                {/* Add more movie links here */}
              </ul>

              <h2 className="text-xl font-semibold" style={{ padding: '50px 10px 0' }}>Movie Information</h2>
              <ul className="list-none ml-4 mt-2 space-y-2">
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaFilm className="text-pink-500 mr-2" />
                  <span className="font-semibold">Title:</span>{" "}
                  {singleMovie.title}
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaCalendarAlt className="text-pink-500 mr-2" />
                  <span className="font-semibold">Release Date:</span>{" "}
                  {singleMovie.release_date}
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaStar className="text-pink-500 mr-2" />
                  <span className="font-semibold">Rating:</span>{" "}
                  {singleMovie.vote_average}
                </li>

                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaStar className="text-pink-500 mr-2" />
                  <span className="font-semibold">Popularity:</span>{" "}
                  {singleMovie.popularity}
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaStar className="text-pink-500 mr-2" />
                  <span className="font-semibold">Revenue:</span>{" "}
                  {singleMovie.revenue}
                </li>
                <li className="py-1 hover:text-pink-500 flex items-center">
                  <FaStar className="text-pink-500 mr-2" />
                  <span className="font-semibold">Status:</span>{" "}
                  {singleMovie.status}
                </li>
              </ul>

              <button
          id="topRatedButton"
           className="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-600 focus:outline-none focus:ring focus:ring-pink-300 mt-4 w-full"
            onClick={changeBackgroundColor}
              >
            Top Rated Movies
             </button>

            </div>
          </div>

          {/* Content area - 9 columns */}
          <div className="w-3/4">
            <div
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.8953956582633054) 0%, rgba(0,0,0,0.7469362745098039) 50%, rgba(0,0,0,0.9) 100%), url(https://image.tmdb.org/t/p/original/${singleMovie.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top center",
              }}
              className="min-h-[60vh] w-full flex items-center py-28 md:py-36 space-y-10"
            >
              <MaxWidthLayout>
                <div className="grid grid-cols-1 md:grid-cols-[28%_70%] gap-[2%]">
                  {/* Poster Section */}
                  <div className="flex items-center justify-center md:justify-start">
                    <img
                      src={extractImgPoster(singleMovie.poster_path)}
                      alt={singleMovie.title}
                      className="rounded-md shadow-lg"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="self-center space-y-5">
                    <h1 className="text-center md:text-left custom-movie-title">
                      {singleMovie.title}
                    </h1>
                    <p className="flex items-center space-x-2">
                      <span className="text-2xl text-yellow-500">
                        <BsStarFill />
                      </span>
                      <span className="pt-1">
                        {singleMovie.vote_average}
                      </span>
                    </p>
                    <p className="leading-7">
                      {truncateString(singleMovie.overview)}
                    </p>
                  </div>
                </div>
              </MaxWidthLayout>
            </div>

            <TopSection>
              <div className="grid grid-cols-1 ">
            {/* Left section */}
            <div className="space-y-8">
              <h2 className="custom-section-title"></h2>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
                {singleMovieCredits.cast.slice(0, 0).map((singleCast) => {
                  return (
                    <div key={singleCast.id} className="space-y-2">
                      <div className="max-h-[320px] overflow-hidden rounded-md">
                        {singleCast.profile_path ? (
                          <img
                            src={extractImgPoster(singleCast.profile_path)}
                            className="object-cover w-full h-full rounded-md"
                          />
                        ) : (
                          <div className="h-[320px] rounded-md bg-gray-100"></div>
                        )}
                      </div>
                      <h2>{singleCast.original_name}</h2>
                      <p>{singleCast.character}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Right Section */}
            <div className="space-y-8">
              {/* Genres */}
              {/* Release Date */}
            </div>
          </div>
            </TopSection>
            <OtherSection>
              {similarMovies && (
                <MovieContainer
                  sectionTitle="Similar Movies"
                  moviesList={similarMovies}
                />
              )}
            </OtherSection>
          </div>
        </div>
      </div>
    </NavbarFooterIncluded>
  );
};

function changeBackgroundColor() {
  const button = document.getElementById('topRatedButton');
  button.style.backgroundColor = 'black';
}
export default SingleMovie;
