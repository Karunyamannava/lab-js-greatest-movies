// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  return moviesArray.filter(movie => movie.director === "Steven Spielberg" && movie.genre.includes("Drama")).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;
  const averageScore = moviesArray.reduce((sum, movie) => sum + (movie.score || 0), 0) / moviesArray.length;
  return parseFloat(averageScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter(movie => movie.genre.includes("Drama"));
  return scoresAverage(dramaMovies);
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  const sortedMovies = moviesArray.slice().sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return a.title.localeCompare(b.title);
  });
  return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const sortedTitles = moviesArray.map(movie => movie.title).sort((a, b) => a.localeCompare(b));
  return sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const updatedMovies = moviesArray.map(movie => {
    const durationParts = movie.duration.split(" ");
    let totalMinutes = 0;
    durationParts.forEach(part => {
      if (part.includes("h")) {
        totalMinutes += parseInt(part.replace("h", "")) * 60;
      } else if (part.includes("min")) {
        totalMinutes += parseInt(part.replace("min", ""));
      }
    });
    return { ...movie, duration: totalMinutes };
  });
  return updatedMovies;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;

  const years = {};
  moviesArray.forEach(movie => {
    if (!years[movie.year]) {
      years[movie.year] = {
        sum: movie.score || 0,
        count: 1
      };
    } else {
      years[movie.year].sum += movie.score || 0;
      years[movie.year].count++;
    }
  });

  let bestYear = null;
  let bestAvg = 0;

  for (const year in years) {
    const avg = years[year].sum / years[year].count;
    if (avg > bestAvg || (avg === bestAvg && parseInt(year) < parseInt(bestYear))) {
      bestAvg = avg;
      bestYear = year;
    }
  }

  return `The best year was ${bestYear} with an average score of ${parseFloat(bestAvg.toFixed(2))}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
